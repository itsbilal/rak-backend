var mongo = require('mongodb')
var NodePbkdf2 = require('node-pbkdf2')

var users =
	[{"_id":"534021435c35eb8c10339233","email":"alessandro.segala@gmail.com","password":"7eZCp9M8SuXF::LG6erTrV0c3Fhvlr+QtE59TIcILTTbXam0xA2nQN::30::10000"}]

module.exports = function(server, restify){
	server.post('/login', function (req, res, next) {
		var session = server.session
		
		var email = req.params.email
		var password = req.params.password
		
		var hasher = new NodePbkdf2({ iterations: 10000, saltLength: 12, derivedKeyLength: 30 })
		
		var i = users.length
		var encryptedPassword = false
		var user = false
		while(i--) {
			if(users[i].email == email) {
				user = users[i]
				break
			}
		}
		
		if(!user) {
			return next(new restify.InvalidCredentialsError('Email or password wrong'))
		}
		
		var passOk = false
		if(hasher.checkPassword(password, user.password, function(err, status) {
			passOk = status
		}))
		
		if(!passOk) {
			return next(new restify.InvalidCredentialsError('Email or password wrong'))
		}
		
		var token = session.create(user._id)
		session.sendHeader(res, token)
		
		res.send({result: 1})
		return next()
	})
}
