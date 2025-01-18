// controllers/ContactosController.js
const ContactosModel = require('../models/ContactosModel');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

class ContactosController {
    static async add(req, res) {
        const { nombre, email, comentario, ip, country } = req.body;
        console.log(req.body);
        const fecha = moment().format('llll');

        console.log(fecha)

        if (!nombre || !email || !comentario) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        try {
            await ContactosModel.addContacto({ nombre, email, comentario, ip, country, fecha });
            sendEmail(email, 'Un nuevo contacto guardado', `
                <h2>Nuevo Contacto</h2>
                <br/>
                <ol>
                <li>Nombre: ${nombre}</li>
                <li>Correo: ${email}</li>
                <li>Fecha: ${fecha}</li>
                <li>IP: ${ip}</li>
                <li>País: ${country}</li>
                <li>Comentario: ${comentario}</li>
                </ol>
                `)
            res.json({ success: true, message: 'Contacto guardado exitosamente' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Error al guardar el contacto' });
        }
    }

    static async verifyCaptcha(req, res) {
        try {
        const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.token}`;
          const response = await fetch(verificationURL);
      
          const data = await response.json();
          if (!data.success) {
            console.log(data);
            return res.status(400).json({ success: false, message: 'Verificacion denegada - Valide el reCaptcha' });
          } 
          return res.status(200).json({ success: true, message: 'Validado' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Error al validar el reCaptcha', error: e.toString()});
        }
    }
}

module.exports = ContactosController;

