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
  },

  askUserOnEffects: function() {
    state.speciaEffects = false;
    var answer = window.prompt('Do you want to keep some special effects? [y/N]', 'N');
    if (answer.toLowerCase().substring(0, 1) === 'y') {
      state.speciaEffects = true;
    }
  },

  updateTurn: function() {
    document.getElementsByClassName('turn')[0].innerText = `${state.players[state.currentPlayer].name}'s turn`;
  }

};