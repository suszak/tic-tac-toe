import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as socketActions from "../../actions/socketActions.js";
import { io } from "socket.io-client";
import "./Header.scss";
import Logo from "../../pictures/icon.png";

function Header() {
  const dispatch = useDispatch();
  const socketRef = useRef();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const room = "tables";

    socketRef.current = io("https://pai-tic-tac-toe.herokuapp.com/", {
      query: { room },
      extraHeaders: { login: user.login },
    });

    dispatch(socketActions.socketSet(socketRef.current));
  }, []);

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="TicTacToe Logo" />
      <h1 className="header__title">Tic Tac Toe</h1>
      <h3 className="header__subtitle">online game</h3>
    </header>
  );
}

export default Header;
