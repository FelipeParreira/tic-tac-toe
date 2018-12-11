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

  lastWon: false,

  speciaEffects: false

};