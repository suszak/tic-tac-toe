import "./TablesOverview.scss";

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTableField } from "./../../helpers/updateTableField";

import { io } from "socket.io-client";
import * as tablesActions from "../../actions/tablesActions.js";
import * as socketActions from "../../actions/socketActions.js";
import axios from "../../axios.js";
import { joinTable } from "./helpers/joinTable";
import { updateTables } from "./helpers/updateTables";

function Tables() {
  const dispatch = useDispatch();
  const socketRef = useRef();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const tables = useSelector((state) => state.tables.tables);

  const [rankPoints, setRankPoints] = useState("updating...");

  const getUserInfo = async () => {
    const body = {
      login: user.login,
    };
    return await axios.post("/userRank", body);
  };

  const getTables = async () => {
    return await axios.get("/getTables");
  };

  useEffect(() => {
    const room = "tables";

    socketRef.current = io("http://localhost:8002", {
      query: { room },
      extraHeaders: { login: user.login },
    });

    dispatch(socketActions.socketSet(socketRef.current));

    socketRef.current.on(
      "tablesUpdated",
      ({
        userName,
        rankPoints,
        tableID,
        userNumber,
        currentTables,
        changed,
      }) => {
        if (changed && rankPoints !== "updating...") {
          dispatch(
            tablesActions.UpdateTables(
              updateTableField({
                userName,
                tableID,
                userNumber,
                rankPoints,
                currentTables,
              })
            )
          );
        }
      }
    );

    socketRef.current.on("userDisconnected", () => {
      getTables().then((response) => {
        if (!response.error) {
          dispatch(tablesActions.UpdateTables(response.data));
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.login]);

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
        {/* Show all game tables */}
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
                              const data = joinTable({
                                tableID: table.id,
                                userNumber: 1,
                                tables,
                                user,
                                rankPoints,
                              });
                              if (data.changed) {
                                socketRef.current.emit("joinGame", {
                                  room: "table" + table.id,
                                });

                                updateTables({
                                  userNumber: 1,
                                  userName: user.login,
                                  rankPoints: rankPoints,
                                  tableID: table.id,
                                }).then((response) => {
                                  if (response.data.updated) {
                                    socketRef.current.emit(
                                      "tablesUpdated",
                                      data
                                    );
                                    history.replace(`/table/${table.id}`);
                                  }
                                });
                              }
                            }
                          : () => {}
                      }
                    >
                      {table.user1 === ""
                        ? ">> join <<"
                        : `${table.user1}(${table.user1RankPoints})`}
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
                              const data = joinTable({
                                tableID: table.id,
                                userNumber: 2,
                                tables,
                                user,
                                rankPoints,
                              });
                              if (data.changed) {
                                socketRef.current.emit("joinGame", {
                                  room: "table" + table.id,
                                });

                                updateTables({
                                  userNumber: 2,
                                  userName: user.login,
                                  rankPoints: rankPoints,
                                  tableID: table.id,
                                }).then((response) => {
                                  if (response.data.updated) {
                                    socketRef.current.emit(
                                      "tablesUpdated",
                                      data
                                    );
                                    history.replace(`/table/${table.id}`);
                                  }
                                });
                              }
                            }
                          : () => {}
                      }
                    >
                      {table.user2 === ""
                        ? ">> join <<"
                        : `${table.user2}(${table.user2RankPoints})`}
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
