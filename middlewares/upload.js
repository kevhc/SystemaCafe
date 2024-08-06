const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const producerId = req.params.id;
        const dir = path.join(__dirname, '../uploads/productores', producerId);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
