//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const submitButton = document.getElementById('submit');
    const gameDiv = document.getElementById('game');
    const messageDiv = document.querySelector('.message');
    let currentPlayer = 'x';
    let player1 = '';
    let player2 = '';
    let board = ['', '', '', '', '', '', '', '', ''];

    const cells = document.querySelectorAll('.cell');

    submitButton.addEventListener('click', () => {
        player1 = player1Input.value;
        player2 = player2Input.value;

        if (player1 && player2) {
            document.getElementById('setup').style.display = 'none';
            gameDiv.style.display = 'block';
            updateMessage();
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.id - 1;

            if (board[index] === '') {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                if (checkWin()) {
                    messageDiv.textContent = `${currentPlayer === 'x' ? player1 : player2} congratulations you won!`;
                    cells.forEach(c => c.removeEventListener('click', handleClick));
                } else if (board.every(cell => cell !== '')) {
                    messageDiv.textContent = 'It\'s a draw!';
                } else {
                    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
                    updateMessage();
                }
            }
        });
    });

    function updateMessage() {
        messageDiv.textContent = `${currentPlayer === 'x' ? player1 : player2}, you're up`;
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }
});