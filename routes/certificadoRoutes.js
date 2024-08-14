const express = require('express');
const router = express.Router();
const certificadoController = require('../controllers/certificadoController');

router.post('/', certificadoController.createCertificado);
router.get('/', certificadoController.getAllCertificados);
router.get('/:id', certificadoController.getCertificadoById);
router.put('/:id', certificadoController.updateCertificado);
router.delete('/:id', certificadoController.deleteCertificado);

module.exports = router;
