const cors = require('cors')
const { sendContactEmail } = require('../config/mailer')
const connectDB = require('../config/db')
const Contact = require('../models/Contact')

// CORS configuration
const corsMiddleware = cors({
    origin: [
        'https://codingwiithzak.vercel.app',
        'http://localhost:5173',
    ],
    methods: ['POST', 'OPTIONS'],
    credentials: true,
})

// Utility to run middleware in Next.js / API routes
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) return reject(result)
            return resolve(result)
        })
    })
}

module.exports = async (req, res) => {
    try {
        // Run CORS middleware
        await runMiddleware(req, res, corsMiddleware)
        // Connect to the database
        await connectDB()
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            return res.status(200).end()
        }
        // Only allow POST requests
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' })
        }
        const { name, email, subject, message, language } = req.body
        // Validate required fields
        if (!name || !email || !subject || !message || !language) {
            return res.status(400).json({ error: 'All fields are required' })
        }
        // Save contact message to database
        await Contact.create({ name, email, subject, message, language })
        // Send contact email
        await sendContactEmail({ name, email, subject, message, language })
        return res.status(200).json({ success: true })
    } catch (err) {
        console.error("Error in contact API:", err)
        return res.status(500).json({ error: 'Failed to process request' })
    }
}