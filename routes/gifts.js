var mongo = require("mongodb")

var gift_types = require("../config/gift-types.json")

module.exports = function(server, restify){
	server.get("/gifts", function(req, res, next) {
		var session = server.session
		var config = server.config

		if (!session.isAuthenticated) {
			return next(new restify.NotAuthorizedError('This resource requires authentication'))
		}

		res.send(gift_types)
		return next()
	})
}