import mongoose from 'mongoose'

let isConnected = false

const connectDB = async () => {
    if (isConnected) return

    const db = await mongoose.connect(process.env.MONGO_URI)
    isConnected = db.connections[0].readyState
}

const TestSchema = new mongoose.Schema({
    name: String,
}, { timestamps: true })

const TestModel = mongoose.models.Test || mongoose.model('Test', TestSchema)

export default async function handler(req, res) {
    await connectDB()

    if (req.method === 'POST') {
        try {
            const { name } = req.body

            const doc = await TestModel.create({ name })

            return res.status(200).json({
                success: true,
                data: doc
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: err.message })
        }
    }

    if (req.method === 'GET') {
        try {
            const data = await TestModel.find().sort({ createdAt: -1 })
            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    return res.status(405).json({ error: 'Method not allowed' })
}