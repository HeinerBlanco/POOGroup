//REST API representational state transfer
// CRUD (Create, Read, Update, Delete)

/* 
Primero crear backend con "npm init -y"
para que se instalen todos los archivos que se van a crear.

Ingresar al archivo package.json y personalizar el archivo, 
Borrar el "main" y en la parte de scripts, poner dentro "start": "nodemon index.js"

Despues instalar varios modulos (npm install express mongoose nodemon)
*/

//importar express,mongoose y cors
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// importar cada model
const modeloUsuario = require("../backend/models/userModel");
const modeloEmpleo = require("../backend/models/empleoModel");
const modeloSolicitudes = require("../backend/models/solicitudesModel");




//crear una instancia de express
const app = express();
app.use(express.json());
app.use(cors());



//escuchar en el puerto 3000
app.listen(3000, function () {
    console.log("Servidor escuchando en el puerto 3000");
}); 



// Conectamos a la base de datos
mongoose
  .connect(
    "mongodb+srv://JeinerBlanco3:BRAinner2714@jeinerblanco.rzos5qi.mongodb.net/?retryWrites=true&w=majority&appName=JeinerBlanco"

  )
  // Todo bien.
  .then(function () {
    console.log("Conexion a base de datos exitosa");
  })
  // Todo mal.
  .catch(function (error) {
    console.error("Error al conectar a la base de datos:", error);
  });







// Ruta principal para crear un nuevo usuario
app.post("/users", async function (solicitud, respuesta) {
  console.log("Atendiendo petición POST para crear /users");

  console.log("Datos recibidos:", solicitud.body);

  if (!solicitud.body || Object.keys(solicitud.body).length === 0) {
    console.log("Error al obtener datos del usuario, status 400");
    respuesta.status(400).send("No se recibieron datos del usuario");
    return;
  }

  // Crear el nuevo usuario con los datos recibidos
  const nuevoUsuario = new modeloUsuario({
    name: solicitud.body.name,
    email: solicitud.body.email,
    password: solicitud.body.password,
    role: solicitud.body.role,
  });

  console.log("Usuario creado localmente (no guardado aún):", nuevoUsuario);

  try {
    console.log("Guardando nuevo usuario en la base de datos...");
    const usuarioGuardado = await nuevoUsuario.save();
    console.log("Usuario guardado exitosamente:", usuarioGuardado);
    respuesta.status(201).send(usuarioGuardado);
  } catch (error) {
    console.error("Error al guardar usuario en la base de datos:", error);
    respuesta.status(500).send("Error al guardar usuario");
  }
});






// Ruta para obtener un usuario por su correo electrónico
app.get("/users/email/:email", async function (request, response) {
  console.log("Atendiendo solicitud GET a /users/email/:email");
  const email = request.params.email;

  try {
      const usuario = await modeloUsuario.findOne({ email: email });
      if (!usuario) {
          console.log("Usuario no encontrado");
          response.status(404).send("Usuario no encontrado");
          return;
      }

      console.log("Usuario encontrado:", usuario);
      response.status(200).send(usuario);
  } catch (error) {
      console.error("Error al obtener usuario por correo:", error);
      response.status(500).send("Error al obtener usuario");
  }
});



// Ruta para agregar nuevos empleos a la base de datos

app.post("/empleos", async function (solicitud, respuesta) {
  console.log("Atendiendo petición POST para crear /empleos");

  if (!solicitud.body || Object.keys(solicitud.body).length === 0) {
      console.log("Error al obtener datos del empleo, status 400");
      respuesta.status(400).send("No se recibieron datos del empleo");
      return;
  }

  // Convertir la fecha de expiración a un objeto Date
  const fechaExpiracion = new Date(solicitud.body.expiration);
  if (isNaN(fechaExpiracion.getTime())) {
      console.log("Fecha de expiración inválida, status 400");
      respuesta.status(400).send("La fecha de expiración no es válida");
      return;
  }

  // Crear el nuevo empleo con los datos recibidos
  const nuevoEmpleo = new modeloEmpleo({
      titulo: solicitud.body.titulo,
      descripcion: solicitud.body.descripcion,
      salary: solicitud.body.salary,
      location: solicitud.body.location,
      job_type: solicitud.body.job_type,
      modalidad: solicitud.body.modalidad,
      expiration: fechaExpiracion // Aseguramos que sea un objeto Date válido
  });

  try {
      console.log("Guardando nuevo empleo en la base de datos...");
      const empleoGuardado = await nuevoEmpleo.save();
      console.log("Empleo guardado exitosamente:", empleoGuardado);
      respuesta.status(201).send(empleoGuardado);

  } catch (error) {
      console.error("Error al guardar empleo en la base de datos:", error);
      respuesta.status(500).send("Error al guardar empleo: " + error.message);
  }
});




/* Ruta para obtener todos los empleos de la base de datos */

app.get("/empleos", async (req, res) => {
  try {
      const empleos = await modeloEmpleo.find();
      res.json(empleos);
  } catch (error) {
    res.status(500).send("Error al obtener empleos: " + error.message);
  }
});



