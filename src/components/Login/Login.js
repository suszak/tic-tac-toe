import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import * as formActions from "../../actions/formActions.js";
import * as userActions from "../../actions/userActions.js";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import axios from "../../axios.js";

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
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

  const loginUser = async (e) => {
    e.preventDefault();
    const body = {
      login: login,
      password: password,
    };
    return await axios.post("/login/", body);
  };

  const checkSuccess = (e) => {
    loginUser(e).then((response) => {
      if (response.data.logged) {
        // success
        dispatch(
          userActions.LoginUser(response.data.userLogin, response.data.isAdmin)
        );
        history.push("/tables");
      } else {
        // error
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
      <form className="form" onSubmit={checkSuccess}>
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
