const
    io = require("socket.io"),
    server = io.listen(8081);

let
    clients = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    clients.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        clients.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

// sends each client its current timestamp
setInterval(() => {
    for (const [client, id] of clients.entries()) {
        let d = new Date();
        client.emit("time", d.getTime());
    }
}, 1000);
