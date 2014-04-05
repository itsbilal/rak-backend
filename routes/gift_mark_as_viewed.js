var mongo = require("mongodb").MongoClient
var helpers = require("../lib/helpers.js")

module.exports = function(server, restify) {
	server.get("/gifts/inbox/:id/viewed", function(req, res, next){
		var user = server.session.isAuthenticated
		var id = req.params.id
		var config = server.appConfig
		if (!user)
			return next(new restify.NotAuthorizedError('This resource requires authentication'))

		mongo.connect(config.dbpath, function(err, db){
			if (err) {helpers.handleError(err); return}

			db.collection("gifts", function(err, collection) {
				if (err) {helpers.handleError(err); return}
				collection.update({"_id":id},
					{$set:{"viewed":"true"}},
					function(err, result){
						res.send({"result":1})
					})
			})
		})

		return next()
	})
}