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
    sign: 'X'
  },

  {
    name: playerTwo,
    value: 2,
    sign: 'O'
  }
];

var renderBoard = function() {
  console.log('hello')
};

// state variables
var turn = 0;
var currentPlayer = 0;


// check if anyone won the game
var checkIfWon = function(board, row, col) {
  var rowSum = board[row].reduce((total, el) => total + el, 0);
  if (rowSum !== 0 && rowSum % 3 === 0) {
    return true;
  }

  var colSum = board.reduce((total, row) => total + row[col], 0);
  if (colSum !== 0 && colSum % 3 === 0) {
    return true;
  }

  var sumSecDiagonal = 0;  
  if (row + col === 2) {
    sumSecDiagonal += board.reduce((total, row, index) => total + row[2 - index], 0);
    if (sumSecDiagonal !== 0 && sumSecDiagonal % 3 === 0) {
      return true;
    }
  }

  var sumMainDiagonal = 0;
  if (row === col) {
    sumMainDiagonal += board.reduce((total, row, index) => total + row[index], 0);
    if (sumMainDiagonal !== 0 && sumMainDiagonal % 3 === 0) {
      return true;
    }
  }

  return false;

};

var playTurn = function(square) {
  turn++;
  var [row, col] = square.classList[1].split('').map(el => Number(el));
  var value = players[currentPlayer].value;

  // render the board to the UI
  square.innerText = players[currentPlayer].sign;

  board[row][col] = value;
  if (checkIfWon(board, row, col)) {
    window.prompt(`${players[currentPlayer].name} won the game!`);
    return false;
  } else if (turn === 9) {
    window.prompt('There was a tie!');
    return false;
  }

  return true;
};

var resetGame = function(board) {
  // clean the board
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      board[i][j] = 0;
    }
  }

  // re-render the board to the UI

  window.prompt(`Let's play a new round!\n ${players.X.name} starts as usual!`);
}

window.addEventListener( 'load', function( event ) {
    
  var $resetButton = document.getElementsByClassName('reset-button').valueOf()[0];
  $resetButton.addEventListener('click', renderBoard);

  var $squares = Array.from(document.getElementsByClassName('square'));

  $squares.forEach(square => {
    square.addEventListener('click', (event) => {
      // plaTurn(event.target);
      // currentPlayer = 1 - currentPlayer;
      event.target.innerText = 'hello';
    });
  });
  
});





