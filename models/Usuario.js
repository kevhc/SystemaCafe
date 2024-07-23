const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    usuario: { type: String, required: true, unique: true },
    clave: { type: String, required: true },
    foto: { type: String },
    fecha: { type: Date, default: Date.now },
    ultima_conexion: { type: Date },
    estado: { type: Number, default: 1 }, // 1 = Activo, 0 = Inactivo
    rol: { type: Number, required: true }, // 1 = Administrador General, otros valores = otros roles
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (clave) {
    return bcrypt.compare(clave, this.clave);
};

module.exports = mongoose.model('Usuario', userSchema);