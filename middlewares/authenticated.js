var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'la_clave_secreta_de_proyecto_arena';

exports.ensureAuth = function (req, res, next) {

    if (!req.headers.authorization) return res.status(403).send({ message: 'la peticion no tiene la cabecera de autenticacion' });

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) return res.status(401).send({ message: 'El token ha expirado' });
    } catch (ex) {
        return res.status(404).send({ message: ' El token no es valido' });
    }
    delete payload.password;
    req.user = payload;
    next();

}