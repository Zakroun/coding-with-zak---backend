const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    language: String,
}, { timestamps: true })

module.exports = mongoose.models.Contact || mongoose.model('Contact', ContactSchema)