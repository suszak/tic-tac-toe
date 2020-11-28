import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Tooltip from "rc-tooltip";
import "./Register.scss";
import * as formTypes from "../../types/formTypes";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "rc-tooltip/assets/bootstrap.css";
import axios from "../../axios.js";

function Register() {
  const dispatch = useDispatch();
  const [visibilityFirst, setVisibilityFirst] = useState(false);
  const [visibilitySecond, setVisibilitySecond] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState(null);
  const [passwordRepeated, setPasswordRepeated] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordRepeated = (event) => {
    setPasswordRepeated(event.target.value);
  };

  const registerUser = async () => {
    const body = {
      login: login,
      password: password,
    };
    const response = await axios.post("/register/", body);
    console.log(response);
  };

  useEffect(() => {
    if (
      login !== "" &&
      password !== "" &&
      passwordRepeated !== "" &&
      password &&
      passwordRepeated
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

    if (password) {
      if (password.length < 6) {
        document.querySelector("#formPassword").classList.add("error");
      } else {
        document.querySelector("#formPassword").classList.remove("error");
      }
    }

    if (passwordRepeated) {
      if (passwordRepeated !== password) {
        document.querySelector("#formPasswordRepeated").classList.add("error");
      } else {
        document
          .querySelector("#formPasswordRepeated")
          .classList.remove("error");
      }
    }
  }, [login, password, passwordRepeated]);

  return (
    <section className="register">
      <h3 className="register__header">Register</h3>
      <div className="form">
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
          className={buttonDisabled ? "form__button" : "form__button active"}
          disabled={buttonDisabled}
          onClick={registerUser}
        >
          Register
        </button>
      </div>
      <ArrowBackIcon
        className="register__loginIcon"
        onClick={() =>
          dispatch({ type: formTypes.TYPE_CHANGED, newFormType: "login" })
        }
      />
    </section>
  );
}

export default Register;
