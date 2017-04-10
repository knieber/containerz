const docker = require('../../dockerapi');

function containerSockets(socket, io) {
	function refreshContainers() {
		docker.listContainers({ all: true }, (err, containers) => {
			io.emit('containers.list', containers);
		});
	}
	setInterval(refreshContainers, 2000);

	socket.on('containers.list', () => {
		refreshContainers();
	});

	socket.on('container.up', (args) => {
		const container = docker.getContainer(args.id);

		if (container) {
			container.start(() => refreshContainers());
		}
	});

	socket.on('container.stop', (args) => {
		const container = docker.getContainer(args.id);

		if (container) {
			container.stop(() => refreshContainers());
		}
	});

	socket.on('image.run', (args) => {
		docker.createContainer({ Image: args.name }, (err, container) => {
			if (!err) {
				container.start(() => {
					if (err) {
						socket.emit('image.error', { message: err });
					}
				});
			}	else {
				socket.emit('image.error', { message: err });
			}
		});
	});
}

module.exports = containerSockets;
