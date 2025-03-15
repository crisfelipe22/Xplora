/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Container, Grid2, Typography, Chip, List, ListItem, ListItemIcon, Card, CardContent, Button, Rating, TextField, IconButton, Box } from '@mui/material';
import styles from "../styles/DetalleProducto.module.css";
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { useState } from "react";
import GaleriaImgProducto from './GaleriaImgProducto';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import {
    DirectionsBoat,    // Kayak
    Landscape,         // Montañas
    Waves,             // Agua
    SafetyDivider,     // Seguridad
    Timer,             // Duración
    Groups,            // Grupo
    LocalOffer,        // Incluido
    Wc,                // Sanitarios
    Restaurant,        // Comida
    Hiking,            // Trekking
    CameraAlt,         // Fotografía
    NaturePeople,      // Naturaleza
    WaterDrop,         // Cascadas
    Terrain,           // Terreno
    DarkMode,          // Noche
    Brightness5,       // Día
    Emergency,         // Emergencia
    Flag,              // Punto encuentro
    Map,               // Mapa
    AcUnit,            // Clima frío
    AccessTime         // Horarios
  } from '@mui/icons-material';

const CardDetalleProducto = ({product, categorias}) =>{
    const navigate = useNavigate();
    const [openGallery, setOpenGallery] = useState(false);
    const handleOpenGallery = () => setOpenGallery(true);
    const handleCloseGallery = () => setOpenGallery(false);

    const isTablet = useMediaQuery("(max-width:900px)");
    const isMobile = useMediaQuery("(max-width:412px)");
    const numImages = isMobile ? 1 : isTablet ? 3 : 5; 
    const imagenArray = product.imagen ? product.imagen.split(',').map(url => url.trim()) : [];

    //caracteristicas provisorias
    
    const caracteristicas = [
        {
            id_car: 1,
            nombre: "Kayak profesional",
            id_icono: 1,
            icono: DirectionsBoat
        },
        {
            id_car: 2,
            nombre: "Chaleco salvavidas",
            id_icono: 2,
            icono: SafetyDivider
        },
        {
            id_car: 3,
            nombre: "Guía certificado",
            id_icono: 3,
            icono: Groups
        },
        {
            id_car: 4,
            nombre: "Ruta por río de montaña",
            id_icono: 4,
            icono: Waves
        },
        {
            id_car: 5,
            nombre: "Equipo impermeable ",
            id_icono: 5,
            icono: WaterDrop
        },
        {
            id_car: 6,
            nombre: "Fotografías profesionales",
            id_icono: 6,
            icono: CameraAlt
        },
        {
            id_car: 7,
            nombre: "Almuerzo tipo picnic",
            id_icono: 7,
            icono: Restaurant
        },
        {
            id_car: 8,
            nombre: "Botiquín de primeros auxilios",
            id_icono: 8,
            icono: Emergency
        },
        {
            id_car: 9,
            nombre: "Instrucción básica de remo",
            id_icono: 9,
            icono: DirectionsBoat
        },
        {
            id_car: 10,
            nombre: "Avistamiento de fauna local",
            id_icono: 10,
            icono: NaturePeople
        },
        {
            id_car: 11,
            nombre: "Seguro contra accidentes",
            id_icono: 11,
            icono: LocalOffer
        },
        {
            id_car: 12,
            nombre: "Punto de encuentro señalizado",
            id_icono: 12,
            icono: Flag
        },
        {
            id_car: 13,
            nombre: "Mapa de la ruta digital",
            id_icono: 13,
            icono: Map
        },
        {
            id_car: 14,
            nombre: "Duración 4 horas",
            id_icono: 14,
            icono: Timer
        },
        {
            id_car: 15,
            nombre: "Zonas de descanso designadas",
            id_icono: 15,
            icono: Brightness5
        }
    ]
    //simulando raiting
    const rating = product.rating ?? Math.floor(Math.random() * 3) + 3;

    return (
        <Container className={styles.container}>
            <div className={styles.detalleSuperior}>
                <div className={styles.tituloVolver}>
                    <IconButton component={Link} onClick={()=>navigate(-1)} className={styles.backButton}>
                        <ArrowBackIcon /> VOLVER ATRÁS
                    </IconButton>
                </div>

                <div className={styles.tituloVolver}>
                  <Typography variant="h3" className={styles.title}>{product.nombre}</Typography>
                </div>
                
                <div className={styles.imagenContainer}>
                    <img src={imagenArray[0]} alt={product.nombre} className={styles.mainImage} />
                    { imagenArray.length > 1 &&
                      <div className={styles.imgContainer}>
                        {imagenArray.slice(1, numImages).map((img, index) => (
                            <img key={index} src={img} alt={`Vista ${index + 1}`} className={styles.img} />
                        ))}
                      </div>
                    }
                </div>
                <Button variant="contained" onClick={handleOpenGallery} className={styles.seeAllImages}>VER TODAS LAS IMÁGENES</Button>
            </div>

            <Box className={styles.contenedorDetalles}> 
                <Box className={styles.contenedorDos}>
                    <div className={styles.seccionRating}>
                        <Chip label={categorias.find(cat => cat.id_categoria === product.id_categoria)?.nombre || "Desconocido"} className={styles.chip} />
                        <Rating value={rating} precision={0.5} readOnly className={styles.rating} />
                    </div>    
                    <Typography variant="h6">Características</Typography>
                    <Box className={styles.gridCaracteristicas}>
                      
                    {caracteristicas.map((item) => (
                        <ListItem key={item.id_car} className={styles.listItem}>
                            <ListItemIcon className={styles.listIcon}>
                            <item.icono fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="body1">{item.nombre}</Typography>
                        </ListItem>
                        ))}
                    </Box>
                </Box>                 

                <Card className={styles.cardPrecio}>
                    <Typography variant="h5" className={styles.precio}>${product.precio.toLocaleString()}</Typography>
                    <TextField type="date" label="Elige fecha" className={styles.datePicker} />
                    <Button variant="contained" className={styles.botonComprar}>COMPRAR EXPERIENCIA</Button>
                    <Typography variant="h5" className={styles.preguntaRegalo}>¿TE HICIERON ESTE REGALO?</Typography>
                </Card>
            </Box>            
            <GaleriaImgProducto open={openGallery} close={handleCloseGallery} imagen={product.imagen}/>
        </Container>
    )
};

export default CardDetalleProducto;