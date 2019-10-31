const jwt = require("jsonwebtoken");
const errorHandler = require('./errorHandler.js');
//const Todo = require('../models/').Todo;

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

    // authorization: function(err, req, res, next) {
    //     Todo.findByPk(req.params.id)
    //     .then((todo) => {
    //         if(todo.UserId === req.decoded.id) {
    //             next();
    //         } else {
    //             next(err);
    //         }
    //     })
    // }
}