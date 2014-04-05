module.exports = function(server, restify){
	server.get('/test', function (req, res, next) {
		if(!server.session.isAuthenticated)
			return next(new restify.NotAuthorizedError('This resource requires authentication'))
		res.send({hello: server.session.isAuthenticated})
		return next()
	})
}
