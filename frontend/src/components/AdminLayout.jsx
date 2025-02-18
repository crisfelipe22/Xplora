/* eslint-disable react/prop-types */
import { useMediaQuery, Box, Typography } from "@mui/material";
import logoImg from "../assets/images/logoImg.png"

const AdminLayout = ({ children }) => {
    const isMobile = useMediaQuery("(max-width: 900px)");

    if (isMobile) {
        return (
            <Box 
                sx={{ 
                    height: "100vh", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    width:"100vw",
                }}
            >
                <Box 
                    sx={{
                        backgroundColor: "#fff",
                        padding: "24px",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                    }}
                >
                    <img 
                        src={logoImg} 
                        alt="Logo" 
                        style={{ width: "80px", marginBottom: "16px" }} 
                    />
                    <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                        Administración no disponible
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555", marginTop: "8px" }}>
                        Por favor, accede desde un computador para gestionar los productos.
                    </Typography>
                </Box>
            </Box>
        );
    }

    return <>{children}</>;
};

export default AdminLayout;