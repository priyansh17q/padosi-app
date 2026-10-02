/* ============================================================
   Padosi Pro Backend — Express + Supabase + Gmail OTP
   ============================================================ */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');
const rateLimit = require('express-rate-limit');
const webpush = require('web-push');
const Razorpay = require('razorpay');

const app = express();
app.use(express.json({ limit: '100kb' }));

/* ---------- Rate limiting (1000-user safety net) ---------- */
app.use('/api/', rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false }));
const otpLimiter = rateLimit({ windowMs: 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false, message: { error: 'Bohot saari koshishein, thoda ruko' } });

/* ---------- CORS (sirf aapke frontend ko allow) ---------- */
const allowed = (process.env.ALLOWED_ORIGINS || '').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error('CORS blocked: ' + origin));
  }
}));

/* ---------- Supabase DB ---------- */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/* ---------- Gmail Connector ---------- */
let mailer = null;
if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
  mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, '') }
  });
}

/* ---------- Web Push (VAPID) — "sabke phone pe notification" ---------- */
let pushEnabled = false;
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    'mailto:' + (process.env.GMAIL_USER || 'admin@padosipro.app'),
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  pushEnabled = true;
} else {
  console.log('[DEV] VAPID keys missing — push notifications disabled (set VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY)');
}

/* ---------- Razorpay (UPI + Card escrow) ---------- */
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
} else {
  console.log('[DEV] Razorpay keys missing — payments disabled, tasks post karne ke liye escrow step skip ho jayega');
}

/* ---------- Notify one user: DB row + push (best-effort, never throws) ---------- */
async function notifyUser(userId, { title, body, icon = 'notifications' }) {
  try {
    await supabase.from('notifications').insert({ user_id: userId, title, body, icon });
  } catch (e) { console.warn('notify db insert failed', e.message); }
  if (!pushEnabled) return;
  try {
    const { data: subs } = await supabase.from('push_subscriptions').select('*').eq('user_id', userId);
    for (const sub of subs || []) {
      const payload = JSON.stringify({ title, body, icon });
      webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload)
        .catch(async err => {
          if (err.statusCode === 404 || err.statusCode === 410) {
            await supabase.from('push_subscriptions').delete().eq('id', sub.id); // expired subscription cleanup
          } else { console.warn('push send failed', err.message); }
        });
    }
  } catch (e) { console.warn('push lookup failed', e.message); }
}

/* ---------- Broadcast to every OTHER user (new task nearby) ---------- */
async function broadcastNewTask(task, exceptUserId) {
  const { data: users } = await supabase.from('users').select('id').neq('id', exceptUserId).limit(5000);
  for (const u of users || []) {
    notifyUser(u.id, {
      title: 'New task nearby! 🏘️',
      body: `${task.title} — ₹${task.price}`,
      icon: 'campaign'
    });
  }
}

async function sendOtpEmail(email, code) {
  if (!mailer) {
    console.log(`[DEV] OTP for ${email} = ${code}`);
    return { dev: true };
  }
  await mailer.sendMail({
    from: `"Padosi Pro" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `${code} — aapka Padosi Pro login code`,
    html: `
      <div style="font-family:sans-serif;max-width:420px;margin:auto;border:1px solid #e5eeff;border-radius:12px;padding:24px">
        <h2 style="color:#006948">Padosi Pro 🔐</h2>
        <p>Aapka login OTP:</p>
        <div style="font-size:36px;font-weight:800;letter-spacing:8px;color:#006948">${code}</div>
        <p style="color:#6d7a72;font-size:13px">Ye code 10 minute valid hai. Kisi ko mat batayein.</p>
      </div>`
  });
  return { dev: false };
}

/* ---------- Auth middleware ---------- */
async function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Login required' });
  const { data } = await supabase.from('sessions')
    .select('user_id, users(*)').eq('token', token).single();
  if (!data) return res.status(401).json({ error: 'Session expired' });
  req.user = data.users;
  req.token = token;
  next();
}

/* ---------- OTP COUNTER (security) ---------- */
const OTP_MAX_ATTEMPTS = 5;     // galat OTP max 5 baar
const OTP_EXPIRY_MIN = 10;      // 10 min valid
const RESEND_COOLDOWN_SEC = 60; // 60s dobara OTP

/* ================= ROUTES ================= */

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

/* ---- 1. OTP bhejo (Gmail se) ---- */
app.post('/api/auth/request-otp', otpLimiter, async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: 'Valid email daalo' });

    // Cooldown check
    const { data: old } = await supabase.from('otps').select('*').eq('email', email).single();
    if (old && (Date.now() - new Date(old.created_at)) / 1000 < RESEND_COOLDOWN_SEC)
      return res.status(429).json({ error: `Thoda ruko, ${RESEND_COOLDOWN_SEC}s cooldown hai` });

    const code = String(crypto.randomInt(100000, 999999));
    await supabase.from('otps').upsert({
      email, code, attempts: 0,
      expires_at: new Date(Date.now() + OTP_EXPIRY_MIN * 60000).toISOString(),
      created_at: new Date().toISOString()
    });
    const sent = await sendOtpEmail(email, code);
    res.json({ ok: true, message: 'OTP email bhej diya', ...(sent.dev ? { devOtp: code } : {}) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/* ---- 2. OTP verify + login ---- */
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const code = String(req.body.code || '').trim();
    const { data: rec } = await supabase.from('otps').select('*').eq('email', email).single();
    if (!rec) return res.status(400).json({ error: 'Pehle OTP request karo' });
    if (new Date(rec.expires_at) < new Date())
      return res.status(400).json({ error: 'OTP expire ho gaya, dobara maango' });

    // OTP COUNTER — attempts track
    if (rec.attempts >= OTP_MAX_ATTEMPTS)
      return res.status(429).json({ error: 'Bohot saari galat koshishein. Naya OTP maango.' });

    if (rec.code !== code) {
      await supabase.from('otps').update({ attempts: rec.attempts + 1 }).eq('email', email);
      return res.status(400).json({ error: `Galat OTP (${OTP_MAX_ATTEMPTS - rec.attempts - 1} koshishein bachi)` });
    }

    // User banao ya lao
    let { data: user } = await supabase.from('users').select('*').eq('email', email).single();
    if (!user) {
      const { data: u } = await supabase.from('users')
        .insert({ email, name: email.split('@')[0] }).select().single();
      user = u;
    }
    const token = crypto.randomBytes(32).toString('hex');
    await supabase.from('sessions').insert({ token, user_id: user.id });
    await supabase.from('otps').delete().eq('email', email);

    res.json({ ok: true, token, user });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/auth/logout', auth, async (req, res) => {
  await supabase.from('sessions').delete().eq('token', req.token);
  res.json({ ok: true });
});

/* ---- 3. Saare tasks (feed) ---- */
app.get('/api/tasks', async (req, res) => {
  const { data, error } = await supabase.from('tasks')
    .select('*, users(name, avatar)').order('created_at', { ascending: false }).limit(50);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/* ---- 4. TASK UPLOAD (yahan save hota hai) ---- */
app.post('/api/tasks', auth, async (req, res) => {
  try {
    const { category, title, price, tip, pickup, dropoff, note, paymentId, orderId } = req.body;
    if (!title || String(title).trim().length < 5)
      return res.status(400).json({ error: 'Task description likho (min 5 letters)' });
    if (!price || price < 10) return res.status(400).json({ error: 'Price min ₹10 honi chahiye' });

    // Agar Razorpay configured hai, escrow payment verify hona chahiye pehle
    if (razorpay) {
      if (!paymentId || !orderId) return res.status(402).json({ error: 'Escrow payment pehle complete karo' });
      const { data: pay } = await supabase.from('payments')
        .select('*').eq('razorpay_order_id', orderId).eq('razorpay_payment_id', paymentId).eq('status', 'paid').single();
      if (!pay) return res.status(402).json({ error: 'Payment verify nahi hua' });
    }

    const { data, error } = await supabase.from('tasks')
      .insert({ user_id: req.user.id, category, title: title.trim(), price, tip: tip || 0, pickup, dropoff, note })
      .select().single();
    if (error) throw error;

    if (razorpay && orderId) await supabase.from('payments').update({ task_id: data.id }).eq('razorpay_order_id', orderId);

    await notifyUser(req.user.id, {
      title: 'Task posted!',
      body: `₹${price} escrow locked. Neighbors notify ho rahe hain.`, icon: 'campaign'
    });
    broadcastNewTask(data, req.user.id); // fire-and-forget — sabke phone pe notification

    res.json({ ok: true, task: data });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/* ---- 4b. Mere tasks (posted + accepted) ---- */
app.get('/api/tasks/mine', auth, async (req, res) => {
  const [{ data: posted }, { data: accepted }] = await Promise.all([
    supabase.from('tasks').select('*, users(name, avatar)').eq('user_id', req.user.id).order('created_at', { ascending: false }),
    supabase.from('tasks').select('*, users(name, avatar)').eq('accepted_by', req.user.id).order('created_at', { ascending: false })
  ]);
  res.json({ posted: posted || [], accepted: accepted || [] });
});

/* ---- 5. Task accept ---- */
app.post('/api/tasks/:id/accept', auth, async (req, res) => {
  const { data: t } = await supabase.from('tasks').select('*').eq('id', req.params.id).single();
  if (!t) return res.status(404).json({ error: 'Task nahi mila' });
  if (t.status !== 'open') return res.status(400).json({ error: 'Task already claimed' });
  const { error } = await supabase.from('tasks')
    .update({ status: 'accepted', accepted_by: req.user.id }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  notifyUser(t.user_id, { title: 'Task accepted!', body: `${req.user.name} picked up "${t.title}"`, icon: 'handshake' });
  res.json({ ok: true });
});

/* ---- 6. Counter offer ---- */
app.post('/api/tasks/:id/counter', auth, async (req, res) => {
  const amount = parseInt(req.body.amount, 10);
  if (!amount || amount < 1) return res.status(400).json({ error: 'Amount daalo' });
  const { data: t } = await supabase.from('tasks').select('*').eq('id', req.params.id).single();
  const { data, error } = await supabase.from('counter_offers')
    .insert({ task_id: req.params.id, user_id: req.user.id, amount }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  if (t) notifyUser(t.user_id, { title: 'Counter offer received', body: `₹${amount} offered on "${t.title}"`, icon: 'handshake' });
  res.json({ ok: true, counter: data });
});

/* ---- 7. Notifications ---- */
app.get('/api/notifications', auth, async (req, res) => {
  const { data } = await supabase.from('notifications')
    .select('*').eq('user_id', req.user.id).order('created_at', { ascending: false }).limit(30);
  res.json(data || []);
});

/* ---- 8. Web Push subscribe/unsubscribe ---- */
app.get('/api/push/public-key', (req, res) => res.json({ publicKey: process.env.VAPID_PUBLIC_KEY || null, enabled: pushEnabled }));

app.post('/api/push/subscribe', auth, async (req, res) => {
  try {
    const { endpoint, keys } = req.body.subscription || req.body;
    if (!endpoint || !keys?.p256dh || !keys?.auth) return res.status(400).json({ error: 'Invalid subscription' });
    const { error } = await supabase.from('push_subscriptions')
      .upsert({ user_id: req.user.id, endpoint, p256dh: keys.p256dh, auth: keys.auth }, { onConflict: 'endpoint' });
    if (error) throw error;
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/push/unsubscribe', auth, async (req, res) => {
  const { endpoint } = req.body;
  await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint);
  res.json({ ok: true });
});

/* ---- 9. Payments (Razorpay — UPI + Card escrow) ---- */
app.post('/api/payments/create-order', auth, async (req, res) => {
  if (!razorpay) return res.status(200).json({ paymentRequired: false }); // dev mode: keys nahi hain, skip
  try {
    const amount = parseInt(req.body.amount, 10);
    if (!amount || amount < 10) return res.status(400).json({ error: 'Amount min ₹10 honi chahiye' });
    const order = await razorpay.orders.create({ amount: amount * 100, currency: 'INR', receipt: 'padosi_' + Date.now() });
    await supabase.from('payments').insert({ user_id: req.user.id, razorpay_order_id: order.id, amount, status: 'created' });
    res.json({ paymentRequired: true, orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/payments/verify', auth, async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + '|' + paymentId).digest('hex');
    if (expected !== signature) {
      await supabase.from('payments').update({ status: 'failed' }).eq('razorpay_order_id', orderId);
      return res.status(400).json({ error: 'Payment signature match nahi hui' });
    }
    await supabase.from('payments').update({ status: 'paid', razorpay_payment_id: paymentId }).eq('razorpay_order_id', orderId);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Padosi Pro API: http://localhost:${PORT}`));
