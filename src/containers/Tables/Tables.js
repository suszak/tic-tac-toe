import React from "react";
import { useSelector } from "react-redux";
import "./Tables.scss";

function Tables() {
  const user = useSelector((state) => state.user);

  return (
    <div className="tables">
      <h1>Hello {user.login}</h1>
    </div>
  );
}

export default Tables;
