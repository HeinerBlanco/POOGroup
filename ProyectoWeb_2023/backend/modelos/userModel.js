// importar mongoose
const mongoose = require('mongoose');

// crear esquema de usuarios
const schemaUsuario = new mongoose.Schema({
    correoElectronico:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    nombre:{
        type:String,
        required:true,
    }, 
    apellido:{
        type:String,
        required:true,
    },
    usuario:{
        type:String,
        required:true,
    },  

    }); 

    // crear modelo de usuarios
    const modeloUsuario = mongoose.model('Usuario',schemaUsuario);
    
    // exportar modelo de usuarios a otros archivos
    module.exports = modeloUsuario;

    // llamado de modelo por id
