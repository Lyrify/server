const getResponse = require('../helpers/getResponse');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require('../models');
const encode = require('../helpers/encodeLoginToken');
const { hash } = require('../helpers/passwordHandler');
const { verify } = require('../helpers/passwordHandler');

class UserController {
	static googleLogin(req, res, next) {
		client
			.verifyIdToken({
				idToken: req.body.id_token,
				audience: process.env.GOOGLE_CLIENT_ID
			})
			.then(ticket => {
				const payload = ticket.getPayload();
				User.findOne({ email: payload.email }).then(user => {
					if (user) {
						res.status(200).json({
							token_id: encode(user)
						});
					} else {
						req.body.type = 'google';
						UserController.register(req, res, next);
					}
				});
			})
			.catch(next);
	}

	static login(req, res, next) {
		User.findOne({
			email: req.body.email
		})
			.then(user => {
				if (user) {
					if (verify(req.body.password, user.password)) {
						res.status(200).json({
							token_id: encode(user)
						});
					} else {
						const err = new Error();
						err.name = 'validationError';
						err.status = 401;
						next(err);
					}
				} else {
					const err = new Error();
					err.name = 'validationError';
					err.status = 401;
					next(err);
				}
			})
			.catch(next);
	}

	static register(req, res, next) {
		User.create({
			email: req.body.email,
			login_type: req.body.type || 'default',
			password: hash(req.body.password)
		}).then(user => {
			res.status(201).json({
				token_id: encode(user)
			});
		});
	}
}

module.exports = UserController;
