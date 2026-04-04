const { sendContactEmail } = require('../config/mailer')

const ALLOWED_ORIGINS = [
    'https://codingwiithzak.vercel.app',
    'https://codingwithzak.com',
    'http://localhost:5173',
]

module.exports = async (req, res) => {
    const origin = req.headers.origin

    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        await sendContactEmail({ name, email, subject, message })
        return res.status(200).json({ success: true })
    } catch (err) {
        console.error('Mail error:', err)
        return res.status(500).json({ error: 'Failed to send email' })
    }
}