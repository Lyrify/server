const axios = require('axios').default.create({
	baseURL: 'http://localhost'
});

module.exports = (method, url, opt) => {
	return axios({
		method: method,
		url: url,
		data: opt.data,
		headers: opt.headers
	});
};
