// name of the players (user input)
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

  currentPlayer: 0

};

// UI helper functions
var UIHelpers = {

  updateSquare: function(square) {
    square.innerText = state.players[state.currentPlayer].sign;
  },

  emptyBoard: function() {
    for (var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        var squareClass = '' + i + j;
        document.getElementsByClassName(squareClass).valueOf()[0].innerText = '';
      }
    }
  },

  alertNewGame: function() {
    window.alert(`Let's play a new round!\n ${state.players[state.currentPlayer].name} starts (since he won last time or was the one to play next)!`);
  },

  alertGameWon: function() {
    setTimeout(() => window.alert(`${state.players[state.currentPlayer].name} won the game!`), 0);
  },

  alertTie: function() {
    setTimeout(() => window.alert('There was a tie!'), 0);
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
      player.innerText = state.players[index].name + ` (${state.players[index].sign})`;
      UIHelpers.updateScore(index);
    });
    UIHelpers.updateTies();
  }

};


// check if anyone won the game
var checkIfWon = function(row, col) {
  var rowSum = state.board[row].reduce((total, el) => total  && state.players[state.currentPlayer].value === el, true);
  if (rowSum) {
    return true;
  }

  var colSum = state.board.reduce((total, row) => total && state.players[state.currentPlayer].value === row[col], true);
  if (colSum) {
    return true;
  }
    
  if (row + col === 2) {
    var sumSecDiagonal = state.board.reduce((total, row, index) => total && state.players[state.currentPlayer].value === row[2 - index], true);
    if (sumSecDiagonal) {
      return true;
    }
  }

  if (row === col) {
    var sumMainDiagonal = state.board.reduce((total, row, index) => total  && state.players[state.currentPlayer].value === row[index], true);
    if (sumMainDiagonal) {
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

      UIHelpers.alertGameWon();
      UIHelpers.updateScore(state.currentPlayer);
      
      return true;
    } else if (state.turn === 9) {
      state.ties++;

      UIHelpers.alertTie();
      UIHelpers.updateTies();

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

  state.gameIsFinished = false;
}

window.addEventListener( 'load', function(event) {
    
  UIHelpers.setResetButton();

  var $squares = Array.from(document.getElementsByClassName('square'));

  UIHelpers.setBoard();
  UIHelpers.setScores();
  
});





