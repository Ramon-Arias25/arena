var express = require('express');
var UserController = require('../controller/user');

var api = express.Router();
var auth = require('../middlewares/authenticated');

var multiparty = require('connect-multiparty');
var uploadAvatar = multiparty({ uploadDir: './uploads/users/avatar' });

// **/api/ruta**

api.get('/home', UserController.Home);
api.get('/Pruebas', auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', auth.ensureAuth, UserController.getUser);
api.get('/users/:page?', auth.ensureAuth, UserController.getUsers);
api.put('/user/update/:id', auth.ensureAuth, UserController.updateUser);
api.post('/user/uploadavatar/:id', [auth.ensureAuth, uploadAvatar], UserController.uploadAvatar);
api.get('/user/get/avatar/:imageFile', UserController.getAvatar);
/*api.get('/counters/:id?', auth.ensureAuth, UserController.getCounters);
*/

module.exports = api;