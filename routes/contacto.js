// routes/contactos.js
const express = require('express');
const router = express.Router();
const ContactosController = require('../controllers/ContactosController');

router.post('/add', ContactosController.add);

module.exports = router;