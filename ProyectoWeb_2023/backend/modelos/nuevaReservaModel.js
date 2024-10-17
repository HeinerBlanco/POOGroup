// importar mongoose
const mongoose = require('mongoose');

// crear esquema de usuarios
const schemaNuevaReserva = new mongoose.Schema({
    nombreNegocio:{
        type:String,
        required:true,
    },
    descripcion:{
        type:String,
        required:true,
    },
    
    provincia:{
        type:String,
        required:true,
    },
    categoria:{
        type:String,
        required:true,
    },
    contacto:{
        type:String,
        required:true,
    },

    });  

    // crear modelo de usuarios
    const modeloNuevaReserva = mongoose.model('nuevaReserva',schemaNuevaReserva);
    
    // exportar modelo de usuarios a otros archivos
    module.exports = modeloNuevaReserva;

    // llamado de modelo por id
