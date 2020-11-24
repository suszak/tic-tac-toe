import React, { useState } from "react";
import "./Login.scss";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Login() {
  const [visibility, setVisibility] = useState(false);

  return (
    <section className="login">
      <h3 className="login__header">Login</h3>
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

        <button type="submit" className="form__button">
          Login
        </button>
      </form>
      <PersonAddIcon className="login__registerIcon" />
    </section>
  );
}

export default Login;
