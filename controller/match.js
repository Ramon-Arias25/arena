const Match = require('../models/match');

function home(req, res) {
    res.status(200).send({ message: 'Home desde match' });
}


function pruebas(req, res) {
    res.status(200).send({ message: 'Hola mundo desde el controlador de match' });
}

// Función para crear un partido
function createMatch(req, res) {
    var params = req.body;
    var match = new Match(params);

    match.save((err, matchStored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar el partido' });
        if (!matchStored) return res.status(404).send({ message: 'No se ha podido guardar el partido' });
        return res.status(200).send({ match: matchStored });
    });
}

// Función para obtener todos los partidos
function getAllMatch(req, res) {
    Match.find((err, matches) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!matches) return res.status(404).send({ message: 'No hay partidos disponibles' });
        return res.status(200).send({ matches });
    });
}

// Función para eliminar un partido
function deleteMatch(req, res) {
    var matchId = req.params.id;

    Match.findByIdAndRemove(matchId, (err, matchRemoved) => {
        if (err) return res.status(500).send({ message: 'Error al eliminar el partido' });
        if (!matchRemoved) return res.status(404).send({ message: 'No se ha podido eliminar el partido' });
        return res.status(200).send({ match: matchRemoved });
    });
}

// Función para actualizar el resultado de un partido
function updateScoreMatch(req, res) {
    var matchId = req.params.id;
    var update = req.body;

    Match.findByIdAndUpdate(matchId, { $set: { result: update.result } }, { new: true }, (err, matchUpdated) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar el resultado del partido' });
        if (!matchUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el resultado del partido' });
        return res.status(200).send({ match: matchUpdated });
    });
}

module.exports = {
    home,
    pruebas,
    createMatch,
    deleteMatch,
    getAllMatch,
    updateScoreMatch
};