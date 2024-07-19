const mongoose = require('mongoose');

const ProductorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true },
    sexo: { type: String, required: true },
    caserio: { type: String, required: true },
    distrito: { type: String, required: true },
    provincia: { type: String, required: true },
    region: { type: String, required: true },
    estatus: { type: String, required: true },
    telefono: { type: Number, required: true },
    longitud: { type: String, required: true },
    latitud: { type: String, required: true },
    altitud: { type: String, required: true },
    foto: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    estado: { type: Number, required: true }
});

module.exports = mongoose.model('Productor', ProductorSchema);
