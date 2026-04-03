import nodemailer from 'nodemailer'
import 'dotenv/config'
import { json } from 'micro' // optional, if needed

import transporter from '../config/mailer.js'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' })
    }

    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
        return res.status(422).json({ success: false, message: 'All fields are required' })
    }

    const mailOptions = {
        from: `"CodingWithZak" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `[Contact] ${subject}`,
        html: `<p>${message}</p><p>From: ${name} - ${email}</p>`,
    }

    try {
        await transporter.sendMail(mailOptions)
        return res.status(200).json({ success: true, message: 'Message sent' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Failed to send email' })
    }
}