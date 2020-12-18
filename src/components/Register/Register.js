import "./Register.scss";

import * as formActions from "../../actions/formActions.js";
import { checkRegisterSuccess } from "./helpers/checkRegisterSuccess";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Tooltip from "rc-tooltip";

import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "rc-tooltip/assets/bootstrap.css";

function Register() {
  const dispatch = useDispatch();
  const [visibilityFirst, setVisibilityFirst] = useState(false);
  const [visibilitySecond, setVisibilitySecond] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Handle state
  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordRepeated = (event) => {
    setPasswordRepeated(event.target.value);
  };

  useEffect(() => {
    // Form validation
    if (
      login !== "" &&
      password.length >= 6 &&
      passwordRepeated === password &&
      passwordRepeated.length >= 6
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

    if (password.length < 6 && password !== "") {
      document.querySelector("#formPassword").classList.add("error");
    } else {
      document.querySelector("#formPassword").classList.remove("error");
    }

    if (
      (passwordRepeated !== password || passwordRepeated.length < 6) &&
      passwordRepeated !== ""
    ) {
      document.querySelector("#formPasswordRepeated").classList.add("error");
    } else {
      document.querySelector("#formPasswordRepeated").classList.remove("error");
    }
  }, [login, password, passwordRepeated]);

  return (
    <section className="register">
      <h3 className="register__header">Register</h3>
      <form
        className="form"
        onSubmit={(e) => checkRegisterSuccess({ e, login, password, dispatch })}
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

        <Tooltip
          placement="right"
          overlay={<span>Minimum 6 characters!</span>}
          visible={password && password.length < 6 ? true : false}
          animation="zoom"
        >
          <section className="form__password">
            <LockOpenIcon className="icon" />
            <input
              type={visibilityFirst ? "text" : "password"}
              id="formPassword"
              className="input"
              placeholder="password"
              value={password}
              onChange={handlePassword}
              required
            />
            {visibilityFirst ? (
              <VisibilityOffIcon
                className="visibilityIcon"
                onClick={() => setVisibilityFirst(false)}
              />
            ) : (
              <VisibilityIcon
                className="visibilityIcon"
                onClick={() => setVisibilityFirst(true)}
              />
            )}
          </section>
        </Tooltip>

        <Tooltip
          placement="right"
          overlay={<span>Passwords doesn't match!</span>}
          visible={
            passwordRepeated && passwordRepeated !== password ? true : false
          }
          animation="zoom"
        >
          <section className="form__password">
            <LockOpenIcon className="icon" />
            <input
              type={visibilitySecond ? "text" : "password"}
              id="formPasswordRepeated"
              className="input"
              placeholder="Repeat password"
              value={passwordRepeated}
              onChange={handlePasswordRepeated}
              required
            />
            {visibilitySecond ? (
              <VisibilityOffIcon
                className="visibilityIcon"
                onClick={() => setVisibilitySecond(false)}
              />
            ) : (
              <VisibilityIcon
                className="visibilityIcon"
                onClick={() => setVisibilitySecond(true)}
              />
            )}
          </section>
        </Tooltip>

        <button
          type="submit"
          className={buttonDisabled ? "form__button" : "form__button active"}
          disabled={buttonDisabled}
        >
          Register
        </button>
      </form>
      <ArrowBackIcon
        className="register__loginIcon"
        onClick={() => dispatch(formActions.changeFormType("login"))}
      />
    </section>
  );
}

export default Register;
