// importar mongoose
const mongoose = require('mongoose');

// crear esquema de tarjetas
const schemaTarjeta = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    }, 
    numero:{
        type:String,
        required:true,
        unique:true,
        maxlength:16,
    },
    fecha:{
        type:String,
        required:true,
    },
    
    year:{
        type:String,
        required:true,
    },
    codigo:{
        type:String,
        required:true,
    },  

    }); 

    // crear modelo de tarjetas
    const modeloTarjeta = mongoose.model('Tarjeta',schemaTarjeta);
    
    // exportar modelo de tarjetas a otros archivos
    module.exports = modeloTarjeta;

