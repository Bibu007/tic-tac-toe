let GameBoard = function(){
    const rows = 3;
    const columns = 3;
    const board = [];
    let rowMap = {0:{1:0, 2:0}, 1:{1:0, 2:0}, 2:{1:0, 2:0}};
    let columnMap = {0:{1:0, 2:0}, 1:{1:0, 2:0}, 2:{1:0, 2:0}};
    let diagonalMap = {one:{1:0, 2:0}, two:{1:0, 2:0}};
    let winner = 0;

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const tapCell = (row, column, player) => {
        let cell = board[row][column].getToken();

        if(!cell){
            board[row][column].addToken(player);
            rowMap[row][player]+=1;
            columnMap[column][player]+=1;
            if((row===0 && column ===0) || (row===1 && column ===1) || (row===2 && column ===2)){
                diagonalMap.one[player]+=1;
            }
            if((row===0 && column ===2) || (row===1 && column ===1) || (row===2 && column ===0)){
                diagonalMap.two[player]+=1;
            }
            //console.log(rowMap);

            if(rowMap[row][player] >= 3 || columnMap[column][player] >= 3 || diagonalMap.one[player] >= 3 || diagonalMap.two[player] >=3){
                winner = player;
            }
        }
    }

    const getWinner = () => winner;

    const printBoard = () => {
        let boardWithCells = board.map((item) => item.map((item) => item.getToken()));
        console.log(boardWithCells);
        console.log(rowMap);
        console.log(columnMap);
        console.log(diagonalMap);
    }

    const getBoard = () => board;

    return {tapCell, printBoard, getWinner, getBoard}

};

let Cell = () => {
    let value = 0;

    const addToken = (player) => {value = player;}
    const getToken = () => {
        if(value === 0){
            return "";
        }
        else if(value === 1){
            return "X";
        }
        else if(value === 2){
            return "0";
        }
    };

    return {addToken, getToken};
        
};

let GameController = function(){
    let players = [
        {name: "playerOne", token: 1},
        {name: "playerTwo", token: 2}
    ];

    let activePlayer = players[0];
    let count = 0;
    const game = GameBoard();

    const playRound = (row, column) => {
        count++;
        game.tapCell(row, column, activePlayer.token);
        game.printBoard();

        //winner logic here
        if(game.getWinner() !== 0){
            console.log(`player${game.getWinner()} is winner`);
        }
        if(count === 9 && game.getWinner === 0){

        }

        switchPlayer();
    }

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const getPlayers = () => players;

    return {playRound, getActivePlayer, getPlayers, getBoard: game.getBoard}
};

let ScreenController = function(){

    const game = GameController();
    const board = game.getBoard();
    const versus = document.querySelector(".versus");
    const turn = document.querySelector(".turn");
    const grid = document.querySelector(".grid");

    const updateScreen = () => {
        grid.textContent = "";
        turn.textContent = "";
        versus.textContent = "";
        versus.textContent = `${game.getPlayers()[0].name} \n Vs \n ${game.getPlayers()[1].name}`;
        turn.textContent = `${game.getActivePlayer().name}'s turn`;
         for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const cell = document.createElement("button");
                cell.addEventListener('click', clickHandler);
                cell.classList.add("cell");
                cell.dataset.row = `${i}`;
                cell.dataset.column = `${j}`
                cell.textContent = `${board[i][j].getToken()}`;
                grid.appendChild(cell);
            }
        }
    }

    const clickHandler = (event) => {
        game.playRound(event.target.dataset.row, event.target.dataset.column);
        updateScreen();
    }

    updateScreen();
    
}

ScreenController();


