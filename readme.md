# Reto Técnico: API de Pokémon con Node.js, Express, Sequelize y Docker

Este proyecto consiste en una API REST construida con **Node.js** y **Express** para la gestión de registros de Pokémon. Utiliza **Sequelize** como ORM para interactuar con una base de datos **MariaDB**. Todo el ecosistema está completamente contenerizado mediante **Docker** y **Docker Compose** para garantizar un despliegue rápido, aislado y sin dependencias locales.

---

## 🛠️ Tecnologías Utilizadas

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **ORM:** Sequelize
- **Base de Datos:** MariaDB (Imagen oficial en contenedor)
- **Contenerización:** Docker & Docker Compose

---

## 🚀 Instrucciones para Ejecutar el Proyecto

Para levantar la aplicación y la base de datos, no necesitas tener instalado Node.js ni MariaDB de manera nativa en tu computadora (por ejemplo, a través de XAMPP). Solo requieres tener instalado **Docker Desktop** y que esté en ejecución.

### Pasos para el despliegue:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd reto

2. **Construir e iniciar los contenedores:**
Ejecuta el siguiente comando en la terminal desde la raíz del proyecto. Este comando descargará las imágenes necesarias, instalará las dependencias limpias de Node de forma interna y encenderá los servicios:

   docker compose up --build

3. **Verificar el inicio:**
Una vez que el contenedor de la base de datos esté listo (mariadbd: ready for connections.), el contenedor de la aplicación se conectará automáticamente y verás los siguientes mensajes en la terminal:

   Conexión a MariaDB establecida correctamente.
   Servidor Express corriendo en http://localhost:3000

4. **Detener la aplicación:**
Para apagar el entorno y liberar los puertos cuando termines las pruebas, presiona Ctrl + C en la terminal y luego ejecuta:

   docker compose down
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

🛰️ **Formato del Endpoint y Ejemplo de Prueba**
La API expone un endpoint principal para registrar nuevos pokémones de manera persistente en la base de datos.

📌 **Crear un Pokémon**
   URL: http://localhost:3000/pokemon

   Método HTTP: POST

   Cabeceras (Headers): - Content-Type: application/json

   Formato del Body (JSON):
   Debes enviar un objeto JSON en el cuerpo de la petición con la propiedad nombre del Pokémon que deseas registrar.
   {
      "nombre": "charizard"
   }

📬 **Respuesta Esperada (Response)**
Si el registro es exitoso, la API responderá con un estado 201 Created y el objeto guardado que incluye su ID autoincremental:

   {
   "id": 6,
   "nombre": "Charizard",
   "updatedAt": "2026-06-29T17:20:00.000Z",
   "createdAt": "2026-06-29T17:20:00.000Z"
   }# reto29junio
