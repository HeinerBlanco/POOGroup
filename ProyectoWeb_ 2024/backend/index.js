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
const modeloSolicitante = require("./models/solicitanteModel");



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







// Crear un nuevo solicitante en el servidor
app.post ("/solicitantes", async function (solicitud, respuesta) {
    console.log("Atendiendo solicitud POST a /solicitantes");

    // Verificar que se proporcionaron datos
    if (!solicitud.body) {
        console.error("No se proporcionaron datos para el nuevo solicitante");
        respuesta.status(400).send("No se proporcionaron datos para el nuevo solicitante");
        return;
    }
    
    

// Crear un nuevo solicitante en la base de datos
const nuevoSolicitante = new modeloSolicitante({
    correoElectronico: solicitud.body.correoElectronico,
    password: solicitud.body.password,
    nombre: solicitud.body.nombre,
    apellidos: solicitud.body.apellidos,
    fechaNacimiento: solicitud.body.fechaNacimiento,
    numContacto: solicitud.body.numContacto,
    direccion: solicitud.body.direccion,
    curriculum: solicitud.body.curriculum,
    puesto: solicitud.body.puesto,
});

try {
    console.log("Guardando el nuevo solicitante...");
    const nuevoSolicitanteGuardado = await nuevoSolicitante.save();
    console.log("Solicitante guardado: ", nuevoSolicitanteGuardado);

    respuesta.status(201).send(nuevoSolicitanteGuardado);

} catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al guardar solicitante");
    return;
}
});


// Ruta para obtener todos los solicitantes desde la Base de datos

app.get("/solicitantes", async (req, res) => {
  try {
    const solicitantes = await modeloSolicitante.find(); // Obtener todos los solicitantes de la base de datos
    res.status(200).json(solicitantes);
  } catch (error) {
    console.error("Error al obtener solicitantes:", error);
    res.status(500).send("Error al obtener los solicitantes");
  }
});






