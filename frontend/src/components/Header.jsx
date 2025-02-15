import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "../styles/header.module.css"; 

const Header = () => {
  return (
    <header className={styles.header}>
        <Link to="/" className={styles.header__brand}>
          <MenuIcon sx={{ display: {desktop: "none" }}} className={styles.header__menu}/>
          <Box 
            sx={{ display: {desktop: "flex" }}}
            className={styles.header__logo}
          >
            <img src="/logo.svg"></img>
          </Box>
          <span className={styles.header__slogan}>
            XPLORA</span>
        </Link>
      <Box sx={{ display: {desktop: "flex" }}} className={styles.header__right}>
        <Button variant="text" className={styles.header__button}>
          CREAR CUENTA
          </Button>
        <Button variant="contained" color="primary" className={`${styles.header__button} ${styles["header__button--login"]}`}>
          INICIAR SESIÓN
        </Button>
      </Box>
    </header>
  );
};

export default Header;
