// controllers/ContactosController.js
const ContactosModel = require('../models/ContactosModel');
const moment = require('moment');

class ContactosController {
    static async add(req, res) {
        const { nombre, email, comentario } = req.body;
        const ip = req.ip;
        const fecha = moment().format('HH/DD/MM/YYYY');

        console.log(fecha)

        if (!nombre || !email || !comentario) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        try {
            await ContactosModel.addContacto({ nombre, email, comentario, ip, fecha });
            res.json({ success: true, message: 'Contacto guardado exitosamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al guardar el contacto' });
        }
    }
}

module.exports = ContactosController;