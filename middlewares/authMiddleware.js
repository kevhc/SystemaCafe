const jwt = require('jsonwebtoken');
const User = require('../models/Usuario');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Usa una variable de entorno

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;

            // Verificar roles
            if (roles.length && !roles.includes(req.user.rol)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            // Actualizar última conexión
            await User.findByIdAndUpdate(req.user.id, { ultima_conexion: new Date() });

            next();
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = authMiddleware;