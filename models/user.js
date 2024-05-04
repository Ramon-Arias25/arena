var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String,
    image: String,
    forecasts: [{ type: Schema.Types.ObjectId, ref: 'Forecast' }] // Relación uno a muchos con Pronóstico
});

module.exports = mongoose.model('User', UserSchema);