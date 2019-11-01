const jwt = require("jsonwebtoken");
const errorHandler = require('./errorHandler.js');

module.exports = {
    authentication: function(err, req, res, next) {
        let token = req.headers.token;
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.decoded = decoded;
            req.token = token;
            next();
        } catch(err) {
            errorHandler(err);
        }
    }
}