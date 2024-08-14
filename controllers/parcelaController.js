const Parcela = require('../models/Parcela');

// Crear una nueva parcela
exports.crearParcela = async (req, res) => {
    const {
        id,
        dni,
        finca,
        cafe_pro,
        cafe_creci,
        purma,
        bosque,
        pan_llevar,
        pasto,
        ha_total,
        pro_anterior,
        pro_estimado,
        lote,
        ha,
        edad,
        pro_estimado2,
        caturra,
        pache,
        catimor,
        catuai,
        typica,
        borbon,
        otro,
        estado
    } = req.body;

    const nuevaParcela = new Parcela({
        id,
        dni,
        finca,
        cafe_pro,
        cafe_creci,
        purma,
        bosque,
        pan_llevar,
        pasto,
        ha_total,
        pro_anterior,
        pro_estimado,
        lote,
        ha,
        edad,
        pro_estimado2,
        caturra,
        pache,
        catimor,
        catuai,
        typica,
        borbon,
        otro,
        estado
    });

    try {
        const parcelaGuardada = await nuevaParcela.save();
        res.status(201).json(parcelaGuardada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtener todas las parcelas
exports.obtenerParcelas = async (req, res) => {
    try {
        const parcelas = await Parcela.find();
        res.json(parcelas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener una parcela por ID
exports.obtenerParcelaPorId = async (req, res) => {
    try {
        const parcela = await Parcela.findById(req.params.id);
        if (!parcela) return res.status(404).json({ message: 'Parcela no encontrada' });
        res.json(parcela);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar una parcela por ID
exports.actualizarParcelaPorId = async (req, res) => {
    try {
        const parcelaActualizada = await Parcela.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!parcelaActualizada) return res.status(404).json({ message: 'Parcela no encontrada' });
        res.json(parcelaActualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar una parcela por ID
exports.eliminarParcelaPorId = async (req, res) => {
    try {
        const parcelaEliminada = await Parcela.findByIdAndDelete(req.params.id);
        if (!parcelaEliminada) return res.status(404).json({ message: 'Parcela no encontrada' });
        res.json({ message: 'Parcela eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
