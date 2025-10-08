const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./database')

const app = express();

app.use(cors({
    origin: [
        'http://localhost:4200',
        'https://gestorware.netlify.app/'

    ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true
}));
app.use(express.json());


app.use('/Gestorware', require('./routes/auth.route'));
app.use('/Gestorware', require('./routes/inventario.route'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});