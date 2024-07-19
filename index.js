const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const notesRouter = require('./routes/notes');
const certificadosRouter = require('./routes/certificados');
const parcelasRouter = require('./routes/parcelas');
const preguntasRouter = require('./routes/preguntas');
const productoresRouter = require('./routes/productores');
const helmet = require('helmet');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

// Configuración de almacenamiento de multer para manejar archivos subidos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Sirve archivos estáticos desde la carpeta uploads

// Seguridad básica
app.use(helmet());
app.use(cors());



// Conectar a MongoDB
const dbUri = 'mongodb://localhost:27017/Cafebd'; // Reemplaza con el nombre de tu base de datos
mongoose.connect(dbUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Usar las rutas de notas
app.use('/notes', notesRouter);

// Usar las rutas de certificados
app.use('/certificados', certificadosRouter);

// Usar las rutas de parcelas
app.use('/parcelas', parcelasRouter);


// Usar las rutas de preguntas
app.use('/preguntas', preguntasRouter);

// Usar las rutas de productores
app.use('/productores', productoresRouter(upload));

// Define una ruta simple
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
