import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const MenuUsuario = ({ avatarText = "U", userName = "Usuario", onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick} variant="contained">
        <Avatar sx={{ bgcolor: "purple", color: "white" }}>{avatarText}</Avatar>
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
        <MenuItem>
          <Avatar sx={{ bgcolor: "purple", width: 32, height: 32, mr: 1 }}>
            {avatarText}
          </Avatar>
          <Typography variant="body1">{userName}</Typography>
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Mi cuenta
        </MenuItem>

        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuUsuario;
