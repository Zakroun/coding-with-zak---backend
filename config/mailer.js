const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendContactEmail({ name, email, subject, message }) {
  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `[CodingWithZak] ${subject}`,
    html: `
  <html>
    <head>
      <style>
        body, p, h1, h2, h3 {
          margin: 0; padding: 0;
        }
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #d0d0d0;
        }
        .header {
          background-color: #000000;
          color: #ffffff;
          padding: 20px;
          text-align: center;
        }
        .header h2 {
          font-size: 24px;
          font-weight: normal;
        }
        .content {
          padding: 20px;
        }
        .content p {
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .message-box {
          background-color: #f0f0f0;
          padding: 16px;
          border-left: 4px solid #000000;
          border-radius: 4px;
          font-style: italic;
          color: #111111;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #888888;
          padding: 15px 20px;
          border-top: 1px solid #d0d0d0;
        }
        @media (max-width: 640px) {
          .container {
            margin: 20px;
          }
          .header h2 {
            font-size: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Message</h2>
        </div>
        <div class="content">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div class="message-box">
            ${message}
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} CodingWithZak. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `,
  });
}

module.exports = { sendContactEmail }