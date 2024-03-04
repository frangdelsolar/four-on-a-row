const express = require("express");
const ConnectionManager = require("./connections/main");
const connectionHandler = new ConnectionManager();
const gameHandler = require("./game/manager");

const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const io = require("socket.io")(server, {
    cors: {
        origin: [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ],
        methods: ["GET", "POST"],
        headers: ["isAdmin", "clientId"],
    },
});

io.on("connection", (socket) => {
    let isAdmin = connectionHandler.insert(socket);

    if (isAdmin) {
        connectionHandler.notifyAdmin("status", gameHandler.games);
    }

    socket.on("getNewGame", () => {
        const game = gameHandler.create(socket.id);
        connectionHandler.notifyAdmin("newGame", game);
        connectionHandler.notify(socket.id, "newGame", game);
        if (game.turn === game.serverSymbol) {
            autoPlay(game, socket.id);
        }
    });

    socket.on("move", (data) => {
        let isAdmin = connectionHandler.isAdmin(socket.id);
        let game = gameHandler.move(isAdmin, data);

        let { connectionId } = data;

        if (!game) {
            return;
        }

        connectionHandler.notifyAdmin("update", game);
        connectionHandler.notify(connectionId, "update", game);

        let winner = checkWin(game, connectionId);

        if (game.turn === game.serverSymbol && !winner) {
            autoPlay(game, connectionId);
        }
    });

    socket.on("disconnect", () => {
        connectionHandler.delete(socket.id);
        gameHandler.delete(socket.id);
        connectionHandler.notifyAdmin("deleteGame", socket.id);
    });
});

const autoPlay = (game, connectionId) => {
    game.autoPlay();
    connectionHandler.notifyAdmin("update", game);
    connectionHandler.notify(connectionId, "update", game);

    checkWin(game, connectionId);
};

const checkWin = (game, connectionId) => {
    const winner = gameHandler.getWinner(game);
    if (winner) {
        connectionHandler.notifyAdmin("winner", {
            connectionId,
            winner,
        });
        connectionHandler.notify(connectionId, "winner", winner);
    }
    return winner;
};
