const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Usuario');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Registro de usuario
exports.registerUser = async (req, res) => {
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
};

// Inicio de sesión
exports.loginUser = async (req, res) => {
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
};
