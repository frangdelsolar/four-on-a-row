class Game {
    constructor(connectionId) {
        this.connectionId = connectionId;
        this.gameId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        this.clientSymbol = Math.random() > 0.5 ? "X" : "O";
        this.serverSymbol = this.clientSymbol === "X" ? "O" : "X";
        this.turn = "X";

        this.board = [];

        this.createBoard();
    }

    createBoard() {
        for (let i = 0; i < 6; i++) {
            this.board[i] = [];
            for (let j = 0; j < 7; j++) {
                this.board[i][j] = "";
            }
        }
    }

    switchPlayer() {
        if (this.turn === "X") {
            this.turn = "O";
        } else {
            this.turn = "X";
        }
    }

    place(col) {
        let success = false;
        for (let i = 5; i >= 0; i--) {
            if (this.board[i][col] === "") {
                this.board[i][col] = this.turn;
                success = true;
                break;
            }
        }

        if (success) {
            this.switchPlayer();
        }

        return success;
    }

    checkWin() {
        const b = this.board;
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                if (b[r][c] == "") {
                    continue;
                }

                // horizontal
                if (c < 4) {
                    if (
                        b[r][c] == b[r][c + 1] &&
                        b[r][c + 1] == b[r][c + 2] &&
                        b[r][c + 2] == b[r][c + 3]
                    ) {
                        return b[r][c];
                    }
                }

                // vertical
                if (r < 3) {
                    if (
                        b[r][c] == b[r + 1][c] &&
                        b[r + 1][c] == b[r + 2][c] &&
                        b[r + 2][c] == b[r + 3][c]
                    ) {
                        return b[r][c];
                    }
                }

                // diagonal right
                if (r < 3 && c < 4) {
                    if (
                        b[r][c] == b[r + 1][c + 1] &&
                        b[r + 1][c + 1] == b[r + 2][c + 2] &&
                        b[r + 2][c + 2] == b[r + 3][c + 3]
                    ) {
                        return b[r][c];
                    }
                }

                // diagonal left
                if (r < 3 && c > 2) {
                    if (
                        b[r][c] == b[r + 1][c - 1] &&
                        b[r + 1][c - 1] == b[r + 2][c - 2] &&
                        b[r + 2][c - 2] == b[r + 3][c - 3]
                    ) {
                        return b[r][c];
                    }
                }
            }
        }

        return false;
    }

    autoPlay() {
        let col = Math.floor(Math.random() * 6);
        let success = this.place(col);

        while (!success) {
            col = Math.floor(Math.random() * 6);
            success = this.place(col);
        }

        return success;
    }
}

module.exports = Game;
