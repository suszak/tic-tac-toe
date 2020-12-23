export const playAgain = async ({
  setTableInfo,
  setGameTable,
  setWinner,
  setGameEnd,
  setTurn,
  tables,
  id,
}) => {
  // Reset all variables and state to default
  setTableInfo({});
  setGameTable([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  setGameEnd(false);
  setWinner("");
  setTurn(0);

  setTableInfo({
    user1: tables[id - 1].user1,
    user2: tables[id - 1].user2,
    user1RankPoints: tables[id - 1].user1RankPoints,
    user2RankPoints: tables[id - 1].user2RankPoints,
    ready:
      tables[id - 1].user1 !== "" && tables[id - 1].user2 !== "" ? true : false,
  });

  return true;
};
