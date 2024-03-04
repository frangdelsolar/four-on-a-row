const display = () => {
    const connDiv = document.getElementById("connections");
    connDiv.innerHTML = "";

    for (let [connectionId, gameData] of Object.entries(connections)) {
        const title = document.createElement("h3");
        title.innerHTML = gameData.gameId;
        connDiv.appendChild(title);

        // Create the table for the game
        const table = document.createElement("table");
        table.classList.add("connect-four-table"); // Add a class for styling

        // Create the table header row
        const headerRow = table.insertRow();
        for (let i = 0; i < 7; i++) {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = i + 1;
            headerCell.classList.add("column-header"); // Add a class for styling
            headerCell.addEventListener("click", () => {
                if (gameData.winner) return;
                socketEmitter.move({
                    connectionId,
                    col: i,
                });
            });
        }

        // Create the table body rows
        const board = gameData.board;
        for (let i = 0; i < board.length; i++) {
            const row = table.insertRow();
            for (let j = 0; j < board[i].length; j++) {
                const cell = row.insertCell();
                const cellContent = document.createTextNode(""); // Create an empty text node for coins
                cell.appendChild(cellContent);
                cell.classList.add("board-cell");

                if (board[i][j]) {
                    const coin = document.createElement("span");
                    coin.classList.add(
                        "coin",
                        board[i][j] === "O" ? "red" : "yellow"
                    ); // Add coin class and color
                    coin.textContent = "\u25CF"; // Solid circle for the coin
                    cell.appendChild(coin);
                }
            }
        }

        connDiv.appendChild(table);

        // label with own's color
        const colorLabel = document.createElement("p");
        colorLabel.innerHTML = "Your color: ";
        colorLabel.innerHTML += gameData.serverSymbol == "O" ? "red" : "yellow";
        connDiv.appendChild(colorLabel);

        // a label with turn
        const turnLabel = document.createElement("p");
        turnLabel.innerHTML =
            gameData.turn === gameData.serverSymbol
                ? "Server's Turn"
                : "Opponent's Turn";

        if (gameData.winner) {
            turnLabel.innerHTML = "Winner: ";
            turnLabel.innerHTML += gameData.winner == "O" ? "red" : "yellow";
        }

        connDiv.appendChild(turnLabel);
    }
};
