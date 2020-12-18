import "./LogoutButton.scss";

import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "./helpers/logout";

function LogoutButton() {
  const dispatch = useDispatch();
  let history = useHistory();
  const user = useSelector((state) => state.user);
  const socketRef = useSelector((state) => state.socket.socketRef);
  const tables = useSelector((state) => state.tables.tables);

  return (
    <button
      className="logoutButton"
      onClick={() => logout({ tables, user, socketRef, dispatch, history })}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
