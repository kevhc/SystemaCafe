const express = require('express');
const fs = require('fs');
const path = require('path');
const Productor = require('../models/Productor');
const { ensureDirSync, removeFileSync } = require('../utils/fileUtils');
const upload = require('../middlewares/upload');

const router = express.Router();

module.exports = (upload) => {
    // Ruta para crear un nuevo productor
    router.post('/', upload.single('foto'), async (req, res) => {
        const { nombre, apellido, dni, sexo, caserio, distrito, provincia, region, estatus, telefono, longitud, latitud, altitud, estado } = req.body;
        let foto = '';

        try {
            const productor = new Productor({ nombre, apellido, dni, sexo, caserio, distrito, provincia, region, estatus, telefono, longitud, latitud, altitud, estado });

            if (req.file) {
                const dir = path.join('uploads/productores', productor._id.toString());
                ensureDirSync(dir);
                foto = path.join(dir, req.file.filename);
                fs.renameSync(req.file.path, foto);  // Mueve el archivo a la carpeta del productor
                productor.foto = foto;
            }

            await productor.save();
            res.status(201).json(productor);
        } catch (err) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);  // Elimina la foto subida si hay un error
            }
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
        let foto = req.body.foto; // Foto actual si no se sube una nueva

        try {
            const productor = await Productor.findById(req.params.id);
            if (!productor) {
                return res.status(404).json({ message: 'Productor not found' });
            }

            // Eliminar la foto anterior si se sube una nueva foto
            if (req.file) {
                const dir = path.join('uploads/productores', productor._id.toString());
                ensureDirSync(dir);
                foto = path.join(dir, req.file.filename);
                fs.renameSync(req.file.path, foto);  // Mueve el archivo a la carpeta del productor

                if (productor.foto) {
                    removeFileSync(productor.foto);  // Elimina la foto anterior
                }
                productor.foto = foto;
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
            productor.estado = estado;

            await productor.save();
            res.json(productor);
        } catch (err) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);  // Elimina la foto subida si hay un error
            }
            res.status(400).json({ message: err.message });
        }
    });

    // Ruta para eliminar un productor
    router.delete('/:id', async (req, res) => {
        try {
            // Buscar el productor por ID
            const productor = await Productor.findById(req.params.id);
            if (!productor) {
                return res.status(404).json({ message: 'Productor not found' });
            }

            // Eliminar la foto del productor
            if (productor.foto) {
                // Usa removeFileSync para eliminar el archivo de la foto
                removeFileSync(path.join(__dirname, '..', productor.foto));
            }

            // Eliminar el productor
            await productor.remove();

            // Opcional: Eliminar el directorio del productor si está vacío
            const dir = path.join(__dirname, '..', 'uploads/productores', productor._id.toString());
            removeDirSync(dir);

            res.json({ message: 'Productor deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
};
