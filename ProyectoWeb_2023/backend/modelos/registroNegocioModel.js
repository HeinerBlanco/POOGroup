// importar mongoose
const mongoose = require('mongoose');

// crear esquema de usuarios
const schemaRegistroNegocio = new mongoose.Schema({
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
    imagen:{
        type:String,
        required:false,
    },

    });  

    // crear modelo de usuarios
    const modeloRegistroNegocio = mongoose.model('registroNegocio',schemaRegistroNegocio);
    
    // exportar modelo de usuarios a otros archivos
    module.exports = modeloRegistroNegocio;

    // llamado de modelo por id
