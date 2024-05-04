const Forecast = require('../models/forecast');

function home(req, res) {
    res.status(200).send({ message: 'Home desde forescast' });
}


function pruebas(req, res) {
    res.status(200).send({ message: 'Hola mundo desde el controlador de forecast' });
}
// Función para crear un pronóstico
function createForecast(req, res) {
    var params = req.body;
    var forecast = new Forecast(params);

    forecast.save((err, forecastStored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar el pronóstico' });
        if (!forecastStored) return res.status(404).send({ message: 'No se ha podido guardar el pronóstico' });
        return res.status(200).send({ forecast: forecastStored });
    });
}

// Función para obtener todos los pronósticos
function getAllForecast(req, res) {
    Forecast.find((err, forecasts) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!forecasts) return res.status(404).send({ message: 'No hay pronósticos disponibles' });
        return res.status(200).send({ forecasts });
    });
}

// Función para obtener un pronóstico por su ID
function getForecast(req, res) {
    var forecastId = req.params.id;

    Forecast.findById(forecastId, (err, forecast) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!forecast) return res.status(404).send({ message: 'El pronóstico no existe' });
        return res.status(200).send({ forecast });
    });
}

// Función para actualizar un pronóstico
function updateForecast(req, res) {
    var forecastId = req.params.id;
    var update = req.body;

    Forecast.findByIdAndUpdate(forecastId, update, { new: true }, (err, forecastUpdated) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar el pronóstico' });
        if (!forecastUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el pronóstico' });
        return res.status(200).send({ forecast: forecastUpdated });
    });
}

// Función para eliminar un pronóstico
function deleteForecast(req, res) {
    var forecastId = req.params.id;

    Forecast.findByIdAndRemove(forecastId, (err, forecastRemoved) => {
        if (err) return res.status(500).send({ message: 'Error al eliminar el pronóstico' });
        if (!forecastRemoved) return res.status(404).send({ message: 'No se ha podido eliminar el pronóstico' });
        return res.status(200).send({ forecast: forecastRemoved });
    });
}

module.exports = {
    home,
    pruebas,
    createForecast,
    getForecast,
    updateForecast,
    deleteForecast,
    getAllForecast
};
