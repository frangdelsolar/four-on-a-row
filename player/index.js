let socket = getSocket();
reactSocket(socket);
let emitter = new Emitter(socket);

let newGameBtn;

let gameData;

let boardWidth = 200;
let cellSize = boardWidth / 7;

function setup() {
    createCanvas(200, 250);

    newGameBtn = createButton("New Game");
    newGameBtn.mousePressed(() => {
        emitter.newGame();
    });
}

function draw() {
    if (!gameData) {
        return;
    }
    background(0);

    drawTitle(10, 20);
    drawBoard(0, 40, boardWidth);
    drawLabel(10, 230);
}

function mousePressed() {
    if (!gameData || gameData.winner) {
        return;
    }

    if (mouseY < 40 || mouseY > boardWidth) {
        return;
    }

    if (mouseX < 0 || mouseX > boardWidth) {
        return;
    }

    let col = floor(mouseX / cellSize);
    emitter.move(col);
}
