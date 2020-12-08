import React, { useRef, useEffect } from "react";
import "./LogoutButton.scss";
import { io } from "socket.io-client";
// import axios from "../../axios.js";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { leaveTable } from "./../../helpers/leaveTable";
import * as userActions from "../../actions/userActions.js";

function LogoutButton() {
  const dispatch = useDispatch();
  const socketRef = useRef();
  let history = useHistory();
  const user = useSelector((state) => state.user);
  const tables = useSelector((state) => state.tables.tables);

  const logout = () => {
    const newTables = leaveTable(tables, user.login);
    socketRef.current.emit("tablesUpdated", newTables);
    dispatch(userActions.LogoutUser());

    store.addNotification({
      title: "Logout!",
      message: "Successful logout.",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
    history.push("/");
  };

  useEffect(() => {
    if (user.login) {
      const room = "tables";
      socketRef.current = io("http://localhost:8001", {
        query: { room },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button className="logoutButton" onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;
