const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Modelos
const modeloUsuario = require("./modelos/userModel");
const modeloRegistroNegocio = require("./modelos/registroNegocioModel");
const modeloRegistroTarjeta = require("./modelos/registroTarjetaModel");
const modeloNuevaReserva = require("./modelos/nuevaReservaModel");
const modeloReserva =require("./modelos/reservasModel")


const app = express();
app.use(express.json());
app.use(cors());


// Conectamos a la base de datos
mongoose
  .connect(
    "mongodb+srv://JeinerBlanco:BRAinner2714@jeinerblanco.rzos5qi.mongodb.net/?retryWrites=true&w=majority"
  )
  // Todo bien.
  .then(function () {
    console.log("Conexion a base de datos exitosa");
  })
  // Todo mal.
  .catch(function (error) {
    console.error(error);
  });



  // Rutas para agregar nuevos usuarios en el servidor


app.post("/users", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud POST a /users");

  // Obtenemos los datos del usuario
  if (!solicitud.body) {
    // Solicitud malformada, bad request
    console.log("Error al obtener datos del usuario");
    respuesta.status(400).send("No se enviaron datos");
    return;
  }

  const nuevoUsuario = new modeloUsuario({
    correoElectronico: solicitud.body.correoElectronico,
    password: solicitud.body.password, // undefined
    nombre: solicitud.body.nombre,
    apellido: solicitud.body.apellido,
    usuario: solicitud.body.usuario,
  });

  try {
    console.log("Guardando usuario");
    const usuarioGuardado = await nuevoUsuario.save();
    console.log("Usuario guardado", usuarioGuardado);

    respuesta.status(201).send(usuarioGuardado);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al guardar el usuario");
    return;
  }
});


  // Rutas para registrar nuevos negocios en el servidor


app.post("/negocios", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud POST a /negocios");

  // Obtenemos los datos del negocio
  if (!solicitud.body) {

    // Solicitud malformada, bad request
    console.log("Error al obtener datos del negocio");
    respuesta.status(400).send("No se enviaron datos");
    return;
  }

  const nuevoNegocio = new modeloRegistroNegocio({
    nombreNegocio: solicitud.body.nombreNegocio,
    descripcion: solicitud.body.descripcion, // undefined
    provincia: solicitud.body.provincia,
    categoria: solicitud.body.categoria,
    contacto: solicitud.body.contacto,
    imagen: solicitud.body.imagen,
  });

  try {
    console.log("Registrando negocio");
    const negocioRegistrado = await nuevoNegocio.save();
    console.log("Negocio Registrado", negocioRegistrado);

    respuesta.status(201).send(negocioRegistrado);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al registrar el negocio");
    return;
  }
});















//Codigo Diego
//Funcion para traer los usuarios de la pagina de reporte 
app.get("/users", async function (request, response) {
  console.log("Atendiendo solicitud GET a /users");
  try {
      const usuarios = await modeloUsuario.find();
      console.log("Usuarios encontrados", usuarios);
      response.status(200).send(usuarios);
  } catch (error) {
      console.error(error);
      response.status(500).send("Error al obtener usuarios");
  }
});

//Funcion para traer los negocios a la pagina de reporte
app.get("/negocios", async function (request, response) {
  console.log("Atendiendo solicitud GET a /negocios");
  try {
      const negocios = await modeloRegistroNegocio.find();  
      console.log("Negocios encontrados", negocios);
      response.status(200).send(negocios);
  } catch (error) {
      console.error(error);
      response.status(500).send("Error al obtener negocios");
  }
});

//Funcion para traer los datos para mostrarlos en las cuentas de usuarios

app.get("/users/cuentas", async function (request, response) {
  console.log("Atendiendo solicitud GET a /users/cuentas");
  try {
      const usuarios = await modeloUsuario.find();
      console.log("Usuarios encontrados", usuarios);
      response.status(200).send(usuarios);
  } catch (error) {
      console.error(error);
      response.status(500).send("Error al obtener usuarios");
  }
});


// Ruta para obtener usuarios en el servidor por correo electrónico
app.get('/users/email/:correoElectronico', async (req, res) => {
  try {
    const correoElectronico = req.params.correoElectronico;
    const user = await modeloUsuario.findOne({ correoElectronico: correoElectronico });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

// Ruta para obtener usuarios en el servidor por correo electrónico al perfil de usuario
app.get('/users/email/:correoElectronico/perfil', async (req, res) => {
  try {
    const correoElectronico = req.params.correoElectronico;
    const user = await modeloUsuario.findOne({ correoElectronico: correoElectronico });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});


//ruta para reservar
app.post("/reserva", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud POST a /reservas", solicitud.body);

  //obtenemos los datos del usuario
  if(!solicitud.body) {
      //Solicitud malformada, bad request 
      console.log("Error al obtener datos de la reserva");
      respuesta.status(400).send("No se enviaron datos");
      return;
  }

  const nuevoNegocio = new modeloReserva({
      nombreNegocio: solicitud.body.nombreNegocio, 
      descripcion: solicitud.body.descripcion,
      provincia: solicitud.body.provincia,
      categoria: solicitud.body.categoria,
      contacto: solicitud.body.contacto,
  });

  try {
      console.log("Guardando reserva");
      const negocioGuardado = await nuevoNegocio.save();
      console.log("reserva guardada");

      respuesta.status(201).send(negocioGuardado);
  } catch (error) {
      console.error(error);
      respuesta.status(500).send("Error al guardar la reserva");
      return;
  }
});

app.get('/reservas/:correoElectronico', async (req, res) => {
  const correoElectronico = req.params.correoElectronico;

  try {
      // Utilizando Mongoose para buscar reservas del usuario por correo electrónico
      const reservas = await modeloReserva.find({ contacto: correoElectronico });

      res.json(reservas);
  } catch (error) {
      console.error("Error al obtener las reservas:", error);
      res.status(500).send("Error al obtener las reservas");
  }
});

app.get('/reservas', async (req, res) => {
  try {
      // Utilizando Mongoose para buscar todas las reservas
      const reservas = await modeloReserva.find();

      // Enviar las reservas al cliente como respuesta JSON
      res.json(reservas);
  } catch (error) {
      console.error("Error al obtener las reservas:", error);
      res.status(500).send("Error al obtener las reservas");
  }
});

//Fin codigo Diego







// Rutas para agregar tartjetas en el servidor

app.post("/tarjetas", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud POST a /tarjetas");

  // Obtenemos los datos de la tarjeta
  if (!solicitud.body) {

    // Solicitud malformada, bad request
    console.log("Error al obtener datos de la tarjeta");
    respuesta.status(400).send("No se enviaron datos");
    return;
  }

  const nuevaTarjeta = new modeloRegistroTarjeta({
    nombre: solicitud.body.nombre,
    numero: solicitud.body.numero, 
    fecha: solicitud.body.fecha,
    year: solicitud.body.year,
    codigo: solicitud.body.codigo,
  });

  try {
    console.log("Registrando tarjeta");
    const tarjetaRegistrada = await nuevaTarjeta.save();
    console.log("Tarjeta Registrada", tarjetaRegistrada);
    

    respuesta.status(201).send(tarjetaRegistrada);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al registrar la tarjeta");
    return;
  }
});




// Rutas para agregar  busqueda de alojamientos en el servidor


app.post("/reservas", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud POST a /reservas");

  // Obtenemos los datos del usuario
  if (!solicitud.body) {
    // Solicitud malformada, bad request
    console.log("Error al hacer la reserva");
    respuesta.status(400).send("No se enviaron datos");
    return;
  }












  const nuevaReserva = new modeloNuevaReserva({
    nombreNegocio: solicitud.body.nombreNegocio,
    descripcion: solicitud.body.descripcion, // undefined
    provincia: solicitud.body.provincia,
    categoria: solicitud.body.categoria,
    contacto: solicitud.body.contacto,
  });

  try {
    console.log("Buscando reserva");
    const ReservaGuardada = await nuevaReserva.save();
    console.log("Reserva Guardada", ReservaGuardada);

    respuesta.status(201).send(reservaGuardada);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al guardar reserva");
    return;
  }
});



























// Rutas de usuarios en el servidor por id

app.get("/users/:id", async function (request, response) {
  console.log("Atendiendo solicitud GET a /users");
  const id = request.params.id;
  try {
    const usuarios = await modeloUsuario.findById(id);
    console.log("Usuarios encontrados", usuarios);

    response.status(200).send(usuarios);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error al obtener usuarios");
  }
});







// Ruta para obtener usuarios en el servidor por correo electrónico
app.get('/users/email/:correoElectronico', async (req, res) => {
  try {
    const correoElectronico = req.params.correoElectronico;
    const user = await modeloUsuario.findOne({ correoElectronico: correoElectronico });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});



// Rutas para obtener usuarios en el servidor 


app.get("/users", async function (request, response) {
  console.log("Atendiendo solicitud GET a /users");

  const condiciones = {};

  if (request.query.id) {
    condiciones._id = request.query.id;
  }

  if (request.query.correoElectronico) {
    condiciones.correoElectronico = request.query.correoElectronico;
  }

  if (request.query.nombre) {
    condiciones.nombre = request.query.nombre;
  }

  if (request.query.apellido) {
    condiciones.apellido = request.query.apellido;
  }

  try {
    const usuarios = await modeloUsuario.find(condiciones);
    console.log("Usuarios encontrados", usuarios);

    response.status(200).send(usuarios);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error al obtener usuarios");
  }
});


// Ruta para obtener usuarios en el servidor por id

app.patch("/users/:id", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud PATCH a /users");

  if (!solicitud.body) {
    console.log("Error al obtener datos del usuario");
    respuesta.status(400).send("No se enviaron datos");
    return;
  }

  try {
    const id = solicitud.params.id;
    const usuarioModificado = await modeloUsuario.findByIdAndUpdate(id, {
      ...solicitud.body,
    });

    console.log("Usuario modificado", usuarioModificado);
    respuesta.status(200).send(usuarioModificado);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al actualizar el usuario");
    return;
  }
});

app.delete("/users/:id", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud DELTE a /users");

  try {
    const id = solicitud.params.id;
    const usuarioModificado = await modeloUsuario.findByIdAndDelete(id);

    console.log("Usuario modificado", usuarioModificado);
    respuesta.status(200).send(usuarioModificado);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al actualizar el usuario");
    return;
  }
});

// Escuchamos solicitudes en el puerto 3000
app.listen(3000, function () {
  console.log("Servidor escuchando en puerto 3000");
});


app.post("/tarjetas", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud POST a /tarjetas");

  if (!solicitud.body) {
    console.log("Error al obtener datos de la tarjeta");
    respuesta.status(400).send("No se enviaron datos");
    return;
  }

  const nuevaTarjeta = new modeloRegistroTarjeta({
    nombre: solicitud.body.nombre,
    numero: solicitud.body.numero,
    year: solicitud.body.year,
    codigo: solicitud.body.codigo,
  });

  try {
    console.log("Registrando tarjeta");
    const tarjetaRegistrada = await nuevaTarjeta.save();
    console.log("Tarjeta Registrada", tarjetaRegistrada);

    respuesta.status(201).send(tarjetaRegistrada);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al registrar la tarjeta");
    return;
  }
});
app.get("/tarjetas/fechas-actuales", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud GET a /tarjetas/fechas-actuales");

  try {
    const fechaActual = new Date();
    const tarjetas = await modeloRegistroTarjeta.find({ fecha: { $gte: fechaActual } });

    console.log("Tarjetas encontradas", tarjetas);
    respuesta.status(200).send(tarjetas);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al obtener tarjetas");
  }
});
app.get("/tarjetas/:id", async function (solicitud, respuesta) {
  console.log("Atendiendo solicitud GET a /tarjetas/:id");

  try {
    const id = solicitud.params.id;
    const tarjeta = await modeloRegistroTarjeta.findById(id);

    console.log("Tarjeta encontrada", tarjeta);
    respuesta.status(200).send(tarjeta);
  } catch (error) {
    console.error(error);
    respuesta.status(500).send("Error al obtener tarjeta");
  }
});
