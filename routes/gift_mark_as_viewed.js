var mongo = require("mongodb").MongoClient
var ObjectID = require("mongodb").ObjectID
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
				collection.findOne({"_id":ObjectID(id)}, function(err, result){
					result.viewed = true
					collection.save(result, function(err, result){
						res.send({"result":1})
					})
				})

			})
		})

		return next()
	})
}