import axios from "../../../axios";
import * as tablesActions from "../../../actions/tablesActions";

const getTables = async () => {
  return await axios.get("/getTables");
};

export const playAgain = ({
  setTableInfo,
  setGameTable,
  setUserNumber,
  setWinner,
  setGameEnd,
  setTurn,
  tables,
  id,
  bindUserNumberAndSetTurn,
  dispatch,
}) => {
  // Reset all variables and state to default
  setTableInfo({});
  setGameTable([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  setTurn(0);
  setUserNumber(0);
  setGameEnd(false);
  setWinner("");

  setTableInfo(
    {
      user1: tables[id - 1].user1,
      user2: tables[id - 1].user2,
      user1RankPoints: tables[id - 1].user1RankPoints,
      user2RankPoints: tables[id - 1].user2RankPoints,
      ready:
        tables[id - 1].user1 !== "" && tables[id - 1].user2 !== ""
          ? true
          : false,
    },
    bindUserNumberAndSetTurn()
  );

  getTables().then((response) => {
    if (!response.error) {
      dispatch(tablesActions.UpdateTables(response.data));
    }
  });
};
