const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController');

// Crear una nueva pregunta
router.post('/', preguntaController.crearPregunta);

// Obtener todas las preguntas
router.get('/', preguntaController.obtenerPreguntas);

// Obtener una pregunta por ID
router.get('/:id', preguntaController.obtenerPreguntaPorId);

// Actualizar una pregunta por ID
router.put('/:id', preguntaController.actualizarPreguntaPorId);

// Eliminar una pregunta por ID
router.delete('/:id', preguntaController.eliminarPreguntaPorId);

module.exports = router;