var fs = require('fs')
var restify = require('restify')
var session = require('./lib/session')

// Load environments
var config = require(__dirname + '/lib/environment')()

var server = restify.createServer({
	
	// Uncomment to enable SSL
	/*certificate: fs.readFileSync('ssl/ssl-cert.pem'),
	key: fs.readFileSync('ssl/ssl-key.pem'),*/
	
	name: 'restify-boilerplate',
	version: '1.0.0'
})

// Save the config object in the server
server.appConfig = config
server.session = session

server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.gzipResponse())

// Enable Cross-Origin Resource Sharing (CORS)
server.use(restify.CORS({
	origins: config.allowOrigin ? config.allowOrigin : '*'
}))

server.pre(function(req, res, next) {
	var token = req.header('X-Session-Token', '')
	
	session.init(token)
	
	console.log(session.isAuthenticated ? 'Authenticated: ' + session.isAuthenticated : 'NOT Authenticated')
	
	if(session.isAuthenticated)
		session.refreshIfNeeded(res, token)
	return next()
})

// Routing
require('./routes')(server, restify)

server.listen(config.httpPort, function () {
	console.log('%s listening at %s', server.name, server.url)
})