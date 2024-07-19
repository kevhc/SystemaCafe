const mongoose = require('mongoose');

const ParcelaSchema = new mongoose.Schema({
    dni: {
        type: Number,
        required: true
    },
    finca: {
        type: String,
        required: true
    },
    cafe_pro: {
        type: String,
        required: true
    },
    cafe_creci: {
        type: String,
        required: true
    },
    purma: {
        type: Number,
        required: true
    },
    bosque: {
        type: Number,
        required: true
    },
    pan_llevar: {
        type: Number,
        required: true
    },
    pasto: {
        type: Number,
        required: true
    },
    ha_total: {
        type: Number,
        required: true
    },
    pro_anterior: {
        type: Number,
        required: true
    },
    pro_estimado: {
        type: Number,
        required: true
    },
    lote: {
        type: Number,
        required: true
    },
    ha: {
        type: Number,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    pro_estimado2: {
        type: Number,
        required: true
    },
    caturra: {
        type: Number,
        required: true
    },
    pache: {
        type: Number,
        required: true
    },
    catimor: {
        type: Number,
        required: true
    },
    catuai: {
        type: Number,
        required: true
    },
    typica: {
        type: Number,
        required: true
    },
    borbon: {
        type: Number,
        required: true
    },
    otro: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Number,
        required: true,
        enum: [0, 1] // 0 para inactivo, 1 para activo
    }
});

module.exports = mongoose.model('Parcela', ParcelaSchema)