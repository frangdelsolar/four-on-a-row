const Game = require("./game");

class GameManager {
    constructor() {
        this.games = {};
    }

    create(connectionId) {
        let game = new Game(connectionId);
        this.games[connectionId] = game;
        return game;
    }

    delete(connectionId) {
        delete this.games[connectionId];
    }

    move(isAdmin, data) {
        let { connectionId, col } = data;

        let success = false;

        let game = this.games[connectionId];
        if (!game) {
            return false;
        }

        if (isAdmin && game.turn === game.serverSymbol) {
            success = game.place(col);
        }

        if (!isAdmin && game.turn === game.clientSymbol) {
            success = game.place(col);
        }

        return game;
    }

    getWinner(game) {
        return game.checkWin();
    }
}

module.exports = new GameManager();
