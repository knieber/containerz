const socketio = require('socket.io');
const containerSockets = require('./sockets/containerSockets');

function sockets(server) {
	const io = socketio(server);

	io.on('connection', (socket) => {
		containerSockets(socket, io);
	});
}

module.exports = sockets;
