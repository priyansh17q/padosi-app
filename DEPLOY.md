# 🚀 Padosi Pro — FREE DEPLOY Guide (₹0 me sab kuch)

## Project Structure
```
padosi-pro/
├── frontend/          # Netlify pe deploy hoga
│   ├── index.html
│   ├── styles.css
│   ├── config.js      # ← sirf 1 line edit (backend URL)
│   ├── api.js         # API client
│   └── app.js         # main app logic
├── backend/           # Render pe deploy hoga
│   ├── server.js
│   ├── package.json
│   ├── db.sql         # Supabase me run karna hai
│   └── .env.example   # → .env banao
└── DEPLOY.md          # ye file
```

---

## Step 1: Database (Supabase — free)

1. [supabase.com](https://supabase.com/) → GitHub se login → **New Project** (free plan)
2. Left menu → **SQL Editor** → New query → `backend/db.sql` ka poora content paste → **Run**
3. **Settings → API** se `Project URL` aur `service_role` key copy kar lo

## Step 2: Gmail Connector (free)

1. Gmail me **2-Step Verification ON** karo
2. [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) → App password generate karo (16-letter)
3. Ye email + password `.env` me jayega

## Step 2b: Notifications (Web Push — free, "sabke phone pe")

VAPID keys `.env.example` me **pehle se generated** hain — kuch nahi karna, seedha copy ho jayenge Step 3 me. (Apni khud ki security ke liye naya set banana ho to jab Node/npm mil jaye: `npx web-push generate-vapid-keys`.)

⚠️ **iPhone note**: Web Push Android Chrome + Desktop browsers pe turant kaam karta hai. iPhone (Safari) pe kaam karne ke liye site ko **"Add to Home Screen"** se install karna padta hai (iOS 16.4+) — normal Safari tab me push nahi aata, ye Apple ka rule hai, humara nahi.

## Step 2c: Payments (Razorpay — UPI + Card escrow)

1. [razorpay.com](https://razorpay.com/) → sign up (free, turant ho jata hai)
2. Dashboard **top-right toggle → Test Mode** (already default) → **Settings → API Keys → Generate Test Key**
3. `Key Id` + `Key Secret` copy kar lo — ye Step 3 ke env vars me jayenge
4. **Test mode me turant kaam karta hai, KYC nahi chahiye.** Test payment karne ke liye:
   - UPI: `success@razorpay` daal do → auto success
   - Card: `4111 1111 1111 1111`, koi bhi future expiry, koi bhi CVV
5. **Real paise lene ke liye** (LIVE mode): Razorpay apna business KYC maangta hai (PAN, bank account, business proof) — ye approve hone me **1-3 din** lagte hain, aaj instantly nahi ho sakta. Jab KYC clear ho jaye, Live Mode se naya key generate karke env vars update kar dena — code me koi change nahi karna padega.
6. Agar Razorpay keys env me nahi dalo, app automatically bina-payment mode me chalta rahega (dev/demo safe fallback) — kuch nahi tootega.

## Step 3: Backend Deploy (Render — free)

1. Code GitHub repo me push karo
2. [render.com](https://render.com/) → GitHub login → **New → Web Service** → repo select
3. Root Directory: `backend` | Build: `npm install` | Start: `node server.js`
4. **Environment Variables** add karo (`.env.example` se copy):
   - `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`
   - `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` (pehle se `.env.example` me hain)
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` (Step 2c se — optional, khaali chhod sakte ho abhi)
   - `ALLOWED_ORIGINS` = tumhara Netlify URL (jaise `https://padosi-pro.netlify.app`)
5. **Deploy** → mila URL: `https://padosi-pro-api.onrender.com`

## Step 4: Frontend Deploy (Netlify — free)

1. [netlify.com](https://netlify.com/) → login → **Add new site → Deploy manually**
2. `frontend` folder ko drag-drop karo
3. `frontend/config.js` me `window.API_BASE = 'https://padosi-pro-api.onrender.com/api'` karke re-upload (ya GitHub connect)
4. Render ke `ALLOWED_ORIGINS` me Netlify URL add karke **Manual Deploy → Clear cache & deploy**

## Step 5: Test

1. Netlify site kholo → login screen aayega
2. Apna Gmail daalo → OTP aayega inbox me → verify
3. **Post Task** karo → database me save hoga → Explore feed me turant dikhega ✅
4. Health check: `https://padosi-pro-api.onrender.com/api/health`

---

## ⚠️ Important Notes

- **Development me** (`localhost`): agar Gmail env vars nahi hain, to OTP console me print hota hai aur API response me `devOtp` aata hai — frontend auto-fill kar deta hai
- **Cooldown**: 60 second me ek hi OTP bhej sakte ho (spam protection)
- **OTP expiry**: 10 minute
- **Max attempts**: 5 galat OTP ke baad naya OTP maango
- **Rate limiting**: har IP se 1 minute me max 120 API calls (aur OTP endpoint pe max 5/min) — abuse/spam se bachne ke liye

## 📈 1000 users load test (honest reality check)

Backend deploy hone ke baad (ya locally Node.js install karke):
```bash
cd backend
node loadtest.js https://padosi-pro-api.onrender.com 1000 3
```
Ye script 1000 "users" ko simulate karke report degi: kitne % requests successful the, aur latency kaisi thi.

**Seedha sach:**
- **Render FREE tier** ek hi lightweight instance hai jo idle rehne par so jata hai (cold start ~30-50s lagta hai jab wapas jaagta hai) aur limited RAM/CPU hai. 1000 **ek-saath** users free tier pe latency spikes ya kuch timeouts dikha sakte hain.
- **Supabase FREE tier** ka connection pool bhi limited hai (~60 direct connections).
- Agar **aaj hi** guaranteed-zero-failure chahiye 1000 concurrent users pe, to Render ka **paid plan** (Starter $7/mo+, no cold start, zyada RAM) aur Supabase ka **Pro plan** lena best rahega — free tier sirf demo/launch-soft ke liye best hai.
- Jo bhi ho, upar wala `loadtest.js` chala ke **real number** dekh lo apne deployment pe — guess mat karo.
