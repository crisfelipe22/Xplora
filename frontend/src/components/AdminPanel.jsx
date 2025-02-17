
import styles from "../styles/AdminPanel.module.css";
import SidebarAdmin from "../components/SidebarAdmin";
import {Box, Typography} from "@mui/material";


const AdminPanel = () => {

    return (
        <Box className={styles.container}>

            <SidebarAdmin />
            <Box className={styles.adminContainer} >
                <Box className={styles.titleInicio}>
                    <Typography variant="h4" className={styles.titleAdmin}>
                        Inicio
                    </Typography>

                    <Box className={styles.contenido}>
                        <Typography variant="h5" className={styles.welcomeTitle}>
                            Bienvenido al Panel de Administración
                        </Typography>
                        <Typography variant="body1" className={styles.welcomeText}>
                            Administra productos y configura la tienda desde aquí.
                        </Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
        
    );
};

export default AdminPanel;