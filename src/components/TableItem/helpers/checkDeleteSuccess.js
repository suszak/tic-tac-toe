import axios from "../../../axios";
import { store } from "react-notifications-component";

import { updateUsersList } from "./updateUsersList";

const deleteUser = async ({ userLogin }) => {
  const body = {
    userLogin: userLogin,
  };

  return await axios.put("/deleteUser", body);
};

export const checkDeleteSuccess = ({ userLogin, dispatch }) => {
  deleteUser({ userLogin }).then((response) => {
    if (!response.data.error) {
      store.addNotification({
        title: "User deleted!",
        message: `${userLogin} deleted!`,
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
      updateUsersList({ dispatch });
    } else {
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
