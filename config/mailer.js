const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

transporter.verify((error) => {
  if (error) {
    console.error('❌ Mail transporter error:', error.message)
  } else {
    console.log('✅ Mail server ready')
  }
})

module.exports = transporter
