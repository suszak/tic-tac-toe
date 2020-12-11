import React, { useEffect } from "react";
import "./Tables.scss";
import TablesOverview from "../../components/TablesOverview/TablesOverview.js";
import Ranking from "../../components/Ranking/Ranking";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";
import { checkIfUserIsLogged } from "../../helpers/checkIfUserIsLogged";

function Tables() {
  const user = useSelector((state) => state.user);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfUserIsLogged(history, dispatch);
    if (!localStorage.getItem("userName")) {
      history.replace("/");

      store.addNotification({
        title: "User not logged!",
        message: "First log in.",
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tablesWrapper">
      <nav className="tablesWrapper__menu">
        {user.isAdmin ? (
          <button
            className="menuButton"
            onClick={() => {
              history.push("/adminPanel");
            }}
          >
            Admin Panel
          </button>
        ) : (
          ""
        )}
        <LogoutButton />
      </nav>
      <TablesOverview />
      <Ranking />
    </div>
  );
}

export default Tables;
