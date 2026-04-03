# CodingWithZak — Backend

> Node.js + Express + Nodemailer API powering the contact form for the CodingWithZak agency website.

---

## 🗂 Project Structure

```
backend/
├── config/
│   └── mailer.js            # Nodemailer transporter configuration
├── controllers/
│   └── contactController.js # Contact form logic & email sending
├── routes/
│   └── contact.js           # /api/contact route definition
├── .env.example             # Environment variable template
├── .gitignore
├── package.json
└── server.js                # Express app entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A Gmail account (or any SMTP provider)

### Installation

```bash
cd backend
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Then open `.env` and fill in your credentials (see the table below).

### Start the Server

```bash
node server.js
# → http://localhost:5000
```

For development with auto-restart:

```bash
npm install -g nodemon
nodemon server.js
```

---

## ⚙️ Environment Variables

Create a `.env` file at the root of `/backend` using `.env.example` as a template.

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port the server listens on | `5000` |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | Your SMTP email address | `you@gmail.com` |
| `SMTP_PASS` | SMTP password or App Password | `xxxx xxxx xxxx xxxx` |
| `CONTACT_EMAIL` | Destination email for contact submissions | `codingwiithzak@gmail.com` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 📧 Gmail Setup (Recommended)

Using Gmail as your SMTP provider requires an **App Password** — not your regular Gmail password.

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification**
3. Go to **App Passwords** → [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Generate a password for "Mail" + "Other (custom name)"
5. Paste it into `SMTP_PASS` in your `.env`

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```

---

## 🔌 API Endpoints

### `POST /api/contact`

Receives the contact form submission and sends an email.

**Request Body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss a project."
}
```

**Success Response — `200 OK`:**

```json
{
  "success": true,
  "message": "Email sent successfully."
}
```

**Error Response — `500 Internal Server Error`:**

```json
{
  "success": false,
  "message": "Failed to send email."
}
```

---

## 🧰 Tech Stack

| Package | Purpose |
|---------|---------|
| [Express](https://expressjs.com/) | HTTP server & routing |
| [Nodemailer](https://nodemailer.com/) | Email sending via SMTP |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable loading |
| [cors](https://github.com/expressjs/cors) | Cross-Origin Resource Sharing |

---

## 🔒 CORS

The server only accepts requests from the origin defined in `FRONTEND_URL`.

```js
// server.js
app.use(cors({ origin: process.env.FRONTEND_URL }));
```

In production, set `FRONTEND_URL` to your actual deployed frontend domain:

```
FRONTEND_URL=https://codingwithzak.com
```

---

## 🗂 File Responsibilities

| File | Role |
|------|------|
| `server.js` | Bootstraps Express, loads middleware, mounts routes |
| `config/mailer.js` | Creates and exports the Nodemailer transporter using `.env` credentials |
| `routes/contact.js` | Defines `POST /api/contact` and delegates to the controller |
| `controllers/contactController.js` | Validates input, calls Nodemailer, returns JSON response |

---

## 🚢 Deployment

### Option 1 — Railway / Render / Fly.io

1. Push the `/backend` folder to a Git repo
2. Create a new service pointing to the repo
3. Set all environment variables in the platform's dashboard
4. Deploy — the platform runs `node server.js` automatically

### Option 2 — VPS (Ubuntu + PM2)

```bash
npm install -g pm2
pm2 start server.js --name codingwithzak-api
pm2 save
pm2 startup
```

---

## 📞 Contact

- 📧 Email: codingwiithzak@gmail.com
- 📱 Phone: +212 625 702 587
- 💬 WhatsApp: https://wa.me/212625702587