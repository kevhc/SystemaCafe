const Productor = require('../models/Productor');
const path = require('path');
const fs = require('fs');

// Crear un nuevo productor con imagen
exports.crearProductor = async (req, res) => {
    const {
        nombre,
        apellido,
        dni,
        sexo,
        caserio,
        distrito,
        provincia,
        region,
        estatus,
        telefono,
        longitud,
        latitud,
        altitud,
        estado
    } = req.body;

    const foto = req.file ? req.file.filename : null;

    const nuevoProductor = new Productor({
        nombre,
        apellido,
        dni,
        sexo,
        caserio,
        distrito,
        provincia,
        region,
        estatus,
        telefono,
        longitud,
        latitud,
        altitud,
        estado,
        foto
    });

    try {
        const productorGuardado = await nuevoProductor.save();
        res.status(201).json(productorGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtener todos los productores
exports.obtenerProductores = async (req, res) => {
    try {
        const productores = await Productor.find();
        res.json(productores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un productor por ID
exports.obtenerProductorPorId = async (req, res) => {
    try {
        const productor = await Productor.findById(req.params.id);
        if (!productor) return res.status(404).json({ message: 'Productor no encontrado' });
        res.json(productor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un productor con imagen
exports.actualizarProductor = async (req, res) => {
    const { id } = req.params;

    // Preparar los datos de actualización, incluyendo la nueva foto si se proporciona
    const actualizacion = {
        ...req.body,
        foto: req.file ? req.file.filename : undefined
    };

    try {
        // Encontrar y actualizar el productor
        const productorActualizado = await Productor.findByIdAndUpdate(id, actualizacion, { new: true });
        if (!productorActualizado) return res.status(404).json({ message: 'Productor no encontrado' });

        // Eliminar la foto anterior si se sube una nueva
        if (req.file && productorActualizado.foto) {
            const oldFilePath = path.join(__dirname, '..', 'uploads', 'productores', productorActualizado.foto);
            fs.unlink(oldFilePath, (err) => {
                if (err) console.error('Error al eliminar la imagen:', err);
            });
        }

        res.json(productorActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un productor y su imagen
exports.eliminarProductor = async (req, res) => {
    const { id } = req.params;

    try {
        // Encontrar y eliminar el productor
        const productorEliminado = await Productor.findByIdAndDelete(id);
        if (!productorEliminado) return res.status(404).json({ message: 'Productor no encontrado' });

        // Eliminar la foto asociada
        if (productorEliminado.foto) {
            const filePath = path.join(__dirname, '..', 'uploads', 'productores', productorEliminado.foto);
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error al eliminar la imagen:', err);
            });
        }

        res.json({ message: 'Productor eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
