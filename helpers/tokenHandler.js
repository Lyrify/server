const jwt = require('jsonwebtoken');

function encode(payload) {
	return jwt.sign(payload, process.env.JWT_SECRET);
}

function verify(token) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { encode, verify };
