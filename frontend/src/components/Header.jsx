/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/header.module.css";
import MenuUsuario from "./MenuUsuario";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Con esto estoy simulando que el usuario inició sesión
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  // Y con esto estoy simulando el cierre de sesión.
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Box
      sx={{ padding: { tablet: "12px 24px" } }}
      className={styles.header}
      component="header"
      data-testid="header"
    >
      <Link to="/" className={styles.header__brand}>
        <Box className={styles.header__logo}>
          <img src="/logo.svg"></img>
        </Box>
        <Box sx={{ display: { mobile: "none", desktop: "block" } }}>
          <span className={styles.header__slogan}>XPLORA</span>
        </Box>
      </Link>
      <Box className={styles.header__right}>
        <MenuIcon
          sx={{ display: { desktop: "none" } }}
          className={styles.header__menu}
        />

        {!isAuthenticated ? (
          <>
            <Link to="/registro">
              <Button
                sx={{ display: { mobile: "none", desktop: "block" } }}
                variant="text"
                className={styles.header__button}
              >
                CREAR CUENTA
              </Button>
            </Link>

            <Button
              sx={{ display: { mobile: "none", desktop: "block" } }}
              variant="contained"
              color="primary"
              className={`${styles.header__button} ${styles["header__button--login"]}`}
              //Aqui simulo que se inicia la sesión
              onClick={handleLogin}
            >
              INICIAR SESIÓN
            </Button>
          </>
        ) : (
          <MenuUsuario onLogout={handleLogout} />
        )}
      </Box>
    </Box>
  );
};

export default Header;
