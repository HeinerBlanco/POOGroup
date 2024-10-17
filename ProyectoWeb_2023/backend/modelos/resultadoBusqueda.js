const mongoose = require('mongoose');

const tarjetaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  numero: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }, // Esto establecerá la fecha actual por defecto
  year: { type: Number, required: true },
  codigo: { type: Number, required: true },
});

const Tarjeta = mongoose.model('Tarjeta', tarjetaSchema);

module.exports = Tarjeta;
