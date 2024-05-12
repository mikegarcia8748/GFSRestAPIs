const http = require('http');
const app = require('./app');

const PORT = process.env.NODE_SERVER_PORT;
const IP_ADDRESS = process.env.IP_ADDRESS;

const server = http.createServer(app)

server.listen(PORT, IP_ADDRESS)

