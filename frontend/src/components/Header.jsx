import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
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
        <Button variant="text" className="header__button">
          CREAR CUENTA
          </Button>
        <Button variant="contained" color="primary" className="header__button header__button--login">
          INICIAR SESIÓN
        </Button>
      </div>
    </header>
  );
};

export default Header;
