var NodePbkdf2 = require('node-pbkdf2')
var helpers = require('../lib/helpers')

module.exports = function(server, restify){
	server.post('/login', function (req, res, next) {
		var session = server.session
		
		var email = req.params.email
		var password = req.params.password
		
		var hasher = new NodePbkdf2({ iterations: 10000, saltLength: 12, derivedKeyLength: 30 })
		
		var encryptedPassword = false
		var user = helpers.findUserByEmail(email)
		
		if(!user) {
			return next(new restify.InvalidCredentialsError('Email or password wrong'))
		}
		
		var passwordStatus = false
		hasher.checkPassword(password, user.password, function(err, status) {
			passwordStatus = status
			
			if(!passwordStatus) {
				return next(new restify.InvalidCredentialsError('Email or password wrong'))
			}
			
			var token = session.create(user._id)
			session.sendHeader(res, token)
			
			res.send({result: 1})
			next()
		})
	})
}
