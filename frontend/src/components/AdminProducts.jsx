import { Button } from "@mui/material";
import SidebarAdmin from "./SidebarAdmin";
import styles from "../styles/AdminPanel.module.css";
import { Link } from 'react-router-dom';


const AdminProduct = () => {

    return (
        <div className={styles.adminContainer}>
            <SidebarAdmin />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Lista de productos</h2>
                    <Link to= "/admin/productos/nuevo-producto">
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            AGREGAR PRODUCTO
                        </Button>
                    </Link>
                    
                </div>
                {/* Aquí iría la lista de productos */}
            </div>
        </div>
    );
};

export default AdminProduct;