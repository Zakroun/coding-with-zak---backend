const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendContactEmail({ name, email, subject, message }) {
  await transporter.sendMail({
    from: `"${name}" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    replyTo: email,
    subject: `[CodingWithZak] ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="border-bottom:2px solid #000;padding-bottom:8px">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background:#f4f4f4;padding:16px;border-left:4px solid #000">${message}</p>
      </div>
    `,
  })
}

module.exports = { sendContactEmail }