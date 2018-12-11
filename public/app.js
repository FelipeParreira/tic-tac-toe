// check if anyone won the game
var checkIfWon = function(row, col) {
  var rowSum = state.board[row].reduce((total, el) => total  && state.players[state.currentPlayer].value === el, true);
  if (rowSum) {
    UIHelpers.updateWinSquares(row, 'row');
    return true;
  }

  var colSum = state.board.reduce((total, row) => total && state.players[state.currentPlayer].value === row[col], true);
  if (colSum) {
    UIHelpers.updateWinSquares(col, 'col');
    return true;
  }
    
  if (row + col === 2) {
    var sumSecDiagonal = state.board.reduce((total, row, index) => total && state.players[state.currentPlayer].value === row[2 - index], true);
    if (sumSecDiagonal) {
      UIHelpers.updateWinSquares(2, 'sec');
      return true;
    }
  }

  if (row === col) {
    var sumMainDiagonal = state.board.reduce((total, row, index) => total  && state.players[state.currentPlayer].value === row[index], true);
    if (sumMainDiagonal) {
      UIHelpers.updateWinSquares(0, 'diag');
      return true;
    }
  }

  return false;

};

var playTurn = function(square) {
  if (!state.gameIsFinished) {

    state.turn++;
    var [row, col] = square.classList[1].split('').map(el => Number(el));

    if (state.board[row][col] !== 0) {
      return false;
    }

    var value = state.players[state.currentPlayer].value;

    // render the updated square to the UI
    UIHelpers.updateSquare(square);  

    state.board[row][col] = value;

    if (checkIfWon(row, col)) {
      state.players[state.currentPlayer].score++;
      state.lastWon = true;

      UIHelpers.alertGameWon();
      UIHelpers.updateScore(state.currentPlayer);
      UIHelpers.setBoardForFinishedGame();
      
      return true;
    } else if (state.turn === 9) {
      state.ties++;
      state.lastWon = false;

      UIHelpers.alertTie();
      UIHelpers.updateTies();
      UIHelpers.setBoardForFinishedGame();

      state.currentPlayer = 0;
      return true;
    }

    state.currentPlayer = 1 - state.currentPlayer;
    UIHelpers.updateTurn();
    return false;
  }
};

var resetGame = function() {
  // clean the board
  for (var i = 0; i < state.board.length; i++) {
    for (var j = 0; j < state.board.length; j++) {
      state.board[i][j] = 0;
    }
  }

  // re-render the board to the UI
  UIHelpers.emptyBoard();
  

  // reset state variables
  state.turn = 0;

  UIHelpers.alertNewGame();

  if (state.lastWon) {
    state.lastWon = false;
  }

  state.gameIsFinished = false;
  UIHelpers.askUserOnEffects();
}

window.addEventListener( 'load', function(event) {
    
  UIHelpers.setResetButton();

  var $squares = Array.from(document.getElementsByClassName('square'));

  UIHelpers.setBoard();
  UIHelpers.setScores();
  UIHelpers.askUserOnEffects();
  
});