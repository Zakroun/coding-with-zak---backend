import mongoose from 'mongoose'

let isConnected = false

const connectDB = async () => {
    try {
        if (isConnected) return

        console.log("Connecting to DB...")

        const db = await mongoose.connect(process.env.MONGO_URI)

        isConnected = db.connections[0].readyState

        console.log("✅ DB connected")
    } catch (err) {
        console.error("❌ DB ERROR:", err)
        throw err
    }
}

const TestSchema = new mongoose.Schema({
    name: String,
}, { timestamps: true })

const TestModel = mongoose.models.Test || mongoose.model('Test', TestSchema)

export default async function handler(req, res) {
    try {
        await connectDB()

        if (req.method === 'POST') {
            const { name } = req.body

            const doc = await TestModel.create({ name })

            return res.status(200).json({ success: true, data: doc })
        }

        if (req.method === 'GET') {
            const data = await TestModel.find()
            return res.status(200).json(data)
        }

        return res.status(405).json({ error: 'Method not allowed' })

    } catch (err) {
        console.error("🔥 GLOBAL ERROR:", err)
        return res.status(500).json({
            error: err.message || "Server crashed"
        })
    }
}