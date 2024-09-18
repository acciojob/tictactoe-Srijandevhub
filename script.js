//your JS code here. If required.
let player1, player2, currentPlayer;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

document.getElementById('submit').addEventListener('click', startGame);

function startGame() {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;
    if (player1 && player2) {
        document.getElementById('name-input').style.display = 'none';
        document.getElementById('game-board').style.display = 'block';
        currentPlayer = player1;
        updateMessage();
        setupBoard();
    }
}

function setupBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(e) {
    const cellIndex = parseInt(e.target.id) - 1;
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
        e.target.textContent = gameBoard[cellIndex];
        if (checkWin()) {
            updateMessage(`${currentPlayer} congratulations you won!`);
            endGame();
        } else if (gameBoard.every(cell => cell !== '')) {
            updateMessage("It's a draw!");
            endGame();
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            updateMessage();
        }
    }
}

function checkWin() {
    return winCombos.some(combo => {
        return combo.every(index => {
            return gameBoard[index] === (currentPlayer === player1 ? 'X' : 'O');
        });
    });
}

function updateMessage(message) {
    const messageDiv = document.querySelector('.message');
    messageDiv.textContent = message || `${currentPlayer}, you're up`;
}

function endGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}