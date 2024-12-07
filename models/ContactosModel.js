// models/ContactosModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./configuracionDB');

const Contacto = sequelize.define('Contacto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

class ContactosModel {
    static async addContacto(contacto) {
        return await Contacto.create(contacto);
    }

    static async getContactos() {
        return await Contacto.findAll();
    }

    static async getContactoById(id) {
        return await Contacto.findByPk(id);
    }

    static async updateContacto(id, updatedContacto) {
        return await Contacto.update(updatedContacto, {
            where: { id }
        });
    }

    static async deleteContacto(id) {
        return await Contacto.destroy({
            where: { id }
        });
    }
}

module.exports = ContactosModel;