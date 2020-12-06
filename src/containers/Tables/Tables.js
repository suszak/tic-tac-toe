import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import { io } from "socket.io-client";

import "./Tables.scss";
import axios from "../../axios.js";

function Tables() {
  const user = useSelector((state) => state.user);
  let history = useHistory();

  const [rankPoints, setRankPoints] = useState("updating...");
  const [tables, setTables] = useState([]);

  const getUserInfo = async () => {
    const body = {
      login: user.login,
    };
    return await axios.post("/userRank/", body);
  };

  const getTables = async () => {
    return await axios.get("/getTables");
  };

  const joinTable = (tableID, userNumber) => {
    let newTables = [...tables];
    if (userNumber === 1) {
      newTables[tableID - 1] = { ...newTables[tableID - 1], user1: user.login };
    } else {
      newTables[tableID - 1] = { ...newTables[tableID - 1], user2: user.login };
    }

    return newTables;
  };

  const socketRef = useRef();

  useEffect(() => {
    if (user.login) {
      getUserInfo().then((response) => {
        if (!response.error) {
          setRankPoints(response.data.rankPoints);
        }
      });

      getTables().then((response) => {
        if (!response.error) {
          setTables(response.data);
        }
      });

      const room = "tables";
      socketRef.current = io("http://localhost:8001", {
        query: { room },
      });

      socketRef.current.on("tablesUpdated", (tables) => {
        setTables(tables);
      });
    } else {
      history.push("/");

      store.addNotification({
        title: "User not logged!",
        message: "First log in.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tables">
      <header className="tables__header">
        <h1 className="headerFirstLine">
          Hello <span className="headerFirstLine__username">{user.login}</span>
        </h1>
        <h2 className="headerSecondLine">
          Your points:{" "}
          <span className="headerSecondLine__points">{rankPoints}</span>
        </h2>
      </header>

      <section className="tables__overview">
        {/* Show all tables */}
        <ul className="overviewTable">
          {tables?.length > 0 ? (
            <li
              className="overviewTable__header overviewTable__row"
              key="header"
            >
              <p className="overviewTable__number">Table number</p>
              <p className="overviewTable__player">player 1</p>
              <p className="overviewTable__player">player 2</p>
            </li>
          ) : (
            ""
          )}
          {tables?.length > 0
            ? tables.map((table) => {
                return (
                  <li className="overviewTable__row" key={table.id}>
                    <p className="overviewTable__number">Table {table.id}</p>
                    <p
                      className={
                        table.user1 === ""
                          ? "overviewTable__player overviewTable__player-empty"
                          : "overviewTable__player"
                      }
                      onClick={() => {
                        socketRef.current.emit(
                          "tablesUpdated",
                          joinTable(table.id, 1)
                        );
                      }}
                    >
                      {table.user1 === "" ? ">> join <<" : table.user1}
                    </p>
                    <p
                      className={
                        table.user2 === ""
                          ? "overviewTable__player overviewTable__player-empty"
                          : "overviewTable__player"
                      }
                      onClick={() => {
                        socketRef.current.emit(
                          "tablesUpdated",
                          joinTable(table.id, 2)
                        );
                      }}
                    >
                      {table.user2 === "" ? ">> join <<" : table.user2}
                    </p>
                  </li>
                );
              })
            : ""}
        </ul>
      </section>
    </div>
  );
}

export default Tables;
