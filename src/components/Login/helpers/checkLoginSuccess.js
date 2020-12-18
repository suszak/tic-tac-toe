import { store } from "react-notifications-component";
import axios from "../../../axios.js";
import * as userActions from "../../../actions/userActions";

// Post login request to backend
const loginUser = async (e, login, password) => {
  e.preventDefault();
  const body = {
    login: login,
    password: password,
  };
  return await axios.post("/login", body);
};

// Check if logging in was successful
export const checkLoginSuccess = ({ e, login, password, history, dispatch }) => {
  //   send request and wait for response
  loginUser(e, login, password).then((response) => {
    if (response.data.logged) {
      // success - setup redux user, localstorage and go to tables site
      dispatch(
        userActions.LoginUser(response.data.userLogin, response.data.isAdmin)
      );
      localStorage.setItem("userName", response.data.userLogin);
      history.push("/tables");
    } else {
      // error - show notify with error
      store.addNotification({
        title: "Something went wrong!",
        message: response.data.error,
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
  });
};
