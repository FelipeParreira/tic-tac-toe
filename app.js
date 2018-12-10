// name of the players
var playerOne = window.prompt('Enter the name of player one (X):', 'First Player');
var playerTwo = window.prompt('Enter the name of player two (O):', 'Second Player');

var state = {

  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],

  players: [
    {
      name: playerOne,
      value: 1,
      sign: 'X',
      score: 0
    },

    {
      name: playerTwo,
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

    // render the board to the UI
    square.innerText = state.players[state.currentPlayer].sign;

    state.board[row][col] = value;

    if (checkIfWon(row, col)) {
      setTimeout(() => window.alert(`${state.players[state.currentPlayer].name} won the game!`), 0);
      state.players[state.currentPlayer].score++;
      document.getElementsByClassName('score-' + (1 + state.currentPlayer))[0].innerText = '' + state.players[state.currentPlayer].score;
      return true;
    } else if (state.turn === 9) {
      setTimeout(() => window.alert('There was a tie!'), 0);
      state.ties++;
      document.getElementsByClassName('ties-score')[0].innerText = '' + state.ties;
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
  for (var i = 0; i < state.board.length; i++) {
    for(var j = 0; j < state.board.length; j++) {
      var squareClass = '' + i + j;
      document.getElementsByClassName(squareClass).valueOf()[0].innerText = '';
    }
  }

  // reset state variables
  state.turn = 0;

  window.alert(`Let's play a new round!\n ${state.players[state.currentPlayer].name} starts (since he won last time or was the one to play next)!`);

  state.gameIsFinished = false;
}

window.addEventListener( 'load', function(event) {
    
  var $resetButton = document.getElementsByClassName('reset-button').valueOf()[0];
  $resetButton.addEventListener('click', resetGame);

  var $squares = Array.from(document.getElementsByClassName('square'));

  // many event Listeners for the board (the foll. commmented lines can be deleted)
  // $squares.forEach(square => {
  //   square.addEventListener('click', (event) => {
  //     gameIsFinished = playTurn(event.target) || gameIsFinished;
  //   });
  // });

  var $board = document.getElementsByClassName('board')[0];
  $board.addEventListener('click', event => {
    state.gameIsFinished = playTurn(event.target) || state.gameIsFinished;
  })

  var $players = Array.from(document.getElementsByClassName('player'));
  $players.forEach((player, index) => player.innerText = state.players[index].name + ` (${state.players[index].sign})`);
  
});





