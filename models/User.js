const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	login_type: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	}
});

module.exports = model('User', userSchema);
