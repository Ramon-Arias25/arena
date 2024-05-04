var express = require('express');
var MatchController = require('../controller/match');

var api = express.Router();


api.get('/match/home', MatchController.home);
api.get('/match/pruebas', MatchController.pruebas);
api.post('/match', MatchController.createMatch);
api.get('/matches', MatchController.getAllMatch);
api.delete('/match/delete/:id', MatchController.deleteMatch);
api.put('/match/update/score/:id', MatchController.updateScoreMatch);

module.exports = api;
