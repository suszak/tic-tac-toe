import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Register.scss";
import * as formTypes from "../../types/formTypes";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Register() {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);

  return (
    <section className="register">
      <h3 className="register__header">Register</h3>
      <form className="form">
        <section className="form__nickname">
          <PersonIcon className="icon" />
          <input
            type="text"
            id="formNickname"
            className="input"
            placeholder="login"
          />
        </section>

        <section className="form__password">
          <LockOpenIcon className="icon" />
          <input
            type={visibility ? "text" : "password"}
            id="formPassword"
            className="input"
            placeholder="password"
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

        <section className="form__password">
          <LockOpenIcon className="icon" />
          <input
            type={visibility ? "text" : "password"}
            id="formRepeatedPassword"
            className="input"
            placeholder="Repeat password"
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

        <button type="submit" className="form__button">
          Register
        </button>
      </form>
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
