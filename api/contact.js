// backend/api/contact.js
import transporter from '../config/mailer.js'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' })
    }

    const { name, email, subject, message } = req.body

    // Validation simple
    if (!name || !email || !subject || !message) {
        return res.status(422).json({ success: false, message: 'All fields are required' })
    }

    if (name.length > 100 || subject.length > 200 || message.length < 10 || message.length > 5000) {
        return res.status(422).json({ success: false, message: 'Invalid input length' })
    }

    try {
        // Send email to admin
        await transporter.sendMail({
            from: `"CodingWithZak" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,       // where you want to receive messages
            replyTo: email,
            subject: `[Contact] ${subject}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
        })

        // Auto-reply to user
        await transporter.sendMail({
            from: `"CodingWithZak" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Votre message a bien été reçu — CodingWithZak`,
            html: `
        <p>Merci ${name},</p>
        <p>Nous avons bien reçu votre message concernant <strong>${subject}</strong>.</p>
        <p>Notre équipe vous répondra sous 24h.</p>
        <p>Cordialement,<br/><strong>CodingWithZak</strong></p>
      `,
        })

        return res.status(200).json({ success: true, message: 'Message sent successfully' })
    } catch (err) {
        console.error('Mail error:', err)
        return res.status(500).json({ success: false, message: 'Failed to send email' })
    }
}