/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if (validateMove(position)) {
        board[position] = mark;
        return true;
    }
    return false;
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log(`
        ${board[1]} | ${board[2]} | ${board[3]}
        ----------
        ${board[4]} | ${board[5]} | ${board[6]}
        ----------
        ${board[7]} | ${board[8]} | ${board[9]}
    `);
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    position = parseInt(position);
    if (position < 1 || position > 9 || board[position] !== ' ') {
        return false;
    }
    return true;
}

// TODO: list out all the combinations of winning, you will need this
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // horizontal
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // vertical
    [1, 5, 9], [3, 5, 7] // diagonal
];

// TODO: implement a logic to check if the previous winner just won
// This method should return with true or false
function checkWin(player) {
    return winCombinations.some(combination => 
        combination.every(index => board[index] === player)
    );
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie basically means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    return Object.values(board).every(mark => mark !== ' ');
}

// *****************************************************
// Copy all your code/functions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    printBoard();
    let position = prompt(`Player ${player}, enter your move (1-9): `);
    while (!markBoard(position, player)) {
        console.log('Invalid move, try again.');
        position = prompt(`Player ${player}, enter your move (1-9): `);
    }
    if (checkWin(player)) {
        printBoard();
        console.log(`Player ${player} wins!`);
        return true;
    } else if (checkFull()) {
        printBoard();
        console.log('The game is a tie!');
        return true;
    }
    return false;
}

function resetBoard() {
    board = {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };
}

function startGame() {
    // entry point of the whole program
    console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');

    let winnerIdentified = false;
    let currentTurnPlayer = 'X';

    while (!winnerIdentified) {
        winnerIdentified = playTurn(currentTurnPlayer);
        // feel free to add logic here if needed, e.g. announcing winner or tie
        currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
    }

    // Bonus Point: Implement the feature for the user to restart the game after a tie or game over
    let playAgain = prompt('Do you want to play again? (yes/no): ').toLowerCase();
    if (playAgain === 'y') {
        resetBoard();
        startGame();
    } else {
        console.log('Thanks for playing!');
    }
}

// Call the startGame function to begin the game
startGame();
