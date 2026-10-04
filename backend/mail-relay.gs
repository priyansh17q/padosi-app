/**
 * Padosi Pro — OTP mail relay (Google Apps Script web app)
 *
 * Kyun: Render FREE tier SMTP ports (25/465/587) block karta hai, to backend Gmail SMTP se mail
 * nahi bhej sakta. Backend isliye is script ko HTTPS POST karta hai, aur ye script tumhare apne
 * Gmail se OTP mail bhejti hai (free, koi domain nahi chahiye).
 *
 * Setup (script.google.com → New project → ye poora code paste → Deploy → Web app):
 *   Execute as: Me   |   Who has access: Anyone
 * Fir mila "Web app URL" backend ke MAIL_WEBHOOK_URL me, aur SECRET wahi MAIL_WEBHOOK_SECRET me.
 *
 * Limit: free Gmail account se ~100 mail/din (MailApp quota). Zyada users hone par Resend/Brevo
 * jaisi service + apna domain use karna.
 *
 * Safety: sirf SECRET match hone par chalta hai, aur sirf "6-digit OTP" wali fixed mail bhejta hai
 * (koi bhi apna text bhej ke is script se spam/phishing nahi kar sakta).
 */
const SECRET = 'PASTE_SECRET_HERE'; // backend ke MAIL_WEBHOOK_SECRET ke bilkul same

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return reply({ ok: false, error: 'unauthorized' });
    const code = String(d.code);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.to) || !/^\d{6}$/.test(code)) {
      return reply({ ok: false, error: 'bad input' });
    }
    MailApp.sendEmail({
      to: d.to,
      subject: code + ' — aapka Padosi Pro login code',
      name: 'Padosi Pro',
      htmlBody:
        '<div style="font-family:sans-serif;max-width:420px;margin:auto;border:1px solid #e5eeff;border-radius:12px;padding:24px">' +
        '<h2 style="color:#006948">Padosi Pro 🔐</h2>' +
        '<p>Aapka login OTP:</p>' +
        '<div style="font-size:36px;font-weight:800;letter-spacing:8px;color:#006948">' + code + '</div>' +
        '<p style="color:#6d7a72;font-size:13px">Ye code 10 minute valid hai. Kisi ko mat batayein.</p>' +
        '</div>'
    });
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Ek baar editor me "Run" karo: Google permission maangega aur tumhe ek test mail aayegi. */
function testMail() {
  MailApp.sendEmail(Session.getActiveUser().getEmail(), 'Padosi Pro test', 'Mail relay chal raha hai ✅');
}
