const mongoose = require("mongoose");

// crear un esquema de empleador

const empleadorSchema = new mongoose.Schema({
    
    tituloDelTrabajo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    tipoIndustria: {
        type: String,
        required: true
    },

    direccionEmpresa: {
        type: String,
        required: true
    },
