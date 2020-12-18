import { store } from "react-notifications-component";

import * as formActions from "../../../actions/formActions.js";
import axios from "../../../axios";

const registerUser = async ({ e, login, password }) => {
  e.preventDefault();
  const body = {
    login: login,
    password: password,
  };

  return await axios.post("/register/", body);
};

export const checkRegisterSuccess = ({ e, login, password, dispatch }) => {
  registerUser({ e, login, password }).then((response) => {
    if (response.data.registered) {
      // Success
      dispatch(formActions.changeFormType("login"));
      store.addNotification({
        title: "Register success!",
        message: "Now you can log in",
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
    } else {
      // Error
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
