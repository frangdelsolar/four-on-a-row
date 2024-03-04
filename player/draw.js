const DARK_GRAY = "#333333";
const LIGHT_GRAY = "#dddddd";
const RED = "#ff0000";
const YELLOW = "#ffff00";

function drawTitle(x, y) {
    let title = "Game: " + gameData.gameId;
    fill(255);
    textSize(12);
    textAlign(LEFT);
    text(title, x, y);
}

function drawBoard(x, y, w) {
    let s = w / gameData.board[0].length;
    for (let i = 0; i < gameData.board.length; i++) {
        for (let j = 0; j < gameData.board[i].length; j++) {
            let val = gameData.board[i][j];

            fill(LIGHT_GRAY);
            rect(x + j * s, y + i * s, s, s);

            if (val == "") {
                fill(DARK_GRAY);
            } else if (val == "X") {
                fill(YELLOW);
            } else if (val == "O") {
                fill(RED);
            }
            ellipse(x + j * s + s / 2, y + i * s + s / 2, s / 2, s / 2);
        }
    }
}

function drawLabel(x, y) {
    fill(255);
    textSize(12);
    textAlign(LEFT);

    let colorLabel = "Your color: ";
    colorLabel += gameData.clientSymbol == "O" ? "red" : "yellow";

    text(colorLabel, x, y);

    let label =
        gameData.turn === gameData.clientSymbol
            ? "Your Turn"
            : "Opponent's Turn";

    if (gameData.winner) {
        label = "Winner: ";
        label += gameData.winner == "O" ? "red" : "yellow";
    }

    text(label, x, y + 13);
}
