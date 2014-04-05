var mongo = require('mongodb')

module.exports = function(server){
	server.post('/login', function (req, res, next) {
		res.send(req.params)
		return next()
	})
}
