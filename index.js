const express = require('express'); 
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

//CREAR SERVIDOR DE EXPRESS
const app = express();

//CONECTAR BASE DE DATOS
dbConnection();

//CORS
app.use(cors())

//DIRECTORIO PUBLICO
app.use(express.static('public'));

//LECTURA Y PARSE0 DEL BODY
app.use(express.json());

//RUTAS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//ESCUCHAR LAS PETICIONES
app.listen(process.env.PORT, ()=>{
    console.log(`Corriendo en el puerto ${process.env.PORT}`);
});