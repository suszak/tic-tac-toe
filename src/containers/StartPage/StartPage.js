import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./StartPage.scss";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { useHistory } from "react-router-dom";
import { checkIfUserIsLogged } from "../../helpers/checkIfUserIsLogged";

function StartPage() {
  const form = useSelector((state) => state.form);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfUserIsLogged(history, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="startPage">
      {form.formType === "login" ? <Login /> : <Register />}
    </div>
  );
}

export default StartPage;
