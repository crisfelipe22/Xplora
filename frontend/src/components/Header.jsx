/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import styles from "../styles/header.module.css";
import MenuUsuario from "./MenuUsuario";
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  let navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const handleLogin = () => {
    navigate("/login");
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

        {!isAuthenticated && isDesktop ? (
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
              onClick={handleLogin}
            >
              INICIAR SESIÓN
            </Button>
          </>
        ) : (
          <MenuUsuario 
            avatarText={user?.iniciales}
            userName={user?.nombre}
          />
        )}
      </Box>
    </Box>
  );
};

export default Header;
