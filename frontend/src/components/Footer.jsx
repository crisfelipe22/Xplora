import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import styles from "../styles/footer.module.css"; 

const Footer = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/admin"];

  return (
    <>
    {!hideFooterRoutes.includes(location.pathname) &&
    <Box 
      sx={{ 
        textAlign: {desktop: "start" }, 
        position: {desktop: "fixed"},
        bottom: {desktop: "0"},
        left: {desktop: "0"},
        display: { desktop: "flex"}, 
      }}
      className={styles.footer} 
      component='footer'
    >
        <Link to="/" className={styles.footer__brand}>
          <Box
            sx={{ display: { desktop: "inline-flex" }}} 
            className={styles.footer__logo}
          >
            <img src="/logo.svg"></img>
          </Box>
          <span className={styles.footer__slogan}>XPLORA</span>
        </Link>
      <Typography 
        className={styles.footer__disclaimer} 
        variant="caption"
      >
          
          © 2025 Equipo Xplora | Todos los derechos reservados
      </Typography>
    </Box>}
    </>
  );
};

export default Footer;
