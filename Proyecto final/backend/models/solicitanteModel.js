const mongoose = require("mongoose");


//crear un esquema del solicitante de empleo
const solicitanteSchema = new mongoose.Schema({
    correoElectronico: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    numContacto: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    curriculum: {
        type : String,
        required: true
    },
    puesto: {
        type: String,
        required: true
    }
});

// crear modelo de solicitante
const modeloSolicitante = mongoose.model("Solicitante", solicitanteSchema);

//exportar modelo de solicitante a otros archivos
module.exports = modeloSolicitante;
