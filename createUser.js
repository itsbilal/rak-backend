var NodePbkdf2 = require('node-pbkdf2')

var hasher = new NodePbkdf2({ iterations: 10000, saltLength: 12, derivedKeyLength: 30 })
var ObjectID = require('mongodb').ObjectID

console.log(ObjectID)

var email = process.argv[2]
var password = process.argv[3]

hasher.encryptPassword(password, function (err, encryptedPassword) {
	var _id = new ObjectID()
	console.log(JSON.stringify({_id: _id.toHexString(), email: email, password: encryptedPassword}))
})