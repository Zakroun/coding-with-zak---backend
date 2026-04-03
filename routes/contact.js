const express = require('express')
const { body } = require('express-validator')
const { sendContact } = require('../controllers/contactController')

const router = express.Router()

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 5000 }),
]

router.post('/', contactValidation, sendContact)

module.exports = router
