const { model, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { hash } = require('../helpers/passwordHandler');

const userSchema = new Schema({
	login_type: {
		type: String,
		enum: ['default', 'google']
	},
	email: {
		type: String,
		unique: true,
		validate: [
			{
				validator: function(v) {
					return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					);
				},
				msg: _ => 'Invalid email format!'
			}
		],
		required: [true, 'User email required']
	},
	password: {
		type: String,
		required: function(v) {
			return this.login_type === 'default';
		}
	}
});

userSchema.plugin(uniqueValidator);
userSchema.post('validate', function(user, next) {
	user.password = hash(user.password);
	next();
});

module.exports = model('User', userSchema);
