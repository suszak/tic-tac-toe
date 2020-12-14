import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GameTable.scss";

function Table() {
  const { id } = useParams();
  const [tableInfo, setTableInfo] = useState({});
  const user = useSelector((state) => state.user);
  const tables = useSelector((state) => state.tables.tables);

  useEffect(() => {
    if (user.login) {
      setTableInfo({
        user1: tables[id - 1].user1,
        user2: tables[id - 1].user2,
        user1RankPoints: tables[id - 1].user1RankPoints,
        user2RankPoints: tables[id - 1].user2RankPoints,
        gameTable: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tables]);

  return (
    <div className="gameTable">
      <header className="gameTable__header">
        <h1 className="tableIdentifier">Table {id}</h1>
        <h3 className="user1">
          {tableInfo.user1 !== ""
            ? `${tableInfo.user1}(${tableInfo.user1RankPoints})`
            : "empty"}
        </h3>
        <h3 className="separator">-</h3>
        <h3 className="user2">
          {tableInfo.user2 !== ""
            ? `${tableInfo.user2}(${tableInfo.user2RankPoints})`
            : "empty"}
        </h3>
      </header>
    </div>
  );
}

export default Table;
