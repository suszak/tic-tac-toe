import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GameTable.scss";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { randomBeginner } from "./helpers/randomBeginner";
import { usePrevious } from "../../helpers/usePrevious";
import { setGameSymbol } from "../../helpers/setGameSymbol";

function Table() {
  const { id } = useParams();
  const [tableInfo, setTableInfo] = useState({});
  const [turn, setTurn] = useState(0);
  const [userNumber, setUserNumber] = useState(0);
  const user = useSelector((state) => state.user);
  const tables = useSelector((state) => state.tables.tables);
  const socketRef = useSelector((state) => state.socket.socketRef);
  const history = useHistory();

  const prevTableInfo = usePrevious(tableInfo);

  useEffect(() => {
    if (user.login) {
      //  socket events
      socketRef.on("newTurn", (data) => {
        // console.log(data);
        setTurn(data);
      });

      socketRef.on("tableChanged", (data) => {
        // console.log(data);
        setTurn(data.turn);
        setTableInfo({
          ...tableInfo,
          gameTable: data.gameTable,
        });
      });

      //  Set userNumber
      if (user.login === tables[id - 1].user1) {
        setUserNumber(1);
      }
      if (user.login === tables[id - 1].user2) {
        setUserNumber(2);
      }

      // Check if both players are ready to game
      let newReady = false;
      if (tables[id - 1].user1 !== "" && tables[id - 1].user2 !== "") {
        newReady = true;

        if (
          tables[id - 1].user1 === user.login &&
          prevTableInfo.ready === false
        ) {
          const beginner = randomBeginner();
          setTurn(beginner);

          // Send information about beginner
          socketRef.emit("newTurn", { room: "table" + id, turn: beginner });
        }
      } else {
        // setTurn(0);
        newReady = false;
      }
      // Set local table informations
      setTableInfo({
        user1: tables[id - 1].user1,
        user2: tables[id - 1].user2,
        user1RankPoints: tables[id - 1].user1RankPoints,
        user2RankPoints: tables[id - 1].user2RankPoints,
        gameTable: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ready: newReady,
      });
    } else {
      history.replace("/tables");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables]);

  return (
    <div className="gameTable">
      <nav className="gameTable__menu">
        <button
          className="menuButton"
          onClick={() => {
            socketRef.emit("leaveTable", { room: "table" + id });
            history.replace("/tables");
          }}
        >
          Leave Game
        </button>

        <LogoutButton />
      </nav>

      <div className="gameField">
        <header className="gameField__header">
          <h3 className="user1">
            <CloseIcon className="icon" />
            {tableInfo.user1 !== ""
              ? `${tableInfo.user1}(${tableInfo.user1RankPoints})`
              : "empty"}
          </h3>
          <h3 className="separator">vs.</h3>
          <h3 className="user2">
            <RadioButtonUncheckedIcon className="icon" />
            {tableInfo.user2 !== ""
              ? `${tableInfo.user2}(${tableInfo.user2RankPoints})`
              : "empty"}
          </h3>
        </header>
        <h3 className="gameField__turn">
          {tableInfo.ready
            ? turn === 1
              ? "Turn: " + tableInfo.user1
              : "Turn: " + tableInfo.user2
            : ""}
        </h3>

        {tableInfo.ready ? (
          <main className="gameField__main">
            {tableInfo.gameTable.map((el, index) => {
              return (
                <div
                  className={
                    el === 0 && turn === userNumber
                      ? "square square-active"
                      : "square"
                  }
                  onClick={
                    el === 0 && turn === userNumber
                      ? () => {
                          let newGameTable = [...tableInfo.gameTable];
                          newGameTable[index] = userNumber;
                          setTableInfo({
                            ...tableInfo,
                            gameTable: [...newGameTable],
                          });
                          setTurn((turn % 2) + 1);
                          socketRef.emit("tableChanged", {
                            room: "table" + id,
                            turn: (turn % 2) + 1,
                            gameTable: newGameTable,
                          });
                        }
                      : () => {}
                  }
                  key={index}
                >
                  {setGameSymbol(el)}
                </div>
              );
            })}
          </main>
        ) : (
          <h3 className="gameField__information">Waiting for opponent...</h3>
        )}
      </div>
    </div>
  );
}

export default Table;
