var playerNames = [
  window.prompt('Enter the name of player one (X):', 'First Player'),
  window.prompt('Enter the name of player two (O):', 'Second Player')
];

// state variables
var state = {

  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],

  players: [
    {
      name: playerNames[0],
      value: 1,
      sign: 'X',
      score: 0
    },

    {
      name: playerNames[1],
      value: 2,
      sign: 'O',
      score: 0
    },
  ],

  ties: 0,

  gameIsFinished: false,

  turn: 0,

  currentPlayer: 0,

  lastWon: false

};

// UI helper functions
var UIHelpers = {

  updateSquare: function(square) {
    square.innerText = state.players[state.currentPlayer].sign;
    square.classList.remove('avail');
    square.classList.add('occup');
  },

  emptyBoard: function() {
    for (var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        var squareClass = '' + i + j;
        var square = document.getElementsByClassName(squareClass).valueOf()[0]
        square.innerText = '';
        square.classList.add('avail');
        square.classList.remove('occup');
        square.classList.remove('win-square');
      }
    }
  },

  alertNewGame: function() {
    var appendix;

    if (state.lastWon) {
      appendix = ' starts (since he won last time)!';
    } else {
      appendix = ' (since he was the one to play next)!';
    }

    window.alert(`Let's play a new round!\n ${state.players[state.currentPlayer].name} starts` + appendix);
  },

  alertGameWon: function() {
    setTimeout(() => window.alert(`${state.players[state.currentPlayer].name} won the game!`), 300);
  },

  alertTie: function() {
    setTimeout(() => window.alert('There was a tie!'), 100);
  },

  updateScore: function(currentPlayer) {
    document.getElementsByClassName('score-' + (1 + currentPlayer))[0].innerText = '' + state.players[state.currentPlayer].score;
  },

  updateTies: function() {
    document.getElementsByClassName('ties-score')[0].innerText = '' + state.ties;
  },

  setResetButton: function() {
    var $resetButton = document.getElementsByClassName('reset-button').valueOf()[0];
    $resetButton.addEventListener('click', resetGame);
  },

  setBoard: function() {
    var $board = document.getElementsByClassName('board')[0];
    $board.addEventListener('click', event => {
      state.gameIsFinished = playTurn(event.target) || state.gameIsFinished;
    });
  },

  setScores: function() {
    var $players = Array.from(document.getElementsByClassName('player'));
    $players.forEach((player, index) => {
      player.innerText = state.players[index].name;
      UIHelpers.updateScore(index);
    });
    UIHelpers.updateTies();
  },

  setBoardForFinishedGame: function() {
     for (var i = 0; i < 3; i++) {
       for(var j = 0; j < 3; j++) {
         var squareClass = '' + i + j;
         var square = document.getElementsByClassName(squareClass).valueOf()[0];
         square.classList.remove('avail');
       }
     }
  },

  updateWinSquares: function(index, direction) {
    var squares = Array.from(document.getElementsByClassName('square'));

    if(direction === 'row') {
      squares.forEach((square) => {
        if (square.classList[1].split('')[0] == index) {
          square.classList.add('win-square');
        }
      });
    } else if (direction === 'col') {
      squares.forEach((square) => {
        if (square.classList[1].split('')[1] == index) {
          square.classList.add('win-square');
        }
      });
    } else if (direction === 'diag') {
      squares.forEach((square) => {
        if (square.classList[1].split('')[0] == square.classList[1].split('')[1]) {
          square.classList.add('win-square');
        }
      });

    } else if (direction === 'sec') {
      squares.forEach((square) => {
        if (Number(square.classList[1].split('')[0]) + Number(square.classList[1].split('')[1]) === 2) {
          square.classList.add('win-square');
        }
      });
    }
  }

};


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
}

window.addEventListener( 'load', function(event) {
    
  UIHelpers.setResetButton();

  var $squares = Array.from(document.getElementsByClassName('square'));

  UIHelpers.setBoard();
  UIHelpers.setScores();
  
});