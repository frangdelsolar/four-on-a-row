const serverUrl = "http://localhost:3000";

const getSocket = () => {
    return io(serverUrl, {
        extraHeaders: {
            isAdmin: false,
        },
    });
};

const reactSocket = (socket) => {
    socket.on("connect", () => {
        console.log("connected to", serverUrl);
    });

    socket.on("newGame", (data) => {
        gameData = data;
    });

    socket.on("update", (data) => {
        gameData = data;
    });

    socket.on("winner", (winner) => {
        gameData = {
            ...gameData,
            winner,
        };
    });
};
