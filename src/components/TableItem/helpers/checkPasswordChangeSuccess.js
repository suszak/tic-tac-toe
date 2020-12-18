import axios from "../../../axios";
import { store } from "react-notifications-component";
import { updateUsersList } from "./updateUsersList";

const changePassword = async ({ userLogin, newPassword }) => {
  const body = {
    userLogin: userLogin,
    newPassword: newPassword,
  };

  return await axios.put("/changePassword", body);
};

export const checkPasswordChangeSuccess = ({
  userLogin,
  newPassword,
  setNewPassword,
  dispatch,
}) => {
  if (newPassword.length < 6) {
    store.addNotification({
      title: "Something went wrong!",
      message: "Password must have at least 6 characters, try again!",
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
    return { error: "Password too short" };
  } else {
    // Modify database
    changePassword({ userLogin, newPassword }).then((response) => {
      if (!response.data.error) {
        setNewPassword("");
        store.addNotification({
          title: "Password changed!",
          message: `Password for user ${userLogin} successfully changed!`,
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
      }
    });
  }
};
