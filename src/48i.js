
'use strict';

let config = require('./config/48i.json');
console.info(config);
let timer = config.pull.timer;
let connected = false;
const
    io = require("socket.io-client"),
    server = `http://${config.IP}:${config._port}`,
    ioClient = io.connect(server);

ioClient.on("connect", (socket) => {
    connected = ioClient.connected;
});

ioClient.on("data", (d) => {
    console.info("data:" + d)
});

setInterval(() => {
    console.info('connected: ', connected);
    if (connected) ioClient.emit('command', config.pull.command)
}, timer);