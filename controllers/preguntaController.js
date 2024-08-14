const Pregunta = require('../models/Pregunta');

// Crear una nueva pregunta
exports.crearPregunta = async (req, res) => {
    const { pregunta, fecha, estado } = req.body;
    const nuevaPregunta = new Pregunta({
        pregunta,
        fecha,
        estado
    });

    try {
        const preguntaGuardada = await nuevaPregunta.save();
        res.status(201).json(preguntaGuardada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtener todas las preguntas
exports.obtenerPreguntas = async (req, res) => {
    try {
        const preguntas = await Pregunta.find();
        res.json(preguntas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener una pregunta por ID
exports.obtenerPreguntaPorId = async (req, res) => {
    try {
        const pregunta = await Pregunta.findById(req.params.id);
        if (!pregunta) return res.status(404).json({ message: 'Pregunta no encontrada' });
        res.json(pregunta);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar una pregunta por ID
exports.actualizarPreguntaPorId = async (req, res) => {
    try {
        const preguntaActualizada = await Pregunta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!preguntaActualizada) return res.status(404).json({ message: 'Pregunta no encontrada' });
        res.json(preguntaActualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar una pregunta por ID
exports.eliminarPreguntaPorId = async (req, res) => {
    try {
        const preguntaEliminada = await Pregunta.findByIdAndDelete(req.params.id);
        if (!preguntaEliminada) return res.status(404).json({ message: 'Pregunta no encontrada' });
        res.json({ message: 'Pregunta eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
