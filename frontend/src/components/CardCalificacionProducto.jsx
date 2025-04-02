/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Card, CardContent, Typography, Rating, Avatar, Box} from "@mui/material";
import styles from "../styles/CardCalificacionProducto.module.css";
import { Description } from "@mui/icons-material";

const CardCalificacionProducto = ({calificacion}) => {

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <Card className={styles.cardCalificacion}>
            <CardContent className={styles.cardContent}>
                <Avatar className={styles.avatar}>{getInitials(calificacion.usuario)}</Avatar>
                <Box className={styles.textContainer}>
                    <Rating value={calificacion.calificacion} readOnly className={styles.rating}/>
                    <Box className={styles.userInfo}>
                        <Typography variant="subtitle1" className={styles.username}>{calificacion.usuario} - </Typography>
                        <Typography variant="subtitle2" >
                            {new Date(calificacion.fecha_calificacion).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
                        </Typography>
                    </Box>
                    
                    <Typography variant="body2" className={styles.comment}>{calificacion.descripcion} </Typography>
                </Box>
                
            </CardContent>
        </Card>
    );
};

export default CardCalificacionProducto;
