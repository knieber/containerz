const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const sockets = require('./sockets');

const port = process.env.PORT || 3010;

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));
server.listen(port, () => console.log(`Server started on port ${port}`));

sockets(server);
