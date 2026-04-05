const nodemailer = require('nodemailer')

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const SITE_URL = process.env.SITE_URL || 'https://codingwithzak.com'
const BRAND = 'CodingWithZak'

// ─────────────────────────────────────────────
// I18N STRINGS
// ─────────────────────────────────────────────

const i18n = {
  fr: {
    dir: 'ltr',
    align: 'left',

    // Admin email
    adminSubjectPrefix: '[Contact]',
    adminHeading: 'Nouveau message reçu',
    adminSubHeading: 'Un visiteur vous a envoyé un message via le formulaire de contact.',
    adminLabelName: 'Nom',
    adminLabelEmail: 'Email',
    adminLabelSubject: 'Sujet',
    adminLabelMessage: 'Message',
    adminReplyHint: 'Répondre directement à cet email contactera l\'expéditeur.',

    // User reply email
    userSubject: `Nous avons bien reçu votre message ✅`,
    userHeading: 'Merci pour votre message !',
    userGreeting: (name) => `Bonjour <strong>${name}</strong>,`,
    userBody: 'Nous avons bien reçu votre message et nous vous répondrons dans les meilleurs délais.',
    userResponseTime: 'Délai de réponse estimé',
    userResponseValue: 'Sous 24 heures',
    userPreviewTitle: 'Votre message',
    userSignOff: 'Cordialement,',
    userTeam: `L'équipe ${BRAND}`,
    ctaLabel: 'Visiter le site',
  },

  en: {
    dir: 'ltr',
    align: 'left',

    adminSubjectPrefix: '[Contact]',
    adminHeading: 'New message received',
    adminSubHeading: 'A visitor submitted a message through the contact form.',
    adminLabelName: 'Name',
    adminLabelEmail: 'Email',
    adminLabelSubject: 'Subject',
    adminLabelMessage: 'Message',
    adminReplyHint: 'Replying to this email will contact the sender directly.',

    userSubject: `We received your message ✅`,
    userHeading: 'Thanks for reaching out!',
    userGreeting: (name) => `Hi <strong>${name}</strong>,`,
    userBody: 'We\'ve received your message and will get back to you as soon as possible.',
    userResponseTime: 'Expected response time',
    userResponseValue: 'Within 24 hours',
    userPreviewTitle: 'Your message',
    userSignOff: 'Best regards,',
    userTeam: `The ${BRAND} Team`,
    ctaLabel: 'Visit Website',
  },

  ar: {
    dir: 'rtl',
    align: 'right',

    adminSubjectPrefix: '[تواصل]',
    adminHeading: 'رسالة جديدة واردة',
    adminSubHeading: 'قام زائر بإرسال رسالة عبر نموذج التواصل.',
    adminLabelName: 'الاسم',
    adminLabelEmail: 'البريد الإلكتروني',
    adminLabelSubject: 'الموضوع',
    adminLabelMessage: 'الرسالة',
    adminReplyHint: 'الرد على هذا البريد سيتواصل مباشرة مع المُرسِل.',

    userSubject: `لقد استلمنا رسالتك ✅`,
    userHeading: 'شكراً على تواصلك معنا!',
    userGreeting: (name) => `مرحباً <strong>${name}</strong>،`,
    userBody: 'لقد استلمنا رسالتك وسنردّ عليك في أقرب وقت ممكن.',
    userResponseTime: 'وقت الرد المتوقع',
    userResponseValue: 'خلال 24 ساعة',
    userPreviewTitle: 'رسالتك',
    userSignOff: 'مع أطيب التحيات،',
    userTeam: `فريق ${BRAND}`,
    ctaLabel: 'زيارة الموقع',
  },
}

// ─────────────────────────────────────────────
// SHARED LAYOUT WRAPPER
// ─────────────────────────────────────────────

function emailWrapper({ dir, align, headerContent, bodyContent, footerContent }) {
  return `
<!DOCTYPE html>
<html lang="${dir === 'rtl' ? 'ar' : 'en'}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${BRAND}</title>
</head>
<body style="
  margin:0; padding:0;
  background-color:#f4f4f5;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  -webkit-font-smoothing:antialiased;
">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="
          max-width:600px;
          background:#ffffff;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 4px 24px rgba(0,0,0,0.08);
        ">

          <!-- HEADER -->
          <tr>
            <td style="
              background:#000000;
              padding:32px 40px;
              text-align:center;
            ">
              <!-- Logo placeholder -->
              <div style="
                display:inline-block;
                background:#ffffff;
                color:#000000;
                font-weight:800;
                font-size:18px;
                letter-spacing:-0.5px;
                padding:8px 18px;
                border-radius:6px;
                margin-bottom:16px;
              ">
                ${BRAND}
              </div>
              ${headerContent}
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:36px 40px;text-align:${align};">
              ${bodyContent}
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              padding:24px 40px;
              text-align:center;
              font-size:12px;
              color:#9ca3af;
              line-height:1.6;
            ">
              ${footerContent}
              <br/>
              © ${new Date().getFullYear()} ${BRAND} · All rights reserved
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─────────────────────────────────────────────
// REUSABLE UI COMPONENTS
// ─────────────────────────────────────────────

function infoRow(label, value, align) {
  return `
  <tr>
    <td style="
      padding:12px 16px;
      text-align:${align};
      border-bottom:1px solid #f3f4f6;
      vertical-align:top;
    ">
      <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;color:#9ca3af;">
        ${label}
      </span>
      <div style="margin-top:4px;font-size:15px;color:#111827;font-weight:500;">
        ${value}
      </div>
    </td>
  </tr>`
}

function messageBox(content, align) {
  return `
  <div style="
    background:#f9fafb;
    border:1px solid #e5e7eb;
    border-${align === 'right' ? 'right' : 'left'}:4px solid #000000;
    border-radius:8px;
    padding:20px;
    font-size:14px;
    color:#374151;
    line-height:1.7;
    white-space:pre-wrap;
    margin-top:8px;
  ">
    ${content}
  </div>`
}

function ctaButton(label, url) {
  return `
  <div style="text-align:center;margin-top:32px;">
    <a href="${url}" style="
      display:inline-block;
      background:#000000;
      color:#ffffff;
      text-decoration:none;
      font-size:14px;
      font-weight:600;
      padding:12px 28px;
      border-radius:6px;
      letter-spacing:0.3px;
    ">
      ${label} →
    </a>
  </div>`
}

function badge(text) {
  return `
  <span style="
    display:inline-block;
    background:#f0fdf4;
    color:#16a34a;
    font-size:12px;
    font-weight:600;
    padding:4px 10px;
    border-radius:20px;
    border:1px solid #bbf7d0;
  ">
    ${text}
  </span>`
}

// ─────────────────────────────────────────────
// ADMIN EMAIL TEMPLATE
// ─────────────────────────────────────────────

function buildAdminEmail({ name, email, subject, message }, t) {
  const header = `
    <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
      ${t.adminHeading}
    </h1>
    <p style="margin:8px 0 0;font-size:14px;color:#a1a1aa;">
      ${t.adminSubHeading}
    </p>`

  const body = `
    <table width="100%" cellpadding="0" cellspacing="0" style="
      border:1px solid #e5e7eb;
      border-radius:8px;
      overflow:hidden;
      margin-bottom:24px;
    ">
      ${infoRow(t.adminLabelName, name, t.align)}
      ${infoRow(t.adminLabelEmail, `<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>`, t.align)}
      ${infoRow(t.adminLabelSubject, subject, t.align)}
    </table>

    <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;color:#9ca3af;">
      ${t.adminLabelMessage}
    </p>
    ${messageBox(message, t.align)}

    <p style="
      margin-top:24px;
      font-size:13px;
      color:#6b7280;
      padding:12px 16px;
      background:#fffbeb;
      border-radius:6px;
      border:1px solid #fde68a;
    ">
      💡 ${t.adminReplyHint}
    </p>`

  const footer = `${BRAND} — Contact Notification`

  return emailWrapper({
    dir: t.dir, align: t.align,
    headerContent: header,
    bodyContent: body,
    footerContent: footer,
  })
}

// ─────────────────────────────────────────────
// USER AUTO-REPLY TEMPLATE
// ─────────────────────────────────────────────

function buildUserEmail({ name, message }, t) {
  const header = `
    <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
      ${t.userHeading}
    </h1>`

  const body = `
    <p style="margin:0 0 16px;font-size:16px;color:#111827;line-height:1.6;">
      ${t.userGreeting(name)}
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
      ${t.userBody}
    </p>

    <!-- Response time badge row -->
    <div style="
      display:flex;
      align-items:center;
      gap:12px;
      background:#f9fafb;
      border:1px solid #e5e7eb;
      border-radius:8px;
      padding:16px 20px;
      margin-bottom:28px;
    ">
      <span style="font-size:22px;">⏳</span>
      <div>
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#9ca3af;">
          ${t.userResponseTime}
        </div>
        <div style="font-size:15px;font-weight:700;color:#111827;margin-top:2px;">
          ${t.userResponseValue}
        </div>
      </div>
      <div style="margin-${t.align === 'right' ? 'right' : 'left'}:auto;">
        ${badge('✓')}
      </div>
    </div>

    <!-- Message preview -->
    <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;color:#9ca3af;">
      ${t.userPreviewTitle}
    </p>
    ${messageBox(message, t.align)}

    <!-- Sign-off -->
    <p style="margin-top:32px;font-size:15px;color:#374151;line-height:1.7;">
      ${t.userSignOff}<br/>
      <strong style="color:#111827;">${t.userTeam}</strong>
    </p>

    ${ctaButton(t.ctaLabel, SITE_URL)}`

  const footer = `
    You're receiving this because you contacted us via ${BRAND}.<br/>
    Please do not reply directly to this automated message.`

  return emailWrapper({
    dir: t.dir, align: t.align,
    headerContent: header,
    bodyContent: body,
    footerContent: footer,
  })
}

// ─────────────────────────────────────────────
// MAIN EXPORTED FUNCTION
// ─────────────────────────────────────────────

async function sendContactEmail({ name, email, subject, message, language = 'fr' }) {
  if (!email) throw new Error('User email is required')

  const t = i18n[language] ?? i18n['fr']

  // 1️⃣ Admin notification
  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `${t.adminSubjectPrefix} ${subject}`,
    html: buildAdminEmail({ name, email, subject, message }, t),
  })

  // 2️⃣ User auto-reply
  await transporter.sendMail({
    from: `"${BRAND}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: t.userSubject,
    html: buildUserEmail({ name, message }, t),
  })
}

module.exports = { sendContactEmail }