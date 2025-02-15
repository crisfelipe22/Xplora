import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import styles from "../styles/header.module.css"; 

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__brand}>
        <Link to="/" className={styles.header__logo}>
          <div className={styles.header__logo}>
            <img src="/logo.svg"></img>
          </div>
          <span className={styles.header__slogan}>
            XPLORA</span>
        </Link>
      </div>
      <div className={styles.header__right}>
        <Button variant="text" className={styles.header__button}>
          CREAR CUENTA
          </Button>
        <Button variant="contained" color="primary" className={`${styles.header__button} ${styles["header__button--login"]}`}>
          INICIAR SESIÓN
        </Button>
      </div>
    </header>
  );
};

export default Header;
