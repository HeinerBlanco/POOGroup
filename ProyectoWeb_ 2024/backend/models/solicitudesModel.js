// importar mongoose
const mongoose = require("mongoose");

// Crear un esquema de solicitudes de empleo
const schemaSolicitud = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    empleoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleo",
        required: true
    },
    fechaSolicitud: {
        type: Date,
        default: Date.now
    }
});

// Crear modelo de solicitudes de empleo
const modeloSolicitudes = mongoose.model("Solicitudes", schemaSolicitud);

// Exportar el modelo para usar en otros archivos
module.exports = modeloSolicitudes;
