var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var jwt = require('../services/jwt');


function Home(req, res) {
    res.status(200).send({ message: 'Home' });
}

function pruebas(req, res) {
    res.status(200).send({ message: 'Hola mundo desde el controlador de user' });
}

function saveUser(req, res) {

    var params = req.body;
    var user = new User();

    if (!params.name || !params.surname || !params.nick || !params.email || !params.password) return res.status(200).send({ message: "faltan datos" });

    user.name = params.name;
    user.surname = params.surname;
    user.nick = params.nick.toLowerCase();
    user.email = params.email.toLowerCase();
    user.role = 'ROLE_USER';
    user.image = null;

    User.find({ $or: [{ email: user.email }, { nick: user.nick }] }).exec((err, users) => {

        if (err) return res.status(500).send({ message: "error en la peticion de usuarios" });

        if (users && users.length >= 1) {

            return res.status(200).send({ message: "El email o nick ya se encuentra registrado." });

        } else {

            bcrypt.hash(params.password, null, null, (err, hash) => {
                user.password = hash;

                user.save((err, userStored) => {

                    if (err) return res.status(500).send({ message: 'error al registrar usuario en la base de datos' });

                    if (userStored) {
                        return res.status(200).send({ user: userStored });
                    } else {
                        return res.status(404).send({ message: 'no se ha registrado el usuario' });
                    }

                });
            });

        }
    });

}

function loginUser(req, res) {

    var params = req.body;

    if (!params.email || !params.password) return res.status(200).send({ message: "faltan datos" });

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion a la base de datos' });

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({ token: jwt.createtoken(user) });
                    } else {
                        user.password = undefined;
                        return res.status(200).send({ user });
                    }
                } else {
                    return res.status(500).send({ message: 'el usuario no se ha podido identificar' });
                }
            });
        } else {
            return res.status(500).send({ message: 'el usuario no esta registrado' });
        }
    });

}

function getUser(req, res) {

    var userId = req.params.id;

    User.findById({ _id: userId }, (err, user) => {
        if (err) return res.status(500).send({ message: ' Error en la peticion' });
        if (!user) return res.status(500).send({ message: 'El usuario no existe' });

    });
}

function getUsers(req, res) {

    var userId = req.user.sub;
    var page = 1
    var itemsPerPage = 5;

    if (req.params.page) page = req.params.page;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if (err) return res.status(500).send({ message: ' Error en la peticion' });
        if (!users) return res.status(404).send({ message: 'No hay usuarios disponibles' });
    });
}



function updateUser(req, res) {

    var userId = req.params.id;
    var update = req.body;
    delete update.password;

    if (userId != req.user.sub) return res.status(500).send({ message: 'no tiene permiso para actualizar los datos del usuario' });

    User.find({ $or: [{ email: update.email.toLowerCase() }, { nick: update.nick.toLowerCase() }] }).exec((err, users) => {


        var userIsset = false;
        users.forEach((user) => {
            if (user && user._id != userId) userIsset = true;
        });

        if (userIsset) return res.status(200).send({ message: 'email o nick ya se encuentran registrado por otro usuario' });

        User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
            if (err) return res.status(500).send({ message: 'No se ha podido actualizar el usuario' });

            if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            userUpdated.password = undefined;
            return res.status(200).send({ user: userUpdated });
        });
    });

}

function uploadAvatar(req, res) {


    if (req.params.id != req.user.sub) return res.status(500).send({ message: 'no tiene permiso para actualizar los datos del usuario' });

    if (!req.files.image) return res.status(200).send({ message: 'No se adjunto imagen' });

    if (!req.files.image.name || !req.files.image.type) {
        fs.unlink(req.files.image.path, (err) => { });
        return res.status(200).send({ message: 'La clave image esta vacia' });
    }

    if (req.files.image.name.size > 10548576) return res.status(200).send({ message: 'el archivo es muy grande' });

    var fileName = req.files.image.path.split('/')[3];
    var fileExt = fileName.split('\.')[1].toLowerCase();

    if (fileExt != 'png' && fileExt != 'jpg' && fileExt != 'jpeg' && fileExt != 'gif') {
        fs.unlink(req.files.image.path, (err) => {
            return res.status(200).send({ message: 'Extension no valida' });
        });
    }

    User.findByIdAndUpdate(req.params.id, { image: fileName }, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'No se ha podido actualizar el usuario' });
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
        return res.status(200).send({ user: userUpdated });
    });

}

function getAvatar(req, res) {

    var avatar = './uploads/users/avatar/' + req.params.imageFile;
    if (fs.existsSync(avatar)) {
        return res.sendFile(path.resolve(avatar));
    } else {
        return res.status(200).send({ message: 'No existe la avatar' });
    }

}

function getCounters(req, res) {

    var userId = req.user.sub;

    if (req.params.id) userId = req.params.id;


}

module.exports = {
    Home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadAvatar,
    getAvatar
}