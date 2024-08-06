const fs = require('fs');
const path = require('path');

// Asegura que el directorio exista
function ensureDirSync(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Elimina un archivo de forma sincrónica
function removeFileSync(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

// Elimina un directorio de forma sincrónica
function removeDirSync(dir) {
    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true });
    }
}

module.exports = {
    ensureDirSync,
    removeFileSync,
    removeDirSync
};
