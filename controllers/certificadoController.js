const Certificado = require('../models/Certificado');

// Crear un nuevo certificado
exports.createCertificado = async (req, res) => {
    const { certificado, fecha, estado } = req.body;
    const nuevoCertificado = new Certificado({ certificado, fecha, estado });

    try {
        const certificadoGuardado = await nuevoCertificado.save();
        res.status(201).json(certificadoGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtener todos los certificados
exports.getAllCertificados = async (req, res) => {
    try {
        const certificados = await Certificado.find();
        res.json(certificados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un certificado por ID
exports.getCertificadoById = async (req, res) => {
    try {
        const certificado = await Certificado.findById(req.params.id);
        if (!certificado) return res.status(404).json({ message: 'Certificado no encontrado' });
        res.json(certificado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un certificado por ID
exports.updateCertificado = async (req, res) => {
    try {
        const certificadoActualizado = await Certificado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!certificadoActualizado) return res.status(404).json({ message: 'Certificado no encontrado' });
        res.json(certificadoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un certificado por ID
exports.deleteCertificado = async (req, res) => {
    try {
        const certificadoEliminado = await Certificado.findByIdAndDelete(req.params.id);
        if (!certificadoEliminado) return res.status(404).json({ message: 'Certificado no encontrado' });
        res.json({ message: 'Certificado eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};