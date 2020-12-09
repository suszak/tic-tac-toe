import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { store } from "react-notifications-component";
import * as tablesActions from "../../actions/tablesActions.js";
import "./TablesOverview.scss";
import axios from "../../axios.js";
import { updateTableField } from "./../../helpers/updateTableField";

function Tables() {
  const dispatch = useDispatch();
  const socketRef = useRef();

  const user = useSelector((state) => state.user);
  const tables = useSelector((state) => state.tables.tables);

  const [rankPoints, setRankPoints] = useState("updating...");

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
    if (
      tables.find((item) => {
        return item.user1 === user.login || item.user2 === user.login;
      }) !== undefined
    ) {
      store.addNotification({
        title: "Can't join!",
        message: "You're already in game.",
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

      return tables;
    } else {
      return {
        userName: user.login,
        tableID: tableID,
        userNumber: userNumber,
        currentTables: tables,
      };
      // return updateTableField(user.login, tableID, userNumber, tables);
    }
  };

  useEffect(() => {
    if (user.login) {
      getUserInfo().then((response) => {
        if (!response.error) {
          setRankPoints(response.data.rankPoints);
        }
      });

      getTables().then((response) => {
        if (!response.error) {
          dispatch(tablesActions.UpdateTables(response.data));
        }
      });

      const room = "tables";
      socketRef.current = io("http://localhost:8001", {
        query: { room },
      });

      socketRef.current.on(
        "tablesUpdated",
        ({ userName, tableID, userNumber, currentTables }) => {
          dispatch(
            tablesActions.UpdateTables(
              updateTableField(userName, tableID, userNumber, currentTables)
            )
          );
        }
      );
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
                      onClick={
                        table.user1 === ""
                          ? () => {
                              socketRef.current.emit(
                                "tablesUpdated",
                                joinTable(table.id, 1)
                              );
                            }
                          : () => {}
                      }
                    >
                      {table.user1 === "" ? ">> join <<" : table.user1}
                    </p>
                    <p
                      className={
                        table.user2 === ""
                          ? "overviewTable__player overviewTable__player-empty"
                          : "overviewTable__player"
                      }
                      onClick={
                        table.user2 === ""
                          ? () => {
                              socketRef.current.emit(
                                "tablesUpdated",
                                joinTable(table.id, 2)
                              );
                            }
                          : () => {}
                      }
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
