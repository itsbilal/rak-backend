var socketio = require('socket.io')

module.exports = function(server) {
	var io = socketio.listen(server)

	io.sockets.on('hatch', function(socket) {
		
	})
}