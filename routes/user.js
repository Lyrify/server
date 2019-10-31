const user = require('express').Router();
const { UserController } = require('../controllers');

user.post('/login', UserController.login);
user.post('/google-login', UserController.googleLogin);
user.post('/register', UserController.register);

module.exports = user;
