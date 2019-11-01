const { model, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { hash } = require('../helpers/passwordHandler');

const songSchema = new Schema({
  
});

songSchema.plugin(uniqueValidator);
songSchema.post('validate', function(user, next) {
	user.password = hash(user.password);
	next();
});

module.exports = model('Song', songSchema);
