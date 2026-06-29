const express = require('express');
const sequelize = require('./config/db');
const pokemonController = require('./controllers/pokemonController');

const app = express();
app.use(express.json());

// =========================================================================
// 1. Definición de Rutas
// =========================================================================
app.post('/pokemon', pokemonController.createPokemon);

// =========================================================================
// 2. Verificación de Conexión y Arranque del Servidor
// =========================================================================
const PORT = 3000;

async function startServer() {
   try {
      console.log('Intentando conectar a MariaDB...');

      // A. Autentica las credenciales con la BD
      await sequelize.authenticate();

      // B. Sincroniza el modelo (crea la tabla automáticamente si no existe)
      await sequelize.sync({ alter: true });

      console.log('Conexión a MariaDB establecida correctamente.');
      console.log('Tabla de Pokemons verificada/creada con éxito.');

      // C. Levanta Express solo si la BD está lista
      app.listen(PORT, () => {
         console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
      });
   } catch (error) {
      console.error('❌ ERROR AL CONECTAR A MARIADB:');
      console.error(error.message);
   }
}

// =========================================================================
// 3. Iniciar el Servidor
// =========================================================================
startServer();