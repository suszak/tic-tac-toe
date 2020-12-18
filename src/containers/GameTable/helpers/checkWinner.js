export const checkWinner = (gameTable, userNumber) => {
  // Return: { isWinner: Bool, winnerFields: Array[3], tableIsFull: Bool }

  //   Winner combinations:
  //   0,1,2
  if (
    gameTable[0] === userNumber &&
    gameTable[1] === userNumber &&
    gameTable[2] === userNumber
  ) {
    return {
      isWinner: true,
      winnerFields: [0, 1, 2],
      tableIsFull: null,
    };
  }
  // 3,4,5
  if (
    gameTable[3] === userNumber &&
    gameTable[4] === userNumber &&
    gameTable[5] === userNumber
  ) {
    return {
      isWinner: true,
      winnerFields: [3, 4, 5],
      tableIsFull: null,
    };
  }

  // 6,7,8
  if (
    gameTable[6] === userNumber &&
    gameTable[7] === userNumber &&
    gameTable[8] === userNumber
  ) {
    return {
      isWinner: true,
      winnerFields: [6, 7, 8],
      tableIsFull: null,
    };
  }

  // 0,3,6
  if (
    gameTable[0] === userNumber &&
    gameTable[3] === userNumber &&
    gameTable[6] === userNumber
  ) {
    return {
      isWinner: true,
      winnerFields: [0, 3, 6],
      tableIsFull: null,
    };
  }

  // 1,4,7
  if (
    gameTable[1] === userNumber &&
    gameTable[4] === userNumber &&
    gameTable[7] === userNumber
  ) {
    return {
      isWinner: true,
      winnerFields: [1, 4, 7],
      tableIsFull: null,
    };
  }

  // 2,5,8
  if (
    gameTable[2] === userNumber &&
    gameTable[5] === userNumber &&
    gameTable[8] === userNumber
  ) {
    return {
      isWinner: true,
      winnerFields: [2, 5, 8],
      tableIsFull: null,
    };
  }

  // 0,4,8
  if (
    gameTable[0] === userNumber &&
    gameTable[4] === userNumber &&
    gameTable[8] === userNumber
  ) {
    return {
      isWinner: true,
      winnerFields: [0, 4, 8],
      tableIsFull: null,
    };
  }

  // 2,4,6
  if (
    gameTable[2] === userNumber &&
    gameTable[4] === userNumber &&
    gameTable[6] === userNumber
  ) {
    return {
      isWinner: true,
      winnerFields: [2, 4, 6],
      tableIsFull: null,
    };
  }

  //   Check if table is fullfilled:
  if (
    gameTable.findIndex((el) => {
      return el === 0;
    }) === -1
  ) {
    return {
      isWinner: false,
      winnerFields: [],
      tableIsFull: true,
    };
  }

  //   Free space on table, player doesn't win yet
  return {
    isWinner: false,
    winnerFields: [],
    tableIsFull: false,
  };
};
