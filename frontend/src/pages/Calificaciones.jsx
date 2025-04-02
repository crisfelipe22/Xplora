/* eslint-disable no-unused-vars */

import { Typography} from "@mui/material";
import CardCalificacionProducto from "../components/CardCalificacionProducto";

const Calificaciones = () => {

    //APPI, POR AHORA CODEADO
    const calificaciones = [
        {
            usuario: 'Sara Mendoza',
            fecha_calificacion: '2025-03-14',
            calificacion: 4.5,
            descripcion: 'Simplemente mágico, empiezas el recorrido caminando, conoces dos cascadas increíbles, un poco de historia y pasas a conectarte con: La paz, la naturaleza, la conservación y la vida.'
        },
        {
            usuario: 'Solymar Quiaro',
            fecha_calificacion: '2024-11-01',
            calificacion: 3.0,
            descripcion: 'Simplemente mágico, empiezas el recorrido caminando, conoces dos cascadas increíbles, un poco de historia y pasas a conectarte con: La paz, la naturaleza, la conservación y la vida.'
        }
    ]

    const promedioCalificacion = 3

    return (
        <div>
            <Typography variant="h5">Reseñas</Typography>
                {calificaciones.length > 0 ? (
                    calificaciones.map((cal, index) => 
                    <CardCalificacionProducto key={index} calificacion={cal} /> )
                ) : (
                <Typography variant="body1">Aún no hay reseñas.</Typography>
            )}
        </div>
    );
};

export default Calificaciones;
