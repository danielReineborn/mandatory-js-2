let squares = document.querySelectorAll(".gameSquare");

let playerTurn = true;
let won = false;
let totalMoves = 0;

let firstPlayer = {
    name: "PlayerOne",
    wins: 0,
}

let secPlayer = {
    name: "PlayerTwo",
    wins: 0,
}

function play() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function (e) {
            if (won) return;
            let square = e.target;
            if (playerTurn) {
                playerOne(square);
            } else {
                playerTwo(square);
            }
            checkWinning2();
            if (totalMoves === 9 && won === false) {
                renderTie();
            }
        })
    };
}

let startScreen = document.querySelector(".start");
startScreen.addEventListener("click", function () {
    startScreen.classList.toggle("hide");
    let score = document.querySelector(".score-cont");
    score.classList.toggle("hide");
});

function playerOne(div) {
    if (div.textContent) return;
    let x = document.createElement("i");
    x.textContent = "clear";
    x.className = "material-icons piece";
    div.appendChild(x);
    playerTurn = !playerTurn;
    totalMoves++;
}

function playerTwo(div) {
    if (div.textContent) return;
    let o = document.createElement("i");
    o.textContent = "radio_button_unchecked";
    o.className = "material-icons piece";
    div.appendChild(o);
    playerTurn = !playerTurn;
    totalMoves++;
}


function checkWinning2() {
    const winStates = [ // Possible winning rows
        [0, 1, 2], // horisontal
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // vertical
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonal
        [2, 4, 6]
    ]
    for (let i = 0; i < winStates.length; i++) { // Looping array.
        let player = null; // Null is for keeping track of first click on square.
        for (let square of winStates[i]) {

            if (player === null && squares[square].innerText !== "") { // If first click and square is not empty ->
                player = squares[square].innerText; // Player = X or O.
            } else if (player !== squares[square].innerText) { // if the square next to first one is not same, break;
                break;
            } else if (square === winStates[i][winStates[i].length - 1]) { // If statement above does not happen this means full row of X or O = winning row.

                won = true;
                if (player === "clear") {
                    renderWin(firstPlayer);
                } else renderWin(secPlayer);
            }
        }
        if (won) break;
    }
}

function renderTie() {
    let div = document.createElement("div");
    div.className = "winScreen";
    let p = document.createElement("p");
    p.className = "winScreen-text"
    p.textContent = "It's a tie!";
    div.appendChild(p);
    let resBtn = document.createElement("button");
    resBtn.className = "resBtn";
    resBtn.textContent = "Play again";
    div.appendChild(resBtn);
    document.body.appendChild(div);
    resBtn.addEventListener("click", function () {
        document.body.removeChild(div);
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = "";
        };
        playerTurn = true;
        totalMoves = 0;
    });
};

function renderWin(player) {
    let div = document.createElement("div");
    div.className = "winScreen";
    let p = document.createElement("p");
    p.className = "winScreen-text"
    p.textContent = player.name + " won!";
    div.appendChild(p);
    let resBtn = document.createElement("button");
    resBtn.className = "resBtn";
    resBtn.textContent = "Play again";
    div.appendChild(resBtn);
    document.body.appendChild(div);
    resBtn.addEventListener("click", function () {
        div.remove();
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = "";
        };
        won = false;
        playerTurn = true;
        player.wins++;
        totalMoves = 0;
        let playerOneWins = document.querySelector(".playerOneWins");
        playerOneWins.innerText = firstPlayer.wins;
        let playerTwoWins = document.querySelector(".playerTwoWins");
        playerTwoWins.innerText = secPlayer.wins;
    })
};
play();