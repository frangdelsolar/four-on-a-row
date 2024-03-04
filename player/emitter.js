class Emitter {
    constructor(socket) {
        this.socket = socket;
    }

    newGame() {
        this.socket.emit("getNewGame");
    }

    move(col) {
        this.socket.emit("move", { connectionId: this.socket.id, col: col });
    }
}
