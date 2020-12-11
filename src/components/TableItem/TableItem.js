import React, { useState } from "react";
import { store } from "react-notifications-component";
import { useDispatch } from "react-redux";
import "./TableItem.scss";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "../../axios";
import * as usersListActions from "../../actions/usersListActions";

function TableItem({ userLogin, isAdmin }) {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    return await axios.get("/getUsers");
  };

  const updateUsersList = () => {
    getAllUsers().then((response) => {
      if (!response.data.error) {
        dispatch(usersListActions.updateList(response.data));
      }
    });
  };

  const handlePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const changePassword = async (userLogin, newPassword) => {
    const body = {
      userLogin: userLogin,
      newPassword: newPassword,
    };

    return await axios.put("/changePassword", body);
  };

  const passwordChanged = (userLogin, newPassword) => {
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
      changePassword(userLogin, newPassword).then((response) => {
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
          updateUsersList();
        }
      });
    }
  };

  const deleteUser = async (userLogin) => {
    const body = {
      userLogin: userLogin,
    };

    return await axios.put("/deleteUser", body);
  };

  const userDeleted = (userLogin) => {
    deleteUser(userLogin).then((response) => {
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
        updateUsersList();
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

  const changeAdminStatus = async (userLogin, isAdmin) => {
    const body = {
      userLogin: userLogin,
      isAdmin: !isAdmin,
    };

    return await axios.put("/changeAdminStatus", body);
  };

  const adminStatusChanged = (userLogin, isAdmin) => {
    changeAdminStatus(userLogin, isAdmin).then((response) => {
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
        updateUsersList();
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

  return (
    <div className="tableItem">
      <p className="tableItem__element">{userLogin}</p>
      <p className="tableItem__element">
        {isAdmin ? (
          <CheckCircleOutlineIcon className="admin" />
        ) : (
          <HighlightOffIcon className="noAdmin" />
        )}
        <button
          className="button"
          onClick={() => adminStatusChanged(userLogin, isAdmin)}
        >
          Change
        </button>
      </p>
      <p className="tableItem__element">
        <input
          type="text"
          className="input"
          placeholder="Type new password..."
          onChange={handlePassword}
          value={newPassword}
        ></input>
        <button
          className="button"
          onClick={() => passwordChanged(userLogin, newPassword)}
        >
          Save
        </button>
      </p>
      <p className="tableItem__element">
        <button className="button" onClick={() => userDeleted(userLogin)}>
          Delete user
        </button>
      </p>
    </div>
  );
}

export default TableItem;
