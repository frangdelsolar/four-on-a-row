const serverUrl = "http://localhost:3000";

const getSocket = () => {
    return io(serverUrl, {
        extraHeaders: {
            isAdmin: true,
        },
    });
};

const reactSocket = (socket) => {
    socket.on("connect", () => {
        console.log("connected to", serverUrl);
    });

    socket.on("status", (data) => {
        connections = data;
        display();
    });

    socket.on("newGame", (data) => {
        connections[data.connectionId] = data;
        display();
    });

    socket.on("update", (data) => {
        connections[data.connectionId] = data;
        display();
    });

    socket.on("winner", (data) => {
        connections[data.connectionId] = {
            ...connections[data.connectionId],
            winner: data.winner,
        };
        display();
    });

    socket.on("deleteGame", (connectionId) => {
        delete connections[connectionId];
        display();
    });

    socket.on("disconnect", () => {
        delete connections[socket.id];
        display();
    });
};
