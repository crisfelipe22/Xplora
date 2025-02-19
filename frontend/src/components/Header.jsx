// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "../styles/header.module.css"; 

const Header = () => {
  return (
    <Box 
      sx={{ padding: {tablet: "12px 24px" }}}
      className={styles.header}
      component="header"
    >
      <Link to="/" className={styles.header__brand}>
        <Box 
          className={styles.header__logo}
        >
          <img src="/logo.svg"></img>
        </Box>
        <Box
          sx={{ display: { mobile: "none", desktop: "block" }}}
        >
          <span className={styles.header__slogan}>
            XPLORA
          </span>
        </Box>
      </Link>
      <Box 
      
      className={styles.header__right}>
        <MenuIcon sx={{ display: {desktop: "none" }}} className={styles.header__menu}/>
        <Button 
        sx={{ display: {mobile: "none", desktop: "block" }}}
        variant="text" className={styles.header__button}>
          CREAR CUENTA
          </Button>
        <Button 
        sx={{ display: {mobile: "none", desktop: "block" }}}
        variant="contained" color="primary" 
        className={`${styles.header__button} ${styles["header__button--login"]}`}>
          INICIAR SESIÓN
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
