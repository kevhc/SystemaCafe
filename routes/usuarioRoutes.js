const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

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

// Rutas de gestión de usuarios (solo administradores)
router.get('/me', authMiddleware(), userController.getMe);
router.get('/', authMiddleware([1]), userController.getAllUsers);
router.get('/:id', authMiddleware([1]), userController.getUserById);
router.put('/:id', authMiddleware([1]), upload.single('foto'), userController.updateUser);
router.delete('/:id', authMiddleware([1]), userController.deleteUser);

module.exports = router;
