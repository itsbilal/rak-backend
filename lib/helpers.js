
var users = [{"_id":"5340522e755f8fa9223d1a6d","email":"alessandro.segala@gmail.com","password":"7wdrGUlqSUas::Bcom9FHwkSDAliq53DdSP+sM5ZOiF/y7EtQgGo/0::30::10000"},
	{"_id":"53404eb2b92ff5f92f751b96","email":"me@itsbilal.com","password":"+QlvZB8VeDM6::+c99M5l8kMDKRouMzx6nzOAx1m3W+nnFj5FQbbkr::30::10000"}]
	// Passwords: test and test2
var gift_types = require("../config/gift-types.json")

var helpers = {

	findUserById: function(userid) {
		var user = false
		var i = users.length
		while(i--)
			if (users[i]._id == userid)
				user = users[i]

		return user
	},

	findUserByEmail: function(email) {
		var user = false
		var i = users.length
		while(i--)
			if (users[i].email == email)
				user = users[i]

		return user
	},

	findRandomUser: function(myself_id, callback) {
		var users_minus_me = []

		for (var i=0;i<users.length;i++) {
			if (users[i]._id != myself_id)
				users_minus_me.push(users[i])
		}

		if (users_minus_me.length < 1)
			callback(true, null)

		var the_chosen_one = Math.floor(Math.random()*(users_minus_me.length))
		callback(null, users_minus_me[the_chosen_one])
	},

	handleError: function(res){
		res.send({"result":0})
	},

	getGift: function(gift_id){
		gifts = gift_types.gifts
		gift = false
		for (var i=0; i<gifts.length; i++) {
			if (gifts[i]._id = gift_id){
				gift = gifts[i]
			}
		}

		return gift
	},
	
	// Source: http://stackoverflow.com/a/1714899/192024
	buildQuerystring: function(obj) {
		var str = []
		for(var p in obj)
			if (obj.hasOwnProperty(p))
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
		return str.join('&')
	},
	
	// Source: http://phpjs.org/functions/preg_quote/
	preg_quote: function(str, delimiter) {
		return String(str)
			.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
	},
	
	// Determine if a given string matches a given pattern.
	// Inspired by PHP from Laravel 4.1
	str_is: function(pattern, value) {
		if(pattern == value) return true
		if(pattern == '*') return true
		
		pattern = this.preg_quote(pattern, '/')
		
		// Asterisks are translated into zero-or-more regular expression wildcards
		// to make it convenient to check if the strings starts with the given
		// pattern such as "library/*", making any string check convenient.
		var regex = new RegExp('^' + pattern.replace('\\*', '.*') + '$')
		
		return !!value.match(regex);
	},
	
	// Source: http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/comment-page-1/
	stringToCamel: function(str) {
		return str.replace(/(\-[a-z])/g, function($1){
			return $1.toUpperCase().replace('-','')
		})
	}
}

module.exports = helpers
