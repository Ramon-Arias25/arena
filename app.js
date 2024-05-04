const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var app = express();

//cargar rutas
const userRoutes = require('./routes/user');
const forecastRoutes = require('./routes/forecast');
const matchRoutes = require('./routes/match');

app.get('/', function (req, res) {
    res.status(200).send({ message: 'GET request to the homepage' });
});

app.get('/Test', function (req, res) {
    res.status(200).send({ message: "I'm running, annoying!!" });
});

//logger
app.use(morgan('dev'))

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
app.use(cors())

//rutas
app.use('/api', userRoutes);
app.use('/api', forecastRoutes);
app.use('/api', matchRoutes);

//export
module.exports = app;