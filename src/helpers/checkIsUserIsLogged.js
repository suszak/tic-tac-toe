import * as userActions from "../actions/userActions.js";
import axios from "../axios.js";

const getAdminStatus = async (userName) => {
  const body = {
    userName: userName,
  };
  return await axios.post("/getAdminStatus", body);
};

export const checkIfUserIsLogged = async (history, dispatch) => {
  if (localStorage.getItem("userName")) {
    getAdminStatus(localStorage.getItem("userName")).then((response) => {
      if (!response.data.error) {
        dispatch(
          userActions.LoginUser(
            localStorage.getItem("userName"),
            response.data.isAdmin
          )
        );
        history.replace("/tables");
        return true;
      } else {
        localStorage.clear();
        return true;
      }
    });
  }
  return true;
};
