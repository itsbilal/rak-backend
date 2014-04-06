var fs = require('fs')
var restify = require('restify')
var session = require('./lib/session')

// Load environments
var config = require(__dirname + '/lib/environment')()

var server = restify.createServer({
	
	// Uncomment to enable SSL
	/*certificate: fs.readFileSync('ssl/ssl-cert.pem'),
	key: fs.readFileSync('ssl/ssl-key.pem'),*/
	
	name: 'rak-backend',
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
server.use(restify.CORS({"headers":["X-Session-Token"]}))
server.use(restify.fullResponse())

server.on('MethodNotAllowed', function(req, res) {
if (req.method.toLowerCase() == "options") {
	res.header('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time, X-Session-Token');
	res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time, X-Session-Token');
        res.header('Access-Control-Allow-Methods', ['OPTIONS','GET', 'POST'].join(', '));
        res.header('Access-Control-Allow-Origin', '*');

	return res.send(204)
}else {
	return res.send(405)
}
})

server.pre(restify.pre.userAgentConnection());
server.pre(function(req, res, next) {
	var token = req.header('X-Session-Token', '')

	res.header('Application-Type', 'application/json')
	res.header('Access-Control-Allow-Credentials', true);
    	res.header('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time, X-Session-Token');
    	res.header('Access-Control-Allow-Methods', ['OPTIONS','GET', 'POST'].join(', '));
    	res.header('Access-Control-Allow-Origin', '*');
	
	restify.pre.sanitizePath()
	
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

