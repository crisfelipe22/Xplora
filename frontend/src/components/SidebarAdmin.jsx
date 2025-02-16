import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/AdminPanel.module.css";
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {

    return (
        <Drawer variant="permanent" className={styles.sidebar}>
            <div className={styles.logo}>
                <img src="../assets/images/logoImg.png" alt="Logo" />
                <span>Panel de Administración</span>
            </div>
            <List>
                <Link to='/admin' >
                    <ListItemButton >
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                </Link>
                
                <Link to="/admin/productos">
                    <ListItemButton >
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText primary="Lista de productos" />
                    </ListItemButton>
                </Link>
                
            </List>
        </Drawer>
    );
};

export default SidebarAdmin;