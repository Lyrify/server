const login = require('express').Router();

login.post('/');
login.post('/google-login');

// router (get, post, put, patch, delete)

module.exports = login;
