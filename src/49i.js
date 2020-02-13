
'use strict';

let config = require('./config/49i.json');
console.log(config);

const
    io = require("socket.io-client"),
    server = `http://${config.IP}:${config._port}`,
    ioClient = io.connect(server);

    console.log('connecting to '+server),
    ioClient.on("time", (msg) => console.info(msg));