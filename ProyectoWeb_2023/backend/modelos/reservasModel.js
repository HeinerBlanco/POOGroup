const mongoose = require('mongoose');

// crear esquema de usuarios
const schemaReservas = new mongoose.Schema({
    nombreNegocio:{
        type:String,
        required:true,
        unique:true,
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
    const modeloReserva = mongoose.model('Reservas',schemaReservas);
    
    // exportar modelo de usuarios a otros archivos
    module.exports = modeloReserva;

