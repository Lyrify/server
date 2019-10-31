const jwt = require('jsonwebtoken');

module.exports = data => {
	return jwt.sign(
		{
			_id: data._id || data.login
		},
		process.env.JWT_SECRET
	);
};
