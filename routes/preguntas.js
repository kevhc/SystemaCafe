const express = require('express');
const router = express.Router();
const Pregunta = require('../models/Pregunta');

// Crear un nueva pregunta
router.post('/', async (req, res) => {
    const { pregunta, fecha, estado } = req.body;
    const nuevoPregunta = new Pregunta({
        pregunta,
        fecha,
        estado
    });

    try {
        const preguntaGuardado = await nuevoPregunta.save();
        res.status(201).json(preguntaGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener todos los preguntas
router.get('/', async (req, res) => {
    try {
        const preguntas = await Pregunta.find();
        res.json(preguntas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener pregunta por ID
router.get('/:id', async (req, res) => {
    try {
        const pregunta = await Pregunta.findById(req.params.id);
        if (!pregunta) return res.status(404).json({ message: 'Pregunta no encontrada' });
        res.json(pregunta);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar pregunta por ID
router.put('/:id', async (req, res) => {
    try {
        const preguntaActualizado = await Pregunta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!preguntaActualizado) return res.status(404).json({ message: 'Pregunta no encontrada' });
        res.json(preguntaActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar pregunta por ID
router.delete('/:id', async (req, res) => {
    try {
        const preguntaEliminado = await Pregunta.findByIdAndDelete(req.params.id);
        if (!preguntaEliminado) return res.status(404).json({ message: 'Pregunta no encontrada' });
        res.json({ message: 'Pregunta eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;