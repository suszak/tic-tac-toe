import "./Login.scss";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as formActions from "../../actions/formActions.js";

import { checkLoginSuccess } from "./helpers/checkLoginSuccess";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [visibility, setVisibility] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Handle login in state
  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  // Handle password in state
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    // Check if inputs are filled
    if (login !== "" && password !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [login, password]);

  return (
    <section className="login">
      <h3 className="login__header">Login</h3>
      <form
        className="form"
        onSubmit={(e) =>
          checkLoginSuccess({ e, login, password, history, dispatch })
        }
      >
        <section className="form__nickname">
          <PersonIcon className="icon" />
          <input
            type="text"
            id="formNickname"
            className="input"
            placeholder="login"
            value={login}
            onChange={handleLogin}
            required
          />
        </section>

        <section className="form__password">
          <LockOpenIcon className="icon" />
          <input
            type={visibility ? "text" : "password"}
            id="formPassword"
            className="input"
            placeholder="password"
            value={password}
            onChange={handlePassword}
            required
          />
          {visibility ? (
            <VisibilityOffIcon
              className="visibilityIcon"
              onClick={() => setVisibility(false)}
            />
          ) : (
            <VisibilityIcon
              className="visibilityIcon"
              onClick={() => setVisibility(true)}
            />
          )}
        </section>

        <button
          className={buttonDisabled ? "form__button" : "form__button active"}
          disabled={buttonDisabled}
        >
          Login
        </button>
      </form>
      <PersonAddIcon
        className="login__registerIcon"
        onClick={() => dispatch(formActions.changeFormType("register"))}
      />
    </section>
  );
}

export default Login;
