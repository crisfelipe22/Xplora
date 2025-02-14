import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css"; 

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <div className="header__logo">
            <img src="/logo.svg"></img>
          </div>
          <span className="header__slogan">XPLORA</span>
        </Link>
      </div>
      <div className="header__right">
        <button className="header__button">
          CREAR CUENTA
          </button>
        <button className="header__button header__button--login">
          INICIAR SESIÓN
        </button>
      </div>
    </header>
  );
};

export default Header;
