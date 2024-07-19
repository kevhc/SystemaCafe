const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema({
    pregunta: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    estado: {
        type: Number,
        required: true,
        enum: [0, 1] // 0 para inactivo, 1 para activo
    }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);