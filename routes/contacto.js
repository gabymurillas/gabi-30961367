// routes/contactos.js
const express = require('express');
const router = express.Router();
const ContactosController = require('../controllers/ContactosController');

router.post('/add', ContactosController.add);
router.post('/verify-recaptcha', ContactosController.verifyCaptcha);

module.exports = router;