var NodePbkdf2 = require('node-pbkdf2')
var hasher = new NodePbkdf2({ iterations: 10000, saltLength: 12, derivedKeyLength: 30 })

var email = process.argv[2]
var password = process.argv[3]

hasher.encryptPassword(password, function (err, encryptedPassword) {
	console.log(JSON.stringify({email: email, password: encryptedPassword}))
})