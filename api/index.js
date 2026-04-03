import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import serverless from 'serverless-http'
import contactRoutes from '../routes/contact.js'

const app = express()

// Security
app.use(helmet())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { success: false, message: 'Too many requests. Please try again later.' },
})

app.use('/api/', limiter)

// Body parser
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/contact', contactRoutes)

// 404
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found.' })
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ success: false, message: 'Internal server error.' })
})

export default serverless(app)