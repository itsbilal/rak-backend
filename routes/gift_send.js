var gift_types = require("../config/gift-types.json")
var mongo = require("mongodb").MongoClient
var helpers = require("../lib/helpers.js")

module.exports = function(server, restify) {
	server.post("/gifts/", function(req, res, next) {
		var gift_id = req.params.id
		var config = server.appConfig

		if(!server.session.isAuthenticated)
			return next(new restify.NotAuthorizedError('This resource requires authentication'))

		var object_to_store = {
			// TODO: ObjectID
			"sender": server.session.isAuthenticated,
			"receiver": "53404768f0b7224d2fe0fb89",
			"gift_id": "1"
		}

		mongo.connect(config.dbpath, function(err, db){
			if (!err) {
				db.collection("gifts", function(err, collection) {
					collection.insert(object_to_store, function(err, records) {
						if (!err) {
							res.send({"result": 1})
						} // TODO: Error conveying thing
					})
				})
			}
		})

		return next()
	})
}