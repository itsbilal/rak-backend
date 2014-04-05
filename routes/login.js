var mongo = require('mongodb')

var users = {"email":"alessandro@test.com","password":"L9AFbMMtSTD3::FyvgZ8wMOaZ9uhVKXaXtKwgng2aIVphucSTJr51j::30::10000"}

module.exports = function(server){
	server.post('/login', function (req, res, next) {
		res.send(req.params)
		return next()
	})
}
