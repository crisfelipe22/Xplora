import React from 'react';
import { Link } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import styles from "../styles/footer.module.css"; 

const Footer = () => {
  return (
    <Box className={styles.footer} component='footer'>
      <div className={styles.footer__brand}>
        <Link to="/" className={styles.footer__logo}>
          <div className={styles.footer__logo}>
            <img src="/logo.svg"></img>
          </div>
          <span className={styles.footer__slogan}>XPLORA</span>
        </Link>
      </div>
      <Typography variant="caption">
        © 2025 Equipo Xplora | Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;
