/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Rating, Avatar, Typography, Box } from "@mui/material";
import styles from "../styles/CardCalificacionProducto.module.css";

const EscribirCalificacionDialog = ({ openDialog, handleCloseDialog, usuario, product}) => {
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setComentario] = useState("");

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handlePublicar = () => {
        const fechaHoy = new Date().toISOString().split("T")[0];
        const nuevaResena = {
            usuario,
            calificacion,
            comentario,
            fecha_calificacion: fechaHoy,
        };
        console.log("Publicar reseña:", nuevaResena);
        handleCloseDialog();
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
            <DialogTitle align="center">
                {product.nombre}
            </DialogTitle>
            <DialogContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: "purple" }}>{getInitials(usuario)}</Avatar>
                    <Typography variant="h6">{usuario}</Typography>
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
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
                <Button onClick={handleCloseDialog} sx={{ color: "purple" }}>Cancelar</Button>
                <Button onClick={handlePublicar} variant="contained" sx={{ bgcolor: "purple" }}>
                    Publicar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EscribirCalificacionDialog;
