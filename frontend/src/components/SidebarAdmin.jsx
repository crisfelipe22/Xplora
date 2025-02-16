/* eslint-disable no-unused-vars */
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/AdminPanel.module.css";
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {

    return (
        <Box className={styles.panel}>

            <Box className={styles.header}>
                <Typography variant="h6" className={styles.panelTitle}>
                    Panel de Administración
                </Typography>
            </Box>

            <Box className={styles.sidebarBox}>
                <Drawer variant="permanent" className={styles.sidebar}
                    sx={{
                        '& .MuiDrawer-paper': {
                            position: 'relative',
                            width: 240,
                            height: 'calc(100vh - 64px)',
                            boxSizing: 'border-box'
                        }
                    }}>
                    <List className={styles.menuList} > 
                        <Link to='/admin' style={{ textDecoration: 'none' }} >
                            <ListItemButton className={styles.menuItem} >
                                <ListItemIcon>
                                    <DashboardIcon className={styles.menuIcon}/>
                                </ListItemIcon>
                                <ListItemText primary="Inicio" className={styles.menuText} />
                            </ListItemButton>
                        </Link>
                            
                        <Link to="/admin/productos" style={{ textDecoration: 'none' }}>
                            <ListItemButton className={styles.menuItem}>
                                <ListItemIcon>
                                    <AddIcon className={styles.menuIcon}/>
                                </ListItemIcon>
                                <ListItemText primary="Lista de productos" className={styles.menuText} />
                            </ListItemButton>
                        </Link>
                            
                    </List>
                </Drawer>
            </Box>

        </Box>
        
        
    );
};

export default SidebarAdmin;