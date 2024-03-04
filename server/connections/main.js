class ConnectionManager {
    constructor() {
        this.connections = {};
        this.admin = null;
    }

    isAdmin(connectionId) {
        return this.admin.id === connectionId;
    }

    insert(socket) {
        console.log(
            "New connection",
            socket.id,
            socket.handshake.headers.isadmin
        );

        let isAdmin = socket.handshake.headers.isadmin === "true";
        if (isAdmin) {
            this.admin = socket;
        } else {
            this.connections[socket.id] = socket;
        }
        return isAdmin;
    }

    delete(socketId) {
        delete this.connections[socketId];
    }

    notify(socketId, type, data) {
        if (this.connections[socketId]) {
            this.connections[socketId].emit(type, data);
        }
    }

    notifyAdmin(type, data) {
        if (!this.admin) {
            throw "Admin not connected";
        }
        this.admin.emit(type, data);
    }
}

module.exports = ConnectionManager;
