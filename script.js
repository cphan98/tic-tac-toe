const Gameboard = (function () {
    let gameboard = [[null, null, null], 
                     [null, null, null], 
                     [null, null, null]]; // board of 3x3

    // getters and setters
    const getGameboard = () => gameboard;
    const setGameboardVal = (row, col, val) => gameboard[row][col] = val;
    
    // functions
    const resetGameboard = () => gameboard = [[null, null, null], 
                                              [null, null, null], 
                                              [null, null, null]];

    return { getGameboard, setGameboardVal, resetGameboard };
})();

function Player() {
    let role; // 1 for 'x', 0 for 'o'
    let winCount = 0;

    // getters and setters
    const getRole = () => role;
    const setRole = (playerRole) => role = playerRole;
    const getWinCount = () => winCount;

    // fucntions
    const incWinCount = () => winCount++;

    return { getRole , setRole, getWinCount, incWinCount };
};

const Display = (function () {
    // displays the win counts for X and O, and the draw count
    const displayHeader = (xPlayer, oPlayer, drawCount) => {
        let xContainer = document.querySelector(".x-container");
        let drawContainer = document.querySelector(".draw-container");
        let oContainer = document.querySelector(".o-container");
        let xWinCount = xContainer.querySelector("p");
        let dCount = drawContainer.querySelector("p");
        let oWinCount = oContainer.querySelector("p");

        xWinCount.textContent = `${xPlayer.getWinCount()} wins`;
        dCount.textContent = `${drawCount} draws`;
        oWinCount.textContent = `${oPlayer.getWinCount()} wins`;
    }

    // displays the game's grid: 3x3 table
    const displayGrid = (gameboard) => {
        for (let i = 0; i < gameboard.length; i++) {
            const row = document.querySelector(`.row${i}`);
            for (let j = 0; j < gameboard[i].length; j++) {
                const cell = row.querySelector(`.col${j}`);
                const val = gameboard[i][j];
                const img = document.createElement("img");

                switch (val) {
                    case 0: // O player
                        img.setAttribute("src", "images/letter-o.png");
                        break;
                    case 1: // X player
                        img.setAttribute("src", "images/letter-x.png");
                        break;
                    default:
                        console.log("invalid input");
                        return;
                }

                cell.appendChild(img);
            }
        }
    }

    // displays the img of the player playing on hover
    const displayOnHover = (playing) => {
        const cells = document.querySelectorAll("td");
        let imgSrc;

        switch (playing.getRole()) {
            case 0: // O player
                imgSrc = "images/letter-o-grey.png";
                break;
            case 1: // X player
                imgSrc = "images/letter-x-grey.png";
                break;
            default:
                break;
        }

        for (let i = 0; i < cells.length; i++) {
            const hoverImg = document.createElement("img");
            hoverImg.classList.add("hover-img");
            const cell = cells[i];

            if (cell.childElementCount != 0){
                console.log('no img added');
                continue;
            }

            hoverImg.src = imgSrc;
            cell.appendChild(hoverImg);
        }
    }

    return { displayHeader, displayGrid, displayOnHover };
})();

const Game = (function () {
    // initialize gameboard
    let gameboard = Gameboard;

    // initialize players
    let player1 = Player();
    let player2 = Player();
    player1.setRole(1);
    player2.setRole(0);

    // game variables
    let winner = null;
    let playing = player1; // 'x' starts\
    let drawCount = 0;

    // alternates between players
    const changePlayers = (playing) => {
        switch (playing.getRole()) {
            case 0: // O player
                playing = player1;
                break;
            case 1: // X player
                playing = player2;
                breaks
            default:
                break;
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

    Display.displayHeader(player1, player2, drawCount);
    Display.displayGrid(gameboard.getGameboard());

    while (!winner || playCount != 9) {
        // display playing player img on hover
        Display.displayOnHover(playing);

        // update gameboard on click
        let row;
        let col;
        let val = playing.getRole;
        gameboard.setGameboardVal(row, col, val);

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

Game;