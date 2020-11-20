import React from "react";
import "./Header.scss";
import Logo from "../../pictures/icon.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="TicTacToe Logo" />
      <h1 className="header__title">Tic Tac Toe</h1>
      <h3 className="header__subtitle">online game</h3>
    </header>
  );
}

export default Header;
