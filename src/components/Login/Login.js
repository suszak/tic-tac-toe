import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Login.scss";
import * as formTypes from "../../types/formTypes";
import * as userTypes from "../../types/userTypes";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import axios from "../../axios.js";

function Login() {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const loginUser = async () => {
    const body = {
      login: login,
      password: password,
    };
    return await axios.post("/login/", body);
  };

  const checkSuccess = () => {
    loginUser().then((response) => {
      if (response.data.error) {
        dispatch({ type: userTypes.SET_ERROR, error: response.data.error });
      } else {
        dispatch({ type: userTypes.LOGGED_IN, login: response.data.userLogin });
      }
    });
  };

  useEffect(() => {
    if (login !== "" && password !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [login, password]);

  return (
    <section className="login">
      <h3 className="login__header">Login</h3>
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
          onClick={checkSuccess}
        >
          Login
        </button>
      </div>
      <PersonAddIcon
        className="login__registerIcon"
        onClick={() =>
          dispatch({ type: formTypes.TYPE_CHANGED, newFormType: "register" })
        }
      />
    </section>
  );
}

export default Login;
