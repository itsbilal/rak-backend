var mongo = require('mongodb')
var NodePbkdf2 = require('node-pbkdf2')
var session = require('../lib/session')

var users =
	[{"_id":"534021435c35eb8c10339233","email":"alessandro.segala@gmail.com","password":"7eZCp9M8SuXF::LG6erTrV0c3Fhvlr+QtE59TIcILTTbXam0xA2nQN::30::10000"}]

module.exports = function(server, restify){
	server.post('/login', function (req, res, next) {
		var email = req.email
		var password = req.password
		
		var hasher = new NodePbkdf2({ iterations: 10000, saltLength: 12, derivedKeyLength: 30 })
		
		var i = users.length
		var encryptedPassword = false
		while(i--) {
			if(users[i].email == email) {
				encryptedPassword = users[i].password
			}
		}
		
		if(!encryptedPassword) {
			return next(new restify.InvalidCredentialsError('Email or password wrong'))
		}
		
		var passOk = false
		if(hasher.checkPassword(password, encryptedPassword, function(err, status) {
			passOk = status
		}))
		
		if(!passOk) {
			return next(new restify.InvalidCredentialsError('Email or password wrong'))
		}
		
		console.log(session.create)
		
		res.send({result: 1})
		return next()
	})
}
