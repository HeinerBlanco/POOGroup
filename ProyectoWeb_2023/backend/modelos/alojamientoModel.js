// importar mongoose
const mongoose = require('mongoose');

// crear esquema de usuarios
const schemaAlojamiento = new mongoose.Schema({

    provincia:{
        type:String,
        required:true,
    },
    personas:{
        type:String,
        required:true,
    },
    
    entrada:{
        type:String,
        required:true,
    },
    salida:{
        type:String,
        required:true,
    },
    habitaciones:{ 
        type:String,
        required:true,
    },  

    });  

    // crear modelo de usuarios
    const modeloAlojamiento = mongoose.model('Alojamiento',schemaAlojamiento);
    
    // exportar modelo de usuarios a otros archivos
    module.exports = modeloAlojamiento;

    // llamado de modelo por id




    
