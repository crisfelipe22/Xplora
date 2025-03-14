import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Button,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/header.module.css";
import { Link } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router";

const MenuUsuario = ({ avatarText = "U", userName = "Usuario" }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  let navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogin = () => {
    handleClose();
    navigate("/login");
  };
  
  const handleMyProfile = () => {
    handleClose();
    navigate("/perfil");
  }
  
  const handleLogout = () => {
    handleClose();
    logout();
  }

  return (
    <div>
      <IconButton onClick={handleClick} variant="contained">
        { isDesktop ? (
          <Avatar sx={{ bgcolor: "purple", color: "white" }}>{avatarText}</Avatar>
        ) : (
          <MenuIcon
            sx={{ display: { desktop: "none" }, color: "black" }}
          />
        )}
      </IconButton>

      {/* Menú de usuario */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        { isAuthenticated ? (
          <>
            <MenuItem>
              <Avatar sx={{ bgcolor: "purple", width: 32, height: 32, mr: 1 }}>
                {avatarText}
              </Avatar>
              <Typography variant="body1">{userName}</Typography>
            </MenuItem>
            <Divider />
                <MenuItem onClick={handleMyProfile}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  Mi cuenta
                </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}>
              <Link to="/registro">
              <Button
                variant="text"
                className={styles.header__button}
              >
                CREAR CUENTA
              </Button>
            </Link>
            </MenuItem>
            <Divider />
                <MenuItem>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${styles.header__button} ${styles["header__button--login"]}`}
                    onClick={handleLogin}
                  >
                    INICIAR SESIÓN
                  </Button>
                </MenuItem>
          </>
        )}


        
      </Menu>
    </div>
  );
};

export default MenuUsuario;
