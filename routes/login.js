const login = require('express').Router();
const { UserController } = require('../controllers');

login.post('/login', UserController.login);
login.post('/google-login', UserController.googleLogin);
login.post('/register', UserController.register);

module.exports = login;
