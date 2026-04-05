const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendContactEmail({ name, email, subject, message }) {
  if (!email) throw new Error("Email utilisateur requis")

  // 1️⃣ EMAIL TO ADMIN
  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `[CodingWithZak] ${subject}`,
    html: `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden">
      
      <div style="background:#000;color:#fff;padding:20px;text-align:center">
        <h2>Nouveau message reçu</h2>
      </div>

      <div style="padding:20px">
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>

        <p><strong>Message :</strong></p>
        <div style="background:#f5f5f5;padding:15px;border-left:4px solid #000;border-radius:5px">
          ${message}
        </div>
      </div>

      <div style="text-align:center;font-size:12px;color:#888;padding:15px;border-top:1px solid #ddd">
        © ${new Date().getFullYear()} CodingWithZak
      </div>
    </div>
    `,
  })

  // 2️⃣ AUTO-REPLY TO USER (FR 🇫🇷)
  await transporter.sendMail({
    from: `"CodingWithZak" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Nous avons bien reçu votre message ✅`,
    html: `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden">
      
      <div style="background:#000;color:#fff;padding:20px;text-align:center">
        <h2>Merci pour votre message 🙌</h2>
      </div>

      <div style="padding:20px">
        <p>Bonjour <strong>${name}</strong>,</p>

        <p>Merci de nous avoir contactés.</p>

        <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>

        <p style="margin-top:10px">
          ⏳ <strong>Délai de réponse :</strong> sous 24 heures (ou plus tôt)
        </p>

        <div style="margin-top:20px;padding:15px;background:#f5f5f5;border-radius:5px">
          <strong>Votre message :</strong><br/>
          ${message}
        </div>

        <p style="margin-top:20px">
          Cordialement,<br/>
          L'équipe CodingWithZak
        </p>
      </div>

      <div style="text-align:center;font-size:12px;color:#888;padding:15px;border-top:1px solid #ddd">
        © ${new Date().getFullYear()} CodingWithZak
      </div>
    </div>
    `,
  })
}

module.exports = { sendContactEmail }