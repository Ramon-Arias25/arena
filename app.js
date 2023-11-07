const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var app = express();

//cargar rutas
const userRoutes = require('./routes/user');

app.get('/', function (req, res) {
    res.status(200).send('GET request to the homepage');
});

app.get('/Test', function (req, res) {
    res.status(200).send({ message: "I'm running, annoying!!" });
});

//logger
app.use(morgan('combined'))

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
app.use(cors())

//rutas
app.use('/api', userRoutes);

//export
module.exports = app;