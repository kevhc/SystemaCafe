const express = require('express');
const multer = require('multer');
const path = require('path');
const authController = require('../controllers/authController');

const router = express.Router();

// Configuración de almacenamiento de multer para manejar archivos subidos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/usuarios/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Rutas de autenticación
router.post('/register', upload.single('foto'), authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
