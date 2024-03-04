const emitter = (socket) => {
    return {
        move: (data) => {
            socket.emit("move", data);
        },
    };
};
