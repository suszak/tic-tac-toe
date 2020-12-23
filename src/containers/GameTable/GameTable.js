import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GameTable.scss";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { checkWinner } from "./helpers/checkWinner";
import { setGameSymbol } from "../../helpers/setGameSymbol";
import { chooseBeginner } from "./helpers/chooseBiginner";
import { playAgain } from "./helpers/playAgain";

function GameTable() {
  const { id } = useParams();
  const [tableInfo, setTableInfo] = useState({});
  const [gameTable, setGameTable] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(0);
  const [userNumber, setUserNumber] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState("");
  const user = useSelector((state) => state.user);
  const tables = useSelector((state) => state.tables.tables);
  const socketRefRedux = useSelector((state) => state.socket.socketRef);
  const history = useHistory();

  const sendFirstTurn = () => {
    if (user.login === tableInfo.user1) {
      if (tableInfo.user1 !== "" && tableInfo.user2 !== "" && turn === 0) {
        const newTurn = chooseBeginner();
        setTurn(newTurn);
        setGameTable([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        socketRefRedux.emit("newTurnInc", {
          room: "table" + id,
          turn: newTurn,
          gameTable: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      }
    }
  };

  const bindUserNumber = () => {
    if (user.login === tables[id - 1].user1) {
      setUserNumber(1);
    }
    if (user.login === tables[id - 1].user2) {
      setUserNumber(2);
    }
  };

  // Call once on sturtup
  useEffect(
    () => {
      if (user.login) {
        socketRefRedux.on("userJoined", (data) => {
          if (data.room === "table" + id) {
            sendFirstTurn();
          }
        });

        socketRefRedux.on("newTurn", (data) => {
          if (data.room === "table" + id) {
            setTurn(data.newTurn);
            setGameTable(data.gameTable);
          }
        });

        socketRefRedux.on("playAgain", (data) => {
          if (data.room === "table" + id) {
            const newTurn = chooseBeginner();
            setTurn(newTurn);
            setGameTable([0, 0, 0, 0, 0, 0, 0, 0, 0]);
            socketRefRedux.emit("newTurnInc", {
              room: "table" + id,
              turn: newTurn,
              gameTable: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            });
          }
        });
      } else {
        history.replace("/tables");
      }

      return () => {
        // cleanup
        socketRefRedux.removeAllListeners("newTurn");
        socketRefRedux.removeAllListeners("playAgain");
        socketRefRedux.removeAllListeners("userJoined");
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (
      !gameEnd &&
      tables[id - 1].user1 !== "" &&
      tables[id - 1].user2 !== ""
    ) {
      const user1Winner = checkWinner(gameTable, 1);
      const user2Winner = checkWinner(gameTable, 2);

      if (user1Winner.isWinner) {
        setWinner(tableInfo.user1);
        setGameEnd(true);
        setTurn(3);

        const squares = document.querySelectorAll(".square");
        const winnerSquares = [
          squares[user1Winner.winnerFields[0]],
          squares[user1Winner.winnerFields[1]],
          squares[user1Winner.winnerFields[2]],
        ];

        winnerSquares.forEach((el) => el.classList.add("square-win"));

        if (user.login === tableInfo.user1) {
          socketRefRedux.emit("gameEnded", {
            winner: tableInfo.user1,
            loser: tableInfo.user2,
            winnerPoints: tableInfo.user1RankPoints,
            loserPoints: tableInfo.user2RankPoints,
          });
        }
      } else if (user2Winner.isWinner) {
        setWinner(tableInfo.user2);
        setGameEnd(true);
        setTurn(3);

        const squares = document.querySelectorAll(".square");
        const winnerSquares = [
          squares[user2Winner.winnerFields[0]],
          squares[user2Winner.winnerFields[1]],
          squares[user2Winner.winnerFields[2]],
        ];

        winnerSquares?.forEach((el) => el.classList.add("square-win"));

        if (user.login === tableInfo.user1) {
          socketRefRedux.emit("gameEnded", {
            winner: tableInfo.user2,
            loser: tableInfo.user1,
            winnerPoints: tableInfo.user2RankPoints,
            loserPoints: tableInfo.user1RankPoints,
          });
        }
      } else if (user1Winner.tableIsFull) {
        setGameEnd(true);
        setTurn(3);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTable]);

  useEffect(() => {
    setTableInfo({
      user1: tables[id - 1].user1,
      user2: tables[id - 1].user2,
      user1RankPoints: tables[id - 1].user1RankPoints,
      user2RankPoints: tables[id - 1].user2RankPoints,
      ready:
        tables[id - 1].user1 !== "" && tables[id - 1].user2 !== ""
          ? true
          : false,
    });
    bindUserNumber();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables]);

  useEffect(() => {
    sendFirstTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableInfo]);

  return (
    <div className="gameTable">
      <nav className="gameTable__menu">
        <button
          className="menuButton"
          onClick={() => {
            socketRefRedux.emit("leaveTable", { room: "table" + id });
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
            {gameTable.map((el, index) => {
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
                          let newGameTable = [...gameTable];
                          newGameTable[index] = userNumber;
                          setGameTable(newGameTable);
                          setTurn((turn % 2) + 1);
                          socketRefRedux.emit("newTurnInc", {
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

        {gameEnd ? (
          <section className="gameField__infoBox">
            <div className="infoBox">
              <header className="infoBox__header">
                {winner !== "" ? `${winner} wins!` : "Draw!"}
              </header>
              <nav className="infoBox__menu">
                <button
                  className="button"
                  onClick={() => {
                    playAgain({
                      setTableInfo,
                      setGameTable,
                      setWinner,
                      setTurn,
                      setGameEnd,
                      tables,
                      id,
                    }).then(() => {
                      if (tableInfo.ready && user.login === tableInfo.user1) {
                        const newTurn = chooseBeginner();
                        setTurn(newTurn);
                        setGameTable([0, 0, 0, 0, 0, 0, 0, 0, 0]);
                        socketRefRedux.emit("newTurnInc", {
                          room: "table" + id,
                          turn: newTurn,
                          gameTable: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        });
                      }

                      if (tableInfo.ready && user.login === tableInfo.user2) {
                        socketRefRedux.emit("wannaPlayAgain", {
                          room: "table" + id,
                        });
                      }
                    });
                  }}
                >
                  Play again
                </button>
                <button
                  className="button"
                  onClick={() => {
                    socketRefRedux.emit("leaveTable", { room: "table" + id });
                    history.replace("/tables");
                  }}
                >
                  Leave
                </button>
              </nav>
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GameTable;
