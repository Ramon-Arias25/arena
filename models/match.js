var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Definir el esquema de Partido
var matchSchema = Schema({
    localTeam: { type: String, required: true },
    visitorTeam: { type: String, required: true },
    dateTime: { type: Date, required: true },
    result: { type: String } // Este campo puede ser poblado después del partido
});

module.exports = mongoose.model('Match', matchSchema);