const axios = require('axios');
const Pokemon = require('../models/pokemon');

const createPokemon = async (req, res) => {
   try {
      // 1. CONTROL DE ENTRADA: Validar que el payload contenga la estructura esperada
      const pokemonNameInput = req.body.name || req.body.pokemon;

      if (!pokemonNameInput) {
         return res.status(400).json({
            error: "Bad Request",
            message: "Debe proveer el nombre del personaje en el campo 'name' o 'pokemon'."
         });
      }

      const searchName = pokemonNameInput.toLowerCase().trim();
      let pokeData;

      // 2. CAPA DE API EXTERNA: Captura fallos de red, timeouts o 404 en PokeAPI
      try {
         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchName}`, {
            timeout: 5000 // 5 segundos de límite para evitar colgar el servidor
         });
         pokeData = response.data;
      } catch (apiError) {
         // Caso A: La API respondió pero con un error (ej. 404 Not Found)
         if (apiError.response) {
            if (apiError.response.status === 404) {
               return res.status(404).json({
                  error: "Not Found",
                  message: `El pokemon '${pokemonNameInput}' no existe en la API externa.`
               });
            }
            return res.status(502).json({
               error: "Bad Gateway",
               message: "La API externa devolvió un error inesperado.",
               details: apiError.response.statusText
            });
         }
         // Caso B: No hubo respuesta (problemas de red locales, DNS, caída de internet)
         return res.status(503).json({
            error: "Service Unavailable",
            message: "No se pudo establecer conexión con la API externa (Timeout o red inaccesible)."
         });
      }

      // 3. CAPA DE INTEGRIDAD DE DATOS: Manejo de respuestas inesperadas o nulas
      // Verificamos de forma segura que las propiedades esenciales existan antes de mapear
      if (!pokeData || !pokeData.id || !pokeData.name || !pokeData.sprites) {
         return res.status(502).json({
            error: "Bad Gateway",
            message: "La estructura de datos devuelta por la API externa está incompleta o corrupta."
         });
      }

      const pokemonToSave = {
         id: pokeData.id,
         name: pokeData.name,
         base_experience: pokeData.base_experience || 0, // Opcion de contingencia por si llega nulo
         height: pokeData.height || 0,
         weight: pokeData.weight || 0,
         sprite_url: pokeData.sprites.front_default || null
      };

      // 4. CAPA DE PERSISTENCIA: Captura caídas, bloqueos o errores de escritura en MariaDB
      try {
         const [pokemonRecord, created] = await Pokemon.upsert(pokemonToSave);

         return res.status(created ? 201 : 200).json({
            message: created ? "Pokemon registrado con éxito" : "Pokemon actualizado con éxito",
            data: pokemonRecord
         });
      } catch (dbError) {
         console.error("Error en la base de datos:", dbError.message);
         return res.status(500).json({
            error: "Internal Server Error",
            message: "El servidor obtuvo los datos pero falló al intentar persistirlos en MariaDB.",
            code: "DB_PERSISTENCE_ERROR"
         });
      }

   } catch (generalError) {
      // Atrapa cualquier otro error crítico no previsto en el código
      console.error("Error crítico no controlado:", generalError);
      return res.status(500).json({
         error: "Internal Server Error",
         message: "Ocurrió un error inesperado en el servidor."
      });
   }
};

module.exports = {
   createPokemon
};