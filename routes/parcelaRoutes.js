const express = require('express');
const router = express.Router();
const parcelaController = require('../controllers/parcelaController');

// Crear una nueva parcela
router.post('/', parcelaController.crearParcela);

// Obtener todas las parcelas
router.get('/', parcelaController.obtenerParcelas);

// Obtener una parcela por ID
router.get('/:id', parcelaController.obtenerParcelaPorId);

// Actualizar una parcela por ID
router.put('/:id', parcelaController.actualizarParcelaPorId);

// Eliminar una parcela por ID
router.delete('/:id', parcelaController.eliminarParcelaPorId);

module.exports = router;