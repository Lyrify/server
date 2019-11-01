const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require('../models');
const { passwordHandler, tokenHandler } = require('../helpers');
// const encode = require('../helpers/tokenHandler');
// const { hash } = require('../helpers/passwordHandler');
// const { verify } = require('../helpers/passwordHandler');

class UserController {
	static googleLogin(req, res, next) {
		client
			.verifyIdToken({
				idToken: req.body.id_token,
				audience: process.env.GOOGLE_CLIENT_TOKEN
			})
			.then(ticket => {
				const payload = ticket.getPayload();
				User.findOne({ email: payload.email }).then(user => {
					if (user) {
						res.status(200).json({
							token_id: tokenHandler.encode({ id: user.id })
						});
					} else {
						req.body.type = 'google';
						req.body.email = payload.email;
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
					if (passwordHandler.verify(req.body.password, user.password)) {
						res.status(200).json({
							token_id: tokenHandler.encode({ id: user.id })
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
			password: req.body.password || ''
		})
			.then(user => {
				res.status(201).json({
					token_id: tokenHandler.encode({ id: user.id })
				});
			})
			.catch(next);
	}
}

module.exports = UserController;
