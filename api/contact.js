// const { sendContactEmail } = require('../config/mailer')
// const cors = require('cors')

// // CORS config
// const corsMiddleware = cors({
//     origin: [
//         'https://codingwiithzak.vercel.app',
//         'http://localhost:5173',
//     ],
//     methods: ['POST', 'OPTIONS'],
//     credentials: true,
// })

// // middleware runner
// function runMiddleware(req, res, fn) {
//     return new Promise((resolve, reject) => {
//         fn(req, res, (result) => {
//             if (result instanceof Error) return reject(result)
//             return resolve(result)
//         })
//     })
// }

// module.exports = async (req, res) => {
//     // run CORS first
//     await runMiddleware(req, res, corsMiddleware)

//     // handle preflight
//     if (req.method === 'OPTIONS') {
//         return res.status(200).end()
//     }

//     // allow only POST
//     if (req.method !== 'POST') {
//         return res.status(405).json({ error: 'Method not allowed' })
//     }

//     try {
//         const { name, email, subject, message } = req.body

//         if (!name || !email || !subject || !message) {
//             return res.status(400).json({ error: 'All fields are required' })
//         }

//         await sendContactEmail({ name, email, subject, message })

//         return res.status(200).json({ success: true })
//     } catch (err) {
//         console.error('Mail error:', err)
//         return res.status(500).json({ error: 'Failed to send email' })
//     }
// }

module.exports = async (req, res) => {
    return res.status(200).json({ message: "API works 🔥" })
}