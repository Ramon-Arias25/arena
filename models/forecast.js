var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Definir el esquema de Pronóstico
var forecastSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que realiza el pronóstico
    match: { type: Schema.Types.ObjectId, ref: 'Match', required: true }, // Referencia al partido
    localGoals: { type: Number, required: true },
    visitorGoals: { type: Number, required: true }
});

module.exports = mongoose.model('Forecast', forecastSchema);