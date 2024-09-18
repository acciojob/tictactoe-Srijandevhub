document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    let currentPlayer = player1;
    let currentMarker = 'X';
    let gameActive = true;
    const boardState = ["", "", "", "", "", "", "", "", ""];
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.board div');

    messageDiv.textContent = `${currentPlayer}, you're up!`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener('click', function() {
            const cellIndex = parseInt(cell.id) - 1;

            if (boardState[cellIndex] !== "" || !gameActive) {
                return;
            }

            boardState[cellIndex] = currentMarker;
            cell.textContent = currentMarker;

            if (checkWinner(boardState, currentMarker)) {
                messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
                gameActive = false;
            } else if (!boardState.includes("")) {
                messageDiv.textContent = "It's a tie!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                currentMarker = currentMarker === 'X' ? 'O' : 'X';
                messageDiv.textContent = `${currentPlayer}, you're up!`;
            }
        }, { once: true });
    });
});

function checkWinner(boardState, currentMarker) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombos.some(combo => 
        combo.every(index => boardState[index] === currentMarker)
    );
}