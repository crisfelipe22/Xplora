import SidebarAdmin from "./SidebarAdmin";
import styles from "../styles/AdminPanel.module.css";
import { Link } from 'react-router-dom';

const AdminPanel = () => {

    return (
        <div className={styles.adminContainer}>
            <SidebarAdmin />
            <div >
                    
                <Link to= "/admin">
                    <h2>Inicio</h2>
                </Link>
                    
            </div>
                {/* Aquí iría la lista de productos */}
        
        </div>
    );
};

export default AdminPanel;