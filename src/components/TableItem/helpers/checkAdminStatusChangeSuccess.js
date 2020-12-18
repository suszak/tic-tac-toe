import axios from "../../../axios";
import { store } from "react-notifications-component";
import { updateUsersList } from "./updateUsersList";

const changeAdminStatus = async ({ userLogin, isAdmin }) => {
  const body = {
    userLogin: userLogin,
    isAdmin: !isAdmin,
  };

  return await axios.put("/changeAdminStatus", body);
};

export const checkAdminStatusChangeSuccess = ({
  userLogin,
  isAdmin,
  dispatch,
}) => {
  changeAdminStatus({ userLogin, isAdmin }).then((response) => {
    if (!response.data.error) {
      store.addNotification({
        title: "Admin status changed!",
        message: `Admin status for user ${userLogin} successfully changed!`,
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
