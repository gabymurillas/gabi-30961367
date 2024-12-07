// configuracionDB.js
const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "db.sqlite"),
    logging: false,
});

sequelize
    .sync()
    .then(() => console.log("Base de datos y tablas creadas"))
    .catch((error) => console.log("Error al sincronizar:", error));

module.exports = sequelize;