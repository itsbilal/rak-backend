var mongo = require("mongodb").MongoClient

module.exports = function(server, restify) {
	server.get("/gifts/inbox", function(req, res, next){
		var user = server.session.isAuthenticated
		if (!user)
			return next(new restify.NotAuthorizedError('This resource requires authentication'))

		var config = server.appConfig

		mongo.connect(config.dbpath, function(err, db){
			if (err) {res.send({"result":0}); return}

			db.collection("gifts", function(err, collection) {
				if (err) {res.send({"result":0}); return}
				collection.find({"receiver":user, "viewed":false}, function(err, cursor){
					if (err) {res.send({"result":0}); return}

					cursor.toArray(function(err, result){
						res.send({"gifts": result})
					})
				})
			})
		})

		return next()
	})
}