const express = require('express');
const fs = require('fs');
const path = require('path');
const Productor = require('../models/Productor');

const router = express.Router();

module.exports = (upload) => {
    // Ruta para crear un nuevo productor
    router.post('/', upload.single('foto'), async (req, res) => {
        const { nombre, apellido, dni, sexo, caserio, distrito, provincia, region, estatus, telefono, longitud, latitud, altitud, estado } = req.body;
        const foto = req.file ? req.file.path : '';

        try {
            const productor = new Productor({ nombre, apellido, dni, sexo, caserio, distrito, provincia, region, estatus, telefono, longitud, latitud, altitud, foto, estado });
            await productor.save();
            res.status(201).json(productor);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Ruta para obtener todos los productores
    router.get('/', async (req, res) => {
        try {
            const productores = await Productor.find();
            res.json(productores);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Ruta para obtener un productor por ID
    router.get('/:id', async (req, res) => {
        try {
            const productor = await Productor.findById(req.params.id);
            if (!productor) {
                return res.status(404).json({ message: 'Productor not found' });
            }
            res.json(productor);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Ruta para actualizar un productor
    router.put('/:id', upload.single('foto'), async (req, res) => {
        const { nombre, apellido, dni, sexo, caserio, distrito, provincia, region, estatus, telefono, longitud, latitud, altitud, estado } = req.body;
        const foto = req.file ? req.file.path : req.body.foto;

        try {
            const productor = await Productor.findById(req.params.id);
            if (!productor) {
                return res.status(404).json({ message: 'Productor not found' });
            }

            // Eliminar la foto anterior si se sube una nueva foto
            if (req.file && productor.foto) {
                fs.unlink(path.join(__dirname, '..', productor.foto), (err) => {
                    if (err) {
                        console.error('Error al eliminar la foto anterior:', err);
                    }
                });
            }

            productor.nombre = nombre;
            productor.apellido = apellido;
            productor.dni = dni;
            productor.sexo = sexo;
            productor.caserio = caserio;
            productor.distrito = distrito;
            productor.provincia = provincia;
            productor.region = region;
            productor.estatus = estatus;
            productor.telefono = telefono;
            productor.longitud = longitud;
            productor.latitud = latitud;
            productor.altitud = altitud;
            productor.foto = foto;
            productor.estado = estado;

            await productor.save();
            res.json(productor);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Ruta para eliminar un productor
    router.delete('/:id', async (req, res) => {
        try {
            const productor = await Productor.findById(req.params.id);
            if (!productor) {
                return res.status(404).json({ message: 'Productor not found' });
            }

            // Eliminar la foto del productor
            if (productor.foto) {
                fs.unlink(path.join(__dirname, '..', productor.foto), (err) => {
                    if (err) {
                        console.error('Error al eliminar la foto del productor:', err);
                    }
                });
            }

            await productor.remove();
            res.json({ message: 'Productor deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
};
