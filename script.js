const Gameboard = (function () {
    let gameboard = [[null, null, null], 
                     [null, null, null], 
                     [null, null, null]]; // board of 3x3

    const getGameboard = () => gameboard;
    const setGameboard = (row, col, val) => gameboard[row][col] = val;
    const resetGameboard = () => gameboard = [[null, null, null], 
                                              [null, null, null], 
                                              [null, null, null]];

    return { getGameboard, setGameboard, resetGameboard };
})();

const Player = (function (playerRole) {
    let role = playerRole; // 1 for 'x', 0 for 'o'
    let isWinner = false;
    let winCount = 0;

    const getRole = () => role;
    const setRole = (playerRole) => role = playerRole;
    const getWinner = () => isWinner;
    const setWinner = (status) => isWinner = status;
    const getWinCount = () => winCount;
    const incWinCount = () => winCount++;

    return { getRole , setRole, getWinner, setWinner, getWinCount, incWinCount };
})();

const Game = (function () {
    // initialize gameboard
    let gameboard = Gameboard;

    // initialize players
    let player1 = Player(1);
    let player2 = Player(0);
    let winner = null;

    let playing = player1; // 'x' starts\
    let playCount = 0;

    const changePlayers = () => {
        if (playing == player1) {
            playing = player2;
        } else {
            playing = player1;
        }
    }

    // returns the winner (1 for 'x', 0 for 'o') if there is a winning row,
    // false otherwise
    const checkRow = () => {
        // [[x, x, x], [o, o, o], [o, o, o]]
        // [[o, o, o], [x, x, x], [o, o, o]]
        // [[o, o, o], [o, o, o], [x, x, x]]
        gameboard.forEach(row => {
            if (row[0] == row[1] == row[2]) {
                return row[0];
            }
        });
        return false;
    }

    // returns the winner (1 for 'x', 0 for 'o') if there is a winning column,
    // false otherwise
    const checkCol = () => {
        // [[x, o, o], [x, o, o], [x, o, o]]
        // [[o, x, o], [o, x, o], [o, x, o]]
        // [[o, o, x], [o, o, x], [o, o, x]]
        if (gameboard[0][0] == gameboard[1][0] == gameboard[2][0]) {
            return gameboard[0][0];
        } else if (gameboard[0][1] == gameboard[1][1] == gameboard[2][1]) {
            return gameboard[0][1];
        } else if (gameboard[0][2] == gameboard[1][2] == gameboard[2][2]) {
            return gameboard[0][2];
        }
        return false;
    }

    // returns the winner (1 for 'x', 0 for 'o') if there is a winning
    // diagonal, false otherwise
    const checkDiag = () => {
        // [[x, o, o], [o, x, o], [o, o, x]]
        // [[o, o, x], [o, x, o], [x, o, o]]
        if (gameboard[0][0] == gameboard[1][1] == gameboard[2][2]) {
            return gameboard[0][0];
        } else if (gameboard[0][2] == gameboard[1][1] == gameboard[2][0]) {
            return gameboard[0][2];
        }
        return false;
    }

    // returns the winner (1 for 'x', 0 for 'o'), false if there is no winner
    const checkPatern = () => {
        let winRow = checkRow;
        let winCol = checkCol;
        let winDiag = checkDiag;

        if (!winRow == !winCol == !winDiag) {
            return false;
        } else if (winRow) {
            return winRow;
        } else if (winCol) {
            return winCol;
        } else if (winDiag) {
            return winDiag;
        }

        return false;
    }

    while (!winner || playCount != 9) {
        // update gameboard
        let row;
        let col;
        let val = playing.getRole;
        gameboard.setGameboard(row, col, val);

        // check for winning pattern
        winner = checkPatern;

        // change players
        changePlayers;

        // update playCount
        playCount++;
    }

    // declare winner or tie
    if (winner) { // win
        console.log('winner is', winner);
        // TODO
    } else { // tie
        console.log("it's a tie!");
        // TODO
    }

    // reset game
    // TODO
})();

const Display = (function () {

})();