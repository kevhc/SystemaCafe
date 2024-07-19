const mongoose = require('mongoose');

const CertificadoSchema = new mongoose.Schema({
    certificado: {
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
    },
    creadoEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Certificado', CertificadoSchema);
