'use strict';
const fs = require('fs');

let rawdata = fs.readFileSync('./data/RAW.DAT')

const
    io = require("socket.io"),
    server = io.listen(8082);

let
    clients = new Map();

console.info("connecting...");

server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    clients.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        clients.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("command", (command, data) => {
        switch (command) {
            case "lrec":
                let d = new Date();
                console.info(d.toLocaleString(), "command: " + command);
                socket.emit("data", rawdata);
                break;
            default:
                console.info("error: " + command);
        }
    });
});
