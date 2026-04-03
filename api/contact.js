const { sendContactEmail } = require('../config/mailer')

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://codingwithzak.com')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

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