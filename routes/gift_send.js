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
			"sender": server.session.isAuthenticated,
			"receiver": "TO_BE_FILLED",
			"gift_id": gift_id,
			"viewed": false
		}

		mongo.connect(config.dbpath, function(err, db){
			if (!err) {
				db.collection("gifts", function(err, collection) {
					helpers.findRandomUser(server.session.isAuthenticated, function(err, receiver) {

						if (err) res.send({"result": 0})
						object_to_store.receiver = receiver._id

						collection.insert(object_to_store, function(err, records) {
							if (!err) {
								res.send({"result": 1})
							} // TODO: Error conveying thing
						})

					})
				})
			}
		})

		return next()
	})
}