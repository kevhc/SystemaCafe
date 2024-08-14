const User = require('../models/Usuario');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads', 'usuarios');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Obtener información del usuario autenticado
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            nombre: user.nombre,
            foto: user.foto ? `http://10.0.2.2:3000/uploads/usuarios/${path.basename(user.foto)}` : null
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener todos los usuarios (solo administradores)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un usuario por ID (solo administradores)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un usuario (solo administradores)
exports.updateUser = async (req, res) => {
    const { nombre, apellido, email, usuario, clave, rol, estado } = req.body;
    const foto = req.file ? req.file.path.replace(/\\/g, '/') : req.body.foto;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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
};

// Eliminar un usuario (solo administradores)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.foto) {
            fs.unlinkSync(user.foto);
        }

        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
