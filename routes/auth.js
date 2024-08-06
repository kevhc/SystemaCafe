const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Usuario');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Usa una variable de entorno

// Crear la carpeta si no existe
const uploadDir = path.join(__dirname, '..', 'uploads', 'usuarios');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento de multer para manejar archivos subidos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/usuarios/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ruta para registrar un nuevo usuario
router.post('/register', upload.single('foto'), async (req, res) => {
    const { nombre, apellido, email, usuario, clave, rol } = req.body;
    const foto = req.file ? req.file.path.replace(/\\/g, '/') : '';

    try {
        const hashedClave = await bcrypt.hash(clave, 10);
        const user = new User({ nombre, apellido, email, usuario, clave: hashedClave, foto, rol });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { usuario, clave } = req.body;

    try {
        const user = await User.findOne({ usuario });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(clave, user.clave);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user._id, nombre: user.nombre, rol: user.rol },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener la información del usuario autenticado
router.get('/me', authMiddleware(), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ nombre: user.nombre });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener todos los usuarios (solo administradores)
router.get('/users', authMiddleware([1]), async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener un usuario por ID (solo administradores)
router.get('/users/:id', authMiddleware([1]), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para actualizar un usuario (solo administradores)
router.put('/users/:id', authMiddleware([1]), upload.single('foto'), async (req, res) => {
    const { nombre, apellido, email, usuario, clave, rol, estado } = req.body;
    const foto = req.file ? req.file.path.replace(/\\/g, '/') : req.body.foto;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Eliminar la foto anterior si se sube una nueva
        if (req.file && user.foto) {
            fs.unlinkSync(user.foto);
        }

        if (nombre) user.nombre = nombre;
        if (apellido) user.apellido = apellido;
        if (email) user.email = email;
        if (usuario) user.usuario = usuario;
        if (clave) user.clave = await bcrypt.hash(clave, 10);
        if (foto) user.foto = foto;
        if (rol) user.rol = rol;
        if (estado !== undefined) user.estado = estado;

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para eliminar un usuario (solo administradores)
router.delete('/users/:id', authMiddleware([1]), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Eliminar la foto del usuario
        if (user.foto) {
            fs.unlinkSync(user.foto);
        }

        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
