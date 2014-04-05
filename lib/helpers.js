
var users = [{"_id":"534021435c35eb8c10339233","email":"alessandro.segala@gmail.com","password":"7eZCp9M8SuXF::LG6erTrV0c3Fhvlr+QtE59TIcILTTbXam0xA2nQN::30::10000"},
	{"_id":"53404eb2b92ff5f92f751b96","email":"me@itsbilal.com","password":"+QlvZB8VeDM6::+c99M5l8kMDKRouMzx6nzOAx1m3W+nnFj5FQbbkr::30::10000"}]
	// Passwords: test and test2

var helpers = {

	findUserById: function(userid) {
		var user = null
		for (var i=0; i<users.length; i++) {
			if (users[i]._id == userid)
				user = users[i]
		}

		return user
	},

	findUserByEmail: function(email) {
		var user = null
		for (var i=0; i<users.length; i++) {
			if (users[i].email == email)
				user = users[i]
		}

		return user
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
