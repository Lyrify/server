const bcrypt = require('bcryptjs');

function hash(password) {
	return bcrypt.hashSync(password, 10);
}

function verify(password, hashed) {
	return bcrypt.compareSync(password, hashed);
}

module.exports = {
	hash,
	verify
};
