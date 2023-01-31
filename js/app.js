/**
 * 
 */

class Connect {
    constructor() {
        this.main = document.getElementById('main')
        this.gameProg = document.getElementById('gameProgress')
        this.currPlayer = document.getElementById('currentPlayer');
        this.player = document.getElementById('player');
        this.headsWins = document.getElementById('headsWins');
        this.tailsWins = document.getElementById('tailsWins');

        this.winCount = {
            h: 0,
            t: 0
        }

        this.gameBoard = document.getElementById('gameBoard');
        this.gameBoardCtx = this.gameBoard.getContext('2d');

        this.gameBoardSection = document.getElementById("gameSection");

        this.boardBg = 'whitesmoke';
        this.boardBorder = "#67330F";

        this.gameActive = true;
        this.currPlayer = 'H';

        this.gameState = [
            '', '', '', '', '', '', '',
            '', '', '', '', '', '', '',
            '', '', '', '', '', '', '',
            '', '', '', '', '', '', '',
            '', '', '', '', '', '', '',
            '', '', '', '', '', '', ''
        ]

        // array courtesy of Fakorede Damilola
        this.winningArray = [
            [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10],
            [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
            [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 20, 31],
            [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
            [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
            [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
            [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
            [37, 20, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
            [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
            [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
            [14, 22, 20, 38], [27, 19, 11, 3], [35, 29, 23, 17],
            [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
            [21, 15, 9, 3], [20, 26, 32, 38], [36, 20, 24, 18],
            [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
            [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
            [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
            [11, 7, 23, 29], [12, 18, 24, 20], [1, 2, 3, 4],
            [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
            [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
            [26, 25, 24, 23], [29, 20, 31, 32], [33, 32, 31, 20],
            [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
            [8, 15, 22, 29], [9, 16, 23, 20], [10, 17, 24, 31],
            [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
        ];

        this.dx = 100
        this.dy = 100


        this.clearBoardBtn = document.getElementById('boardClear')
    }
    
    init() {
        this.connectBoard();
        this.handleSpaceClicked();
        this.currPlayerTurn();
        this.clearBoardBtn.addEventListener('click', ()=> {
            this.clearBoard()
        })
        // console.log(this.clearBoard)
        // this.canvas();
        // this.drawBoard(700, 600, "gameBoard");
    }

    currPlayerTurn() {
        const message = `It's ${this.currPlayer}'s turn`;
        return this.gameProg.innerText = message;
    };

    drawMessage() {
        const message = `Game ended in a draw`;
        return this.gameProg.innerText = message;
    };

    winngingMessage() {
        const message = `Player ${this.currPlayer} has won!`;
        return this.gameProg.innerText = message;
    };



    // canvas() {
    //     const gameBoard = this.gameBoard;
    //     const gameBoardCtx = this.gameBoardCtx;

    //     gameBoardCtx.fillStyle = this.boardBg;
    //     gameBoardCtx.strokeStyle = this.boardBorder;
    //     gameBoardCtx.fillRect(0, 0, gameBoard.width, gameBoard.height);
    //     gameBoardCtx.strokeRect(0, 0, gameBoard.width, gameBoard.height);


    // }

    // drawBoard(w, h, gameBoard) {
    //     // gameBoard = document.getElementById("gameBoard");
    //     this.gameBoardCtx //= gameBoard.getContext('2d');
    //     this.gameBoardCtx.canvas.width = w;
    //     this.gameBoardCtx.canvas.height = h;


    //     for (this.dx = 0; this.dx <= w; this.dx += 100) {
    //         for (this.dy = 0; this.dy <= h; this.dy += 100) {
        //             this.gameBoardCtx.moveTo(this.dx, 0);
        //             this.gameBoardCtx.lineTo(this.dx, h);
        //             this.gameBoardCtx.stroke();
        //             this.gameBoardCtx.moveTo(0, this.dy);
    //             this.gameBoardCtx.lineTo(w, this.dy);
    //             this.gameBoardCtx.stroke();
    //         }
    //     };

    // }

    connectBoard() {
        var divSpace = document.createElement('div');
        this.gameBoardSection.appendChild(divSpace);
        divSpace = `
        <div data-cell-index='0' class='connect-space'></div>
        <div data-cell-index='1' class='connect-space'></div>
        <div data-cell-index='2' class='connect-space'></div>
        <div data-cell-index='3' class='connect-space'></div>
        <div data-cell-index='4' class='connect-space'></div>
        <div data-cell-index='5' class='connect-space'></div>
        <div data-cell-index='6' class='connect-space'></div>
        <div data-cell-index='7' class='connect-space'></div>
        <div data-cell-index='8' class='connect-space'></div>
        <div data-cell-index='9' class='connect-space'></div>
        <div data-cell-index='10' class='connect-space'></div>
        <div data-cell-index='11' class='connect-space'></div>
        <div data-cell-index='12' class='connect-space'></div>
        <div data-cell-index='13' class='connect-space'></div>
        <div data-cell-index='14' class='connect-space'></div>
        <div data-cell-index='15' class='connect-space'></div>
        <div data-cell-index='16' class='connect-space'></div>
        <div data-cell-index='17' class='connect-space'></div>
        <div data-cell-index='18' class='connect-space'></div>
        <div data-cell-index='19' class='connect-space'></div>
        <div data-cell-index='20' class='connect-space'></div>
        <div data-cell-index='21' class='connect-space'></div>
        <div data-cell-index='22' class='connect-space'></div>
        <div data-cell-index='23' class='connect-space'></div>
        <div data-cell-index='24' class='connect-space'></div>
        <div data-cell-index='25' class='connect-space'></div>
        <div data-cell-index='26' class='connect-space'></div>
        <div data-cell-index='27' class='connect-space'></div>
        <div data-cell-index='28' class='connect-space'></div>
        <div data-cell-index='29' class='connect-space'></div>
        <div data-cell-index='30' class='connect-space'></div>
        <div data-cell-index='31' class='connect-space'></div>
        <div data-cell-index='32' class='connect-space'></div>
        <div data-cell-index='33' class='connect-space'></div>
        <div data-cell-index='34' class='connect-space'></div>
        <div data-cell-index='35' class='connect-space'></div>
        <div data-cell-index='36' class='connect-space'></div>
        <div data-cell-index='37' class='connect-space'></div>
        <div data-cell-index='38' class='connect-space'></div>
        <div data-cell-index='39' class='connect-space'></div>
        <div data-cell-index='40' class='connect-space'></div>
        <div data-cell-index='41' class='connect-space'></div>
        `
        this.gameBoardSection.innerHTML = divSpace

        this.gameBoardSection.style.backgroundColor = 'darkred';
    }

    handleSpaceClicked() {
        const spaces = document.querySelectorAll(".connect-space");
        spaces.forEach(space => {
            const spaceIdx = parseInt(space.getAttribute('data-cell-index'));
            space.addEventListener('click', () => {
                if (this.gameState[spaceIdx] != '' || !this.gameActive) {
                    return;
                }
                

                this.handleSpacePlayed(space, spaceIdx);
                this.resultValidation();
            })
        })
    }

    handleSpacePlayed(space, spaceIdx) {
        this.gameState[spaceIdx] = this.currPlayer;
        this.currPlayer == 'H' ? space.classList.add('heads') : space.classList.add('tails');
        space.innerText = this.currPlayer;
    }
    
    resultValidation() {
        let gameWon = false;

        for (let i = 0; i <= 40; i++) {
            const win = this.winningArray[i];

            let a = this.gameState[win[0]]
            let b = this.gameState[win[1]]
            let c = this.gameState[win[2]]
            let d = this.gameState[win[3]]
            
            if (a == '' || b == '' || c == '' || d == '') {
                continue;
            }

            if (a == b && b == c && c == d){
                gameWon = true;
                break;
            }

        }

        if (gameWon) {
            const tallymark = '√'
            this.winngingMessage();
            const winner = this.currPlayer;
            if (winner == 'H') {
                this.winCount.h = this.winCount.h = 1;
                this.headsWins.innerHTML += `<span class='tally'> ${tallymark} </span>`
            } else {
                this.winCount.t = this.winCount.t = 1;
                this.tailsWins.innerHTML += `<span class='tally'> ${tallymark} </span>`
            }
            
            this.gameActive = false;
            return;
        }

        const roundDraw = !this.gameState.includes('');
        if(roundDraw) {
            this.drawMessage();
            this.gameActive = false;
            return
        }

        
        this.playerChange()
        
    }

    playerChange() {
        this.currPlayer = this.currPlayer === 'H' ? 'T' : 'H';
        this.currPlayerTurn()
    }

    clearBoard() {
        this.gameActive = true;
        this.currPlayer = 'H';
        this.gameState = [
            '','','','','','','',
            '','','','','','','',
            '','','','','','','',
            '','','','','','','',
            '','','','','','','',
            '','','','','','',''
        ];
        this.connectBoard();
        this.handleSpaceClicked();
        this.currPlayerTurn();
        document.querySelectorAll('.space').forEach(space => {
            space.innerText = ''
            // space.classList.remove('tails')
        });
        // console.log(this.gameState)

    }
    
}

const connectFour = new Connect();

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
    connectFour.init();
})

//make each column its own array?