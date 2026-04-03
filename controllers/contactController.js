const { validationResult } = require('express-validator')
const transporter = require('../config/mailer')

async function sendContact(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() })
  }

  const { name, email, subject, message } = req.body

  const adminMailOptions = {
    from: `"CodingWithZak Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; background: #f9f9f9; margin: 0; padding: 0; }
          .container { max-width: 560px; margin: 40px auto; background: #fff; border: 1px solid #e0e0e0; }
          .header { background: #000; padding: 28px 32px; }
          .header h1 { color: #fff; font-size: 18px; margin: 0; letter-spacing: -0.3px; }
          .body { padding: 32px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7d7d7d; margin-bottom: 4px; }
          .value { font-size: 14px; color: #111; line-height: 1.6; }
          .message-box { background: #f9f9f9; border-left: 3px solid #000; padding: 16px; margin-top: 8px; }
          .footer { padding: 16px 32px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #aaa; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouveau message — CodingWithZak</h1>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">Nom</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color:#000">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Sujet</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message.replace(/\n/g, '<br/>')}</div>
            </div>
          </div>
          <div class="footer">codingwiithzak@gmail.com · +212 625 702 587</div>
        </div>
      </body>
      </html>
    `,
  }

  const autoReplyOptions = {
    from: `"CodingWithZak" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Votre message a bien été reçu — CodingWithZak`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; background: #f9f9f9; margin: 0; }
          .container { max-width: 560px; margin: 40px auto; background: #fff; border: 1px solid #e0e0e0; }
          .header { background: #000; padding: 28px 32px; }
          .header h1 { color: #fff; font-size: 18px; margin: 0; }
          .body { padding: 32px; line-height: 1.7; font-size: 14px; color: #333; }
          .footer { padding: 16px 32px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #aaa; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Merci, ${name} !</h1>
          </div>
          <div class="body">
            <p>Nous avons bien reçu votre message concernant <strong>${subject}</strong>.</p>
            <p>Notre équipe vous répondra dans les <strong>24 heures</strong>.</p>
            <p>En attendant, n'hésitez pas à nous contacter via WhatsApp : <a href="https://wa.me/212625702587" style="color:#000">+212 625 702 587</a></p>
            <p>Cordialement,<br/><strong>CodingWithZak</strong></p>
          </div>
          <div class="footer">CodingWithZak · codingwiithzak@gmail.com · Maroc</div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(autoReplyOptions)
    return res.status(200).json({ success: true, message: 'Message sent successfully.' })
  } catch (err) {
    console.error('Mail error:', err)
    return res.status(500).json({ success: false, message: 'Failed to send email.' })
  }
}

module.exports = { sendContact }
