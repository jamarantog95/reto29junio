
const { Sequelize } = require('sequelize');

// =========================================================================
// 1. Configuración de la Base de Datos (MariaDB)
// =========================================================================

const sequelize = new Sequelize('pokemon_db', 'root', 'root_password', { // <-- Agregamos 'root_password' al usar docker
   // Ponemos 'root' como usuario por defecto. Si no tienes contraseña, déjala en ''
   // host: 'localhost',

   // Usamos 'db' porque así se llamará nuestro contenedor de MariaDB en docker-compose
   host: process.env.DB_HOST || 'db',
   dialect: 'mariadb',
   logging: false
});

module.exports = sequelize;


