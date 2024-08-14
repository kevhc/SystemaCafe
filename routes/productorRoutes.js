const express = require('express');
const multer = require('multer');
const path = require('path');
const productorController = require('../controllers/productorController');

const router = express.Router();

// Configuración de almacenamiento de multer para manejar archivos subidos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads', 'productores')); // Ruta donde se almacenarán las fotos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo con timestamp
    }
});

const upload = multer({ storage: storage });

// Rutas para manejar productores
router.post('/', upload.single('foto'), productorController.crearProductor);
router.get('/', productorController.obtenerProductores);
router.get('/:id', productorController.obtenerProductorPorId);
router.put('/:id', upload.single('foto'), productorController.actualizarProductor);
router.delete('/:id', productorController.eliminarProductor);

module.exports = router;
