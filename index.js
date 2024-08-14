
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const notesRouter = require('./routes/notes');
const certificadosRouter = require('./routes/certificadoRoutes');
const parcelasRouter = require('./routes/parcelaRoutes');
const preguntasRouter = require('./routes/preguntaRoutes');
const productoresRouter = require('./routes/productorRoutes');
const authRoutes = require('./routes/authRoutes'); // Asegúrate de usar el nombre correcto de la ruta para autenticación
const usuarioRoutes = require('./routes/usuarioRoutes'); // Ruta para la gestión de usuarios
require('dotenv').config();

const helmet = require('helmet');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads')); // Sirve archivos estáticos desde la carpeta uploads


// Configurar la carpeta estática para servir imágenes subidas
app.use('/uploads/productores', express.static(path.join(__dirname, 'uploads', 'productores')));


// Seguridad básica
app.use(helmet());

// CORS (si necesitas permitir peticiones desde diferentes dominios)
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected bien'))
    .catch(err => console.error('MongoDB connection error:', err));

// Usar las rutas de notas
app.use('/notes', notesRouter);

// Usar las rutas de certificados
app.use('/certificados', certificadosRouter);

// Usar las rutas de parcelas
app.use('/parcelas', parcelasRouter);


// Usar las rutas de preguntas
app.use('/preguntas', preguntasRouter);

// Usar las rutas de productores
app.use('/productores', productoresRouter);

// Usar las rutas de usuarios
app.use('/usuarios', usuarioRoutes);

app.use('/auth', authRoutes);

// Define una ruta simple
app.get('/', (req, res) => {
    res.send('hola mundo querido');
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
