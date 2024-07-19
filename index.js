const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const certificadosRouter = require('./routes/certificados');
const parcelasRouter = require('./routes/parcelas');
const preguntasRouter = require('./routes/preguntas');
const app = express();
app.use(bodyParser.json());

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

// Define una ruta simple
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
