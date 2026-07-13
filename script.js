let GameBoard = function(){
    const rows = 3;
    const columns = 3;
    const board = [];
    let winner = 0;
    let rowMap = {};
    let columnMap = {};
    let diagonalMap = {};

    let initializeMaps = () => {
    rowMap = {0:{1:0, 2:0}, 1:{1:0, 2:0}, 2:{1:0, 2:0}};
    columnMap = {0:{1:0, 2:0}, 1:{1:0, 2:0}, 2:{1:0, 2:0}};
    diagonalMap = {one:{1:0, 2:0}, two:{1:0, 2:0}};
    }

    let reset = () => {
        initializeMaps();
        winner = 0;
        for(let i = 0; i < rows; i++){
            board[i] = [];
            for(let j = 0; j < columns; j++){
                board[i].push(Cell());
            }
        }
    }

    reset();

    const tapCell = (row, column, player) => {
        let cell = board[row][column].getToken();

        if(!cell){
            board[row][column].addToken(player);
            rowMap[row][player]+=1;
            columnMap[column][player]+=1;
            console.log(row);
            console.log(column);
            console.log(row==2 && column ==0)
            if((row==0 && column ==0) || (row==1 && column ==1) || (row==2 && column ==2)){
                console.log("Hey")
                diagonalMap.one[player]+=1;
            }
            if((row==0 && column ==2) || (row==1 && column ==1) || (row==2 && column ==0)){
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

    return {tapCell, printBoard, getWinner, getBoard, reset}

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
    //let winner = 0;

   

    const playRound = (row, column) => {
        console.log(`count = ${count}`)
        count++;
        game.tapCell(row, column, activePlayer.token);
        game.printBoard();

        //winner logic here
        if(game.getWinner() !== 0){
            console.log(`player${game.getWinner()} is winner`);
            return game.getWinner();;
        }
        if(count === 9 && game.getWinner() === 0){
            return -1;
        }

        switchPlayer();

        return 0;
    }

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const defaultPlayer = () => {
        activePlayer = players[0];
    }

    const getActivePlayer = () => activePlayer;

    const getPlayers = () => players;

    const setPlayers = (playerOne, playerTwo) => {
        players[0].name = playerOne;
        players[1].name = playerTwo
    }

    const gameReset = () => {
        game.reset();
        count = 0;
        winner = 0;
    }

    return {playRound, getActivePlayer, getPlayers, setPlayers, getBoard: game.getBoard, gameWinner: game.getWinner, gameReset, defaultPlayer}
};

let ScreenController = function(){

    const game = GameController();
    const board = game.getBoard();
    const versus = document.querySelector(".versus");
    const turn = document.querySelector(".turn");
    const grid = document.querySelector(".grid");
    const setName = document.querySelector(".set-names");
    const dialog = document.querySelector(".set-names-dialog");
    const winnerDialog = document.querySelector(".winner");
    const winnerText = document.querySelector(".winner-text");
    const dialogRestart = document.querySelector(".dialog-restart");
    const restart = document.querySelector(".restart");

    const updateScreen = () => {
        grid.textContent = "";
        showVersus(`${game.getPlayers()[0].name} \n Vs \n ${game.getPlayers()[1].name}`);
        showTurn(`${game.getActivePlayer().name}'s turn`);
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

    const showVersus = (str) => {
        versus.textContent = "";
        versus.textContent = str;
    }

    const showTurn = (str) => {
        turn.textContent = "";
        turn.textContent = str;
    }

    restart.addEventListener("click", () => {
            //console.log("Hey");
            //winnerDialog.close();
            game.gameReset();
            game.defaultPlayer();
            updateScreen();
    })

    const clickHandler = (event) => {
        let res = 0;
        res = game.playRound(event.target.dataset.row, event.target.dataset.column);
        updateScreen();
        //console.log(res);
        if(res !== 0){
            winnerText.textContent = "";
            //let p = document.createElement("p");
            if(res === 1){
                winnerText.textContent = `${game.getActivePlayer().name} is the winner`;
                //winnerDialog.prepend(p); 
            }
            else if(res === 2){
                winnerText.textContent = `${game.getActivePlayer().name} is the winner`;
                //winnerDialog.prepend(p); 
            }
            else if(res === -1){
                winnerText.textContent = `Draw`;
                //winnerDialog.prepend(p); 
            }
            winnerDialog.showModal();
        }
        dialogRestart.addEventListener("click", () => {
            //console.log("Hey");
            winnerDialog.close();
            game.gameReset();
            updateScreen();
            game.defaultPlayer();
        })
    }

    /*
    //setName.addEventListener('click', () => )
    const myForm = document.getElementById("add-players");
    myForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent standard page reload

    const formData = new FormData(myForm);
    const formObject = Object.fromEntries(formData.entries());

    console.log(formObject); 
    // Output: { username: "JohnDoe", email: "john@example.com" }

    game.setPlayers(formObject.one, formObject.two);
    showVersus();
    showTurn();

    dialog.close();
    myForm.reset();
    });

    setName.addEventListener('click', () => {dialog.showModal();});
    closeBtn.addEventListener('click', () => dialog.close());
    */

    updateScreen();
    
}

ScreenController();


