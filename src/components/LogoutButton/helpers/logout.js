import { store } from "react-notifications-component";

import * as userActions from "../../../actions/userActions.js";
import * as socketActions from "../../../actions/socketActions.js";

import axios from "../../../axios.js";
import { leaveTable } from "./../../../helpers/leaveTable";

// Send put request which update tables id DB
const updateTables = async (body) => {
  return await axios.put("/updateTables/", body);
};

export const logout = ({ tables, user, socketRef, dispatch, history }) => {
  const data = leaveTable(tables, user.login);
  updateTables(data).then(() => {
    // Send info about change in tables
    socketRef.emit("tablesUpdate", data);

    // Clear stores
    dispatch(userActions.LogoutUser());
    localStorage.clear();
    // Show notify with success info
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
    // Send info via socket about logout
    socketRef.emit("logout");
    // Unset socketRef in redux store
    dispatch(socketActions.socketUnset());
    // Go to main page
    history.push("/");
  });
};
