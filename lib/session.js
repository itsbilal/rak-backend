var crypto = require('crypto')

var kSessionExpire = 1800 // 30 minutes

var session = {
	db: [],
	
	create: function(user) {
		var key = 'Ei fu, siccome immobile dato il mortal sospiro...'
		var seed = crypto.randomBytes(20);
		var hash = crypto.createHash('sha1').update(seed + key).digest('hex')
		
		var token = [user, hash, (Date.now() / 1000 + kSessionExpire).toString()].join('.')
		this.db.push(token)
		
		return token
	}
}

module.exports = session
