var express = require('express');
var ForecastController = require('../controller/forecast');

var api = express.Router();

api.get('/forecast/home', ForecastController.home);
api.get('/forecast/pruebas', ForecastController.pruebas);
api.post('/forecast', ForecastController.createForecast);
api.get('/forecasts', ForecastController.getAllForecast);
api.get('/forecast/:id', ForecastController.getForecast);
api.put('/forecast/update/:id', ForecastController.updateForecast);
api.delete('/forecast/delete/:id', ForecastController.deleteForecast);

module.exports = api;
