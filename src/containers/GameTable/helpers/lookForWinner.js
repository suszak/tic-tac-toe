import { checkWinner } from "./checkWinner";

export const lookForWinner = ({
  gameEnd,
  tables,
  id,
  gameTable,
  setWinner,
  tableInfo,
  setGameEnd,
  user,
  socketRef,
}) => {
  if (!gameEnd && tables[id - 1].user1 !== "" && tables[id - 1].user2 !== "") {
    const user1Winner = checkWinner(gameTable, 1);
    const user2Winner = checkWinner(gameTable, 2);

    if (user1Winner.isWinner) {
      setWinner(tableInfo.user1);
      setGameEnd(true);

      const squares = document.querySelectorAll(".square");
      const winnerSquares = [
        squares[user1Winner.winnerFields[0]],
        squares[user1Winner.winnerFields[1]],
        squares[user1Winner.winnerFields[2]],
      ];

      winnerSquares.forEach((el) => el.classList.add("square-win"));

      if (user.login === tableInfo.user1) {
        socketRef.emit("gameEnded", {
          winner: tableInfo.user1,
          loser: tableInfo.user2,
          winnerPoints: tableInfo.user1RankPoints,
          loserPoints: tableInfo.user2RankPoints,
        });
      }
    } else if (user2Winner.isWinner) {
      setWinner(tableInfo.user2);
      setGameEnd(true);

      const squares = document.querySelectorAll(".square");
      const winnerSquares = [
        squares[user2Winner.winnerFields[0]],
        squares[user2Winner.winnerFields[1]],
        squares[user2Winner.winnerFields[2]],
      ];

      winnerSquares?.forEach((el) => el.classList.add("square-win"));

      if (user.login === tableInfo.user1) {
        socketRef.emit("gameEnded", {
          winner: tableInfo.user2,
          loser: tableInfo.user1,
          winnerPoints: tableInfo.user2RankPoints,
          loserPoints: tableInfo.user1RankPoints,
        });
      }
    } else if (user1Winner.tableIsFull) {
      setGameEnd(true);
    }
  }
};
