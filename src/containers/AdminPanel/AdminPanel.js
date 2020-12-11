import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import "./AdminPanel.scss";
import axios from "../../axios";
import * as userActions from "../../actions/userActions";
import * as usersListActions from "../../actions/usersListActions";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import UsersList from "../../components/UsersList/UsersList";

function AdminPanel() {
  const user = useSelector((state) => state.user);
  const usersList = useSelector((state) => state.usersList);

  const history = useHistory();
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    return await axios.get("/getUsers");
  };

  const getAdminStatus = async (userName) => {
    const body = {
      userName,
    };
    return await axios.post("/getAdminStatus", body);
  };

  useEffect(() => {
    if (!user.login && localStorage.getItem("userName")) {
      getAdminStatus(localStorage.getItem("userName")).then((res) => {
        if (res !== undefined) {
          if (!res.data.error) {
            // get admin status without errors
            dispatch(
              userActions.LoginUser(
                localStorage.getItem("userName"),
                res.data.isAdmin
              )
            );
            if (!res.data.isAdmin) {
              // User logged, but it's not admin
              store.addNotification({
                title: "Access denied!",
                message: "Sorry, you don't have admin power.",
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
              history.replace("/tables");
            } else {
              // Download users list
            }
          } else {
            // Something went wrong, when getting admin status
            store.addNotification({
              title: "Something went wrong!",
              message: res.error,
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
            localStorage.clear();
            history.replace("/");
          }
        }
      });
    }

    // get all users from database
    if (user.isAdmin) {
      getAllUsers().then((response) => {
        if (response !== undefined) {
          if (!response.data.error) {
            // Users get, update state
            dispatch(usersListActions.updateList(response.data));
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="adminPanel">
      <nav className="adminPanel__menu">
        <button
          className="menuButton"
          onClick={() => {
            history.push("/tables");
          }}
        >
          Tables
        </button>

        <LogoutButton />
      </nav>

      {/* Users list */}
      <main className="adminPanel__main">
        <h1 className="mainHeader">Admin Panel</h1>
        <UsersList allUsers={usersList} />
      </main>
    </div>
  );
}

export default AdminPanel;
