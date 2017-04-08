let express = require('express');
let path = require('path');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let docker = require('../dockerapi');

let port = process.env.PORT || 3010;

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

server.listen(port, () => console.log(`Server started on port ${port}`));

io.on('connection', socket => {

    socket.on('containers.list', () => {
        refreshContainers();
    });

    setInterval(refreshContainers, 2000);

    socket.on('container.start', args => {
        const container = docker.getContainer(args.id)

        if (container) {
            container.start((err, data) => refreshContainers())
        }
    })

    socket.on('container.stop', args => {
        const container = docker.getContainer(args.id)

        if (container) {
            container.stop((err, data) => refreshContainers())
        }
    })

    socket.on('image.run', args => {
        docker.createContainer({ Image: args.name }, (err, container) => {
            if (!err)
                container.start((err, data) => {
                    if (err)
                        socket.emit('image.error', { message: err })
                })
            else
                socket.emit('image.error', { message: err })
        })
    })
})

function refreshContainers() {
    docker.listContainers({ all: true}, (err, containers) => {
        io.emit('containers.list', containers);
    })
}