import React from "react";
import "./LogoutButton.scss";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { leaveTable } from "./../../helpers/leaveTable";
import * as userActions from "../../actions/userActions.js";
import * as socketActions from "../../actions/socketActions.js";
import axios from "../../axios.js";

function LogoutButton() {
  const dispatch = useDispatch();
  let history = useHistory();
  const user = useSelector((state) => state.user);
  const socketRef = useSelector((state) => state.socket.socketRef);
  const tables = useSelector((state) => state.tables.tables);

  const updateTables = async (body) => {
    return await axios.put("/updateTables/", body);
  };

  const logout = () => {
    const data = leaveTable(tables, user.login);
    updateTables(data).then(() => {
      socketRef.emit("tablesUpdated", data);
      dispatch(userActions.LogoutUser());
      localStorage.clear();

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
      socketRef.emit("logout");
      dispatch(socketActions.socketUnset());
      history.push("/");
    });
  };

  return (
    <button className="logoutButton" onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;
