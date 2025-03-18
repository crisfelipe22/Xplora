/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Container, Grid2, Typography, Chip, List, ListItem, ListItemIcon, Card, CardContent, Button, Rating, TextField, IconButton, Box, Divider, Link, Modal } from '@mui/material';
import styles from "../styles/DetalleProducto.module.css";
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import GaleriaImgProducto from './GaleriaImgProducto';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import CloseIcon from "@mui/icons-material/Close";
import ModalCompartir from "./ModalCompartir";
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
    const [openModal, setOpenModal] = useState(false); // Estado para el modal de compartir
    const handleOpenGallery = () => setOpenGallery(true);
    const handleCloseGallery = () => setOpenGallery(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [open, setOpen] = useState(false);

    const isTablet = useMediaQuery("(max-width:900px)");
    const isMobile = useMediaQuery("(max-width:412px)");
    const numImages = isMobile ? 1 : isTablet ? 3 : 5; 
    const imagenArray = product.imagen ? product.imagen.split(',').map(url => url.trim()) : [];
    
    const { isAuthenticated } = useAuth();
    const { favorites, toggleFavorite } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        setIsFavorite(favorites.includes(product.id_paquete_experiencia));
    }, [favorites, product.id_paquete_experiencia]);
    

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para agregar favoritos.");
            return;
        }
        toggleFavorite(product.id_paquete_experiencia);
    };

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
    const isMobile1 = useMediaQuery(theme.breakpoints.down('tablet'));
    const isTablet1 = useMediaQuery(theme.breakpoints.between('tablet', 'desktop'));

    //caracteristicas provisorias
    
    const caracteristicas = [
        {
            id_car: 1,
            nombre: "Kayak profesional incluido",
            id_icono: 1,
            icono: DirectionsBoat
        },
        {
            id_car: 2,
            nombre: "Chaleco salvavidas regulado",
            id_icono: 2,
            icono: SafetyDivider
        },
        {
            id_car: 3,
            nombre: "Guía certificado por grupo",
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
            nombre: "Equipo impermeable incluido",
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
                                                        {/* className={styles.backButton} */}
                    <IconButton component={Link} onClick={()=>navigate(-1)} sx={{
                            color: 'primary.main',
                            fontSize: isMobile ? '0.8rem' : '1rem',
                        }}>
                        <ArrowBackIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}/> VOLVER ATRÁS
                    </IconButton>
                    <Typography variant="h3" className={styles.title}>{product.nombre}</Typography>
                    <div className={styles.rightButtons}>
                        {/* Modal para compartir */}
                        <ModalCompartir 
                            open={openModal} 
                            onClose={handleCloseModal} 
                            nombre={product.nombre} 
                            imagen={imagenArray[0]}
                        />
                        <IconButton onClick={handleToggleFavorite} sx={{
                                color: isFavorite ? 'error.main' : 'inherit',
                                width: isMobile ? '32px' : '40px',
                                height: isMobile ? '32px' : '40px',
                            }}>
                            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </div>
                </div>

                <div className={styles.imagenContainer}>
                    <img src={imagenArray[0]} alt={product.nombre} className={styles.mainImage} />
                    <div className={styles.imgContainer}>
                        {imagenArray.slice(1, numImages).map((img, index) => (
                            <img key={index} src={img} alt={`Vista ${index + 1}`} className={styles.img} />
                        ))}
                    </div>
                </div>
                <Button variant="contained" onClick={handleOpenGallery} className={styles.seeAllImages}>VER TODAS LAS IMÁGENES</Button>
            </div>

            <Box className={styles.contenedorDetalles}> 
                <Box className={styles.contenedorDos}>
                    <div className={styles.seccionRating}>
                        <Chip label={categorias.find(cat => cat.id_categoria === product.id_categoria)?.nombre || "Desconocido"} className={styles.chip} />
                        <Rating value={rating} precision={0.5} readOnly className={styles.rating} />
                    </div>    
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

            {/* 🔹 Sección de Política de Uso */}
            <Divider sx={{ marginTop: 2 }} />
            <Box sx={{ p: 2, textAlign: "left", mb: 5 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ textDecoration: "underline" }}>
                    Política de uso
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Revisa la política completa para obtener más detalles.
                </Typography>
                <Link
                    component="button"
                    onClick={() => setOpen(true)}
                    color="primary"
                    sx={{
                      fontWeight: "bold",
                      display: "block",
                      mt: 1,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" }
                    }}
                >
                VER POLÍTICA →
                </Link>
            </Box>

            {/* Modal de Política de Uso */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box 
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxWidth: 600,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        outline: "none"
                    }}
                    >
                        <IconButton 
                            onClick={() => setOpen(false)} 
                            sx={{ position: "absolute", top: 8, right: 8 }}
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" fontWeight="bold" mb={2} sx={{ textDecoration: "underline" }}>
                            Política de uso de Experiencias
                        </Typography>

                        <Typography variant="h7" mb={2}>
                            Xplora ofrece experiencias de distintas categorías (tales como y sin que ello implique limitación alguna, 
                            experiencias gastronómicas, de aventura, de relajación, viajes, entre otras), las cuales dan derecho 
                            al Cliente al uso y goce de bienes y/o servicios (la/s “Experiencia/s”) ofrecidos por terceros 
                            (el/los “Prestador/es”), independientes y ajenos a Xplora.
                        </Typography>


                        <Typography variant="subtitle1" fontWeight="bold">
                            A. Compra y Entrega
                        </Typography>
                        <List sx={{ listStyleType: "disc", pl: 2 }}>
                            <ListItem sx={{ display: "list-item" }}>Las compras se realizan en el sitio web con registro previo.</ListItem>
                            <ListItem sx={{ display: "list-item" }}>El cliente recibe una confirmación por correo electrónico con el detalle de la compra.</ListItem>
                        </List>


                        <Typography variant="subtitle1" fontWeight="bold">
                            B. Uso de la Experiencia
                        </Typography>
                        <List sx={{ listStyleType: "disc", pl: 2 }}>
                            <ListItem sx={{ display: "list-item" }}>Cada código tiene una fecha de vencimiento.</ListItem>
                            <ListItem sx={{ display: "list-item" }}>El cliente debe contactar al Prestador para reservar, usando el código.</ListItem>
                            <ListItem sx={{ display: "list-item" }}>Las reservas canceladas fuera del plazo del prestador, implica que el código se considera utilizado.</ListItem>
                            <ListItem sx={{ display: "list-item" }}>El cliente puede usar el código hasta la fecha de vencimiento.</ListItem>
                        </List>


                        <Typography variant="subtitle1" fontWeight="bold">
                            C. Vencimiento y Crédito
                        </Typography>
                        <List sx={{ listStyleType: "disc", pl: 2 }}>
                            <ListItem sx={{ display: "list-item" }}>Los códigos vencidos se convierten en crédito en el sitio web por 60 días.</ListItem>
                            <ListItem sx={{ display: "list-item" }}>El crédito es equivalente al valor de la experiencia original.</ListItem>
                        </List>

                        <Typography variant="subtitle1" fontWeight="bold">
                            D. Obligaciones del Cliente
                        </Typography>
                        <List sx={{ listStyleType: "disc", pl: 2 }}>
                            <ListItem sx={{ display: "list-item" }}>El cliente elige la experiencia y reserva directamente con el Prestador.</ListItem>
                            <ListItem sx={{ display: "list-item" }}>Debe cumplir con las normas y políticas del Prestador.</ListItem>
                        </List>
                </Box>
            </Modal>
        </Container>
    )
};

export default CardDetalleProducto;