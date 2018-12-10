var board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

// name of the players
var playerOne = window.prompt('Enter the name of player one (X):', 'First Player');
var playerTwo = window.prompt('Enter the name of player two (O):', 'Second Player');

// value of each player playing
var players = [
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
];

var ties = 0;
var gameIsFinished = false;

var renderBoard = function() {
  console.log('hello')
};

// state variables
var turn = 0;
var currentPlayer = 0;


// check if anyone won the game
var checkIfWon = function(board, row, col) {
  var rowSum = board[row].reduce((total, el) => total  && players[currentPlayer].value === el, true);
  if (rowSum) {
    return true;
  }

  var colSum = board.reduce((total, row) => total && players[currentPlayer].value === row[col], true);
  if (colSum) {
    return true;
  }
    
  if (row + col === 2) {
    var sumSecDiagonal = board.reduce((total, row, index) => total && players[currentPlayer].value === row[2 - index], true);
    if (sumSecDiagonal) {
      return true;
    }
  }

  if (row === col) {
    var sumMainDiagonal = board.reduce((total, row, index) => total  && players[currentPlayer].value === row[index], true);
    if (sumMainDiagonal) {
      return true;
    }
  }

  return false;

};

var playTurn = function(square) {
  if (!gameIsFinished) {
    turn++;
    var [row, col] = square.classList[1].split('').map(el => Number(el));
    var value = players[currentPlayer].value;

    // render the board to the UI
    square.innerText = players[currentPlayer].sign;

    board[row][col] = value;
    if (checkIfWon(board, row, col)) {

      setTimeout(() => window.alert(`${players[currentPlayer].name} won the game!`), 0);
      players[currentPlayer].score++;
      currentPlayer = 0;
      return true;
    } else if (turn === 9) {
      window.alert('There was a tie!');
      ties++;
      currentPlayer = 0;
      return true;
    }

    currentPlayer = 1 - currentPlayer;
    return false;
  }
};

var resetGame = function() {
  // clean the board
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      board[i][j] = 0;
    }
  }

  // re-render the board to the UI
  for (var i = 0; i < board.length; i++) {
    for(var j = 0; j < board.length; j++) {
      var squareClass = '' + i + j;
      document.getElementsByClassName(squareClass).valueOf()[0].innerText = '';
    }
  }

  // reset state variables
  currentPlayer = 0;
  turn = 0;
  gameIsFinished = false;

  window.alert(`Let's play a new round!\n ${players[currentPlayer].name} starts as usual!`);
}

window.addEventListener( 'load', function( event ) {
    
  var $resetButton = document.getElementsByClassName('reset-button').valueOf()[0];
  $resetButton.addEventListener('click', resetGame);

  var $squares = Array.from(document.getElementsByClassName('square'));

  $squares.forEach(square => {
    square.addEventListener('click', (event) => {
      gameIsFinished = playTurn(event.target) || gameIsFinished;
    });
  });
  
});





