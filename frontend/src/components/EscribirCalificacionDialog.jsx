/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Rating, Avatar, Typography, Box } from "@mui/material";
import styles from "../styles/CardCalificacionProducto.module.css";

const EscribirCalificacionDialog = ({ openDialog, handleCloseDialog, product, user }) => {
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setComentario] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token")

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handlePublicar = async () => {
        setLoading(true);
        setError("");

        const fechaHoy = new Date().toISOString(); 
        const nuevaResena = {
            puntuacion: calificacion,
            comentario,
            fecha_calificacion: fechaHoy,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/auth/${user.id}/reservas/${product.id_paquete_experiencia}/calificaciones`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(nuevaResena),
            });

            if (!response.ok) {
                throw new Error("Error al enviar la reseña");
            }

            console.log("Reseña publicada con éxito!", nuevaResena);
            handleCloseDialog(); 
        } catch (error) {
            setError("Hubo un problema al publicar tu reseña.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} 
            maxWidth={false}
            PaperProps={{
                sx: {
                    width: "50vw", 
                    height: "50vh", 
                    borderRadius: 3, 
                    padding: 2,
                },
            }}
        >
            <DialogTitle align="center">{product.nombre}</DialogTitle>
            <DialogContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: "purple" }}>{getInitials(user.nombre)}</Avatar>
                    <Typography variant="h6">{user.nombre}</Typography>
                </Box>
                
                <Box display="flex" justifyContent="center" mb={2}>
                    <Rating 
                        value={calificacion} 
                        precision={0.5}
                        onChange={(event, newValue) => setCalificacion(newValue)} 
                    />
                </Box>
                
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Escribe tu reseña para esta experiencia"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
                <Button onClick={handleCloseDialog} sx={{ color: "purple" }} disabled={loading}>Cancelar</Button>
                <Button 
                    onClick={handlePublicar} 
                    variant="contained" 
                    sx={{ bgcolor: "purple" }} 
                    disabled={loading || calificacion === 0 || comentario.trim() === ""}
                >
                    {loading ? "Publicando..." : "Publicar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EscribirCalificacionDialog;
