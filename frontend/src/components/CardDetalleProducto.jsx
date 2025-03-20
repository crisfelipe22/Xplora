/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Container,
  Typography,
  Chip,
  ListItem,
  ListItemIcon,
  Card,
  Button,
  Rating,
  TextField,
  IconButton,
  Box,
  Divider,
  Link,
  Modal,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import styles from "../styles/DetalleProducto.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useRef, useEffect } from "react";
import GaleriaImgProducto from "./GaleriaImgProducto";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { CalendarToday } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import CloseIcon from "@mui/icons-material/Close";
import ModalCompartir from "./ModalCompartir";
import {
  DirectionsBoat, // Kayak
  Landscape, // Montañas
  Waves, // Agua
  SafetyDivider, // Seguridad
  Timer, // Duración
  Groups, // Grupo
  LocalOffer, // Incluido
  Wc, // Sanitarios
  Restaurant, // Comida
  Hiking, // Trekking
  CameraAlt, // Fotografía
  NaturePeople, // Naturaleza
  WaterDrop, // Cascadas
  Terrain, // Terreno
  DarkMode, // Noche
  Brightness5, // Día
  Emergency, // Emergencia
  Flag, // Punto encuentro
  Map, // Mapa
  AcUnit, // Clima frío
  AccessTime, // Horarios
} from "@mui/icons-material";
import PoliticaDialog from "./PoliticaDialog";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CardDetalleProducto = ({ product, categorias }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const isTablet = useMediaQuery(theme.breakpoints.down("desktop"));

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();
  const [openGallery, setOpenGallery] = useState(false);
  const [openPolitica, setOpenPolitica] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [open, setOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const fechaInicioReserva = dateRange[0] || null;
  const fechaFinReserva = dateRange[1] || null;
  const fechaInicioDisponible = product.fecha_inicio
    ? new Date(product.fecha_inicio)
    : null;
  const fechaFinDisponible = product.fecha_fin
    ? new Date(product.fecha_fin)
    : null;

  const [openModal, setOpenModal] = useState(false); // Estado para el modal de compartir
  const handleOpenGallery = () => setOpenGallery(true);
  const handleCloseGallery = () => setOpenGallery(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClickOpenPolitica = (scrollType) => () => {
    setOpenPolitica(true);
    setScroll(scrollType);
  };

  const handleClosePolitica = () => setOpenPolitica(false);

  const numImages = isMobile ? 1 : isTablet ? 3 : 5;
  const imagenArray = product.imagen
    ? product.imagen.split(",").map((url) => url.trim())
    : [];

  //fechas reservadas
  const fechasReservadas = [
    new Date(2025, 3, 16),
    new Date(2025, 3, 17),
    new Date(2025, 4, 4),
    new Date(2025, 4, 5),
    new Date(2025, 4, 20),
    new Date(2025, 4, 15),
    new Date(2025, 5, 2),
    new Date(2025, 5, 3),
    new Date(2025, 5, 7),
  ];

  //validacion que no hayan fechas reservadas en el rango que se seleccione
  const tieneFechasReservadas = (startDate, endDate, fechasReservadas) => {
    if (!startDate || !endDate) return false;

    const fechaActual = new Date(startDate);
    while (fechaActual <= endDate) {
      if (
        fechasReservadas.some(
          (fecha) => fecha.getTime() === fechaActual.getTime()
        )
      ) {
        return true; // Hay una fecha reservada en el rango
      }
      fechaActual.setDate(fechaActual.getDate() + 1); // Avanzar al siguiente día
    }
    return false; // No hay fechas reservadas en el rango
  };

  const handleDateChange = (update) => {
    const [startDate, endDate] = update;

    if (tieneFechasReservadas(startDate, endDate, fechasReservadas)) {
      setSnackbarMessage(
        "El rango seleccionado incluye fechas reservadas. Por favor, elige otro rango."
      );
      setOpenSnackbar(true);
      return;
    }

    setDateRange(update);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        if (!event.target.closest(".react-datepicker")) {
          setOpenCalendar(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Favoritos usando el contexto
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.includes(product.id_paquete_experiencia));
  }, [favorites, product.id_paquete_experiencia]);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Evitar que se active el Link al hacer clic en el corazón

    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agregar favoritos.");
      return;
    }

    toggleFavorite(product.id_paquete_experiencia);
  };

  //caracteristicas provisorias
  const caracteristicas = [
    {
      id_car: 1,
      nombre: "Kayak profesional incluido",
      id_icono: 1,
      icono: DirectionsBoat,
    },
    {
      id_car: 2,
      nombre: "Chaleco salvavidas regulado",
      id_icono: 2,
      icono: SafetyDivider,
    },
    {
      id_car: 3,
      nombre: "Guía certificado por grupo",
      id_icono: 3,
      icono: Groups,
    },
    {
      id_car: 4,
      nombre: "Ruta por río de montaña",
      id_icono: 4,
      icono: Waves,
    },
    {
      id_car: 5,
      nombre: "Equipo impermeable incluido",
      id_icono: 5,
      icono: WaterDrop,
    },
    {
      id_car: 6,
      nombre: "Fotografías profesionales",
      id_icono: 6,
      icono: CameraAlt,
    },
    {
      id_car: 7,
      nombre: "Almuerzo tipo picnic",
      id_icono: 7,
      icono: Restaurant,
    },
    {
      id_car: 8,
      nombre: "Botiquín de primeros auxilios",
      id_icono: 8,
      icono: Emergency,
    },
    {
      id_car: 9,
      nombre: "Instrucción básica de remo",
      id_icono: 9,
      icono: DirectionsBoat,
    },
    {
      id_car: 10,
      nombre: "Avistamiento de fauna local",
      id_icono: 10,
      icono: NaturePeople,
    },
    {
      id_car: 11,
      nombre: "Seguro contra accidentes",
      id_icono: 11,
      icono: LocalOffer,
    },
    {
      id_car: 12,
      nombre: "Punto de encuentro señalizado",
      id_icono: 12,
      icono: Flag,
    },
    {
      id_car: 13,
      nombre: "Mapa de la ruta digital",
      id_icono: 13,
      icono: Map,
    },
    {
      id_car: 14,
      nombre: "Duración 4 horas",
      id_icono: 14,
      icono: Timer,
    },
    {
      id_car: 15,
      nombre: "Zonas de descanso designadas",
      id_icono: 15,
      icono: Brightness5,
    },
  ];
  //simulando raiting
  const rating = product.rating ?? Math.floor(Math.random() * 3) + 3;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container className={styles.container}>
        <div className={styles.detalleSuperior}>
          <div className={styles.tituloVolver}>
            <IconButton
              component={RouterLink}
              onClick={() => navigate(-1)}
              className={styles.backButton}
            >
              <ArrowBackIcon /> VOLVER ATRÁS
            </IconButton>
            <Typography variant="h3" className={styles.title}>
              {product.nombre}
            </Typography>

            <div className={styles.rightButtons}>
              <ModalCompartir
                open={openModal}
                onClose={handleCloseModal}
                nombre={product.nombre}
                imagen={imagenArray[0]}
              />
              <IconButton
                onClick={handleToggleFavorite}
                sx={{
                  color: isFavorite ? "error.main" : "inherit",
                  width: isMobile ? "32px" : "40px",
                  height: isMobile ? "32px" : "40px",
                }}
              >
                {isFavorite ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </div>
          </div>
        </div>

        <div className={styles.imagenContainer}>
          <img
            src={imagenArray[0]}
            alt={product.nombre}
            className={styles.mainImage}
          />
          <div className={styles.imgContainer}>
            {imagenArray.slice(1, numImages).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Vista ${index + 1}`}
                className={styles.img}
              />
            ))}
          </div>
        </div>
        <Button
          variant="contained"
          onClick={handleOpenGallery}
          className={styles.seeAllImages}
        >
          VER TODAS LAS IMÁGENES
        </Button>

        <Box className={styles.contenedorDetalles}>
          <Box className={styles.contenedorDos}>
            <div className={styles.seccionRating}>
              <Chip
                label={
                  categorias.find(
                    (cat) => cat.id_categoria === product.id_categoria
                  )?.nombre || "Desconocido"
                }
                className={styles.chip}
              />
              <Rating
                value={rating}
                precision={0.5}
                readOnly
                className={styles.rating}
              />
            </div>
            <Box sx={{ pt: 3, pb: 4 }}>
              <Typography
                gutterBottom
                sx={{ typography: { mobile: "body2", tablet: "body1" } }}
              >
                {product.descripcion}
              </Typography>
            </Box>
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
            <Typography variant="h5" className={styles.precio}>
              ${product.precio.toLocaleString()}
            </Typography>
            <TextField
              ref={calendarRef}
              label="Elegir Fecha"
              placeholder="DD/MM/YYYY"
              size="small"
              fullWidth
              variant="outlined"
              className={styles.datePicker}
              value={
                fechaInicioReserva && fechaFinReserva
                  ? `${format(fechaInicioReserva, "dd/MM/yyyy")} - ${format(
                      fechaFinReserva,
                      "dd/MM/yyyy"
                    )}`
                  : ""
              }
              onClick={() => setOpenCalendar(true)}
              InputLabelProps={{
                shrink: true,
              }}
              {...(!isMobile && {
                slotProps: {
                  input: {
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  },
                },
              })}
            />

            {/* Calendario doble oculto */}
            {openCalendar && (
              <Box className={styles.boxCalendar}>
                <DatePicker
                  selectsRange
                  startDate={fechaInicioReserva}
                  endDate={fechaFinReserva}
                  onChange={handleDateChange}
                  onCalendarClose={() => setOpenCalendar(false)}
                  minDate={fechaInicioDisponible}
                  maxDate={fechaFinDisponible}
                  excludeDates={fechasReservadas}
                  inline
                  locale={es}
                  monthsShown={isTablet ? 1 : 2}
                  calendarClassName="custom-calendar"
                />
              </Box>
            )}
            <Button variant="contained" className={styles.botonComprar}>
              COMPRAR EXPERIENCIA
            </Button>
            <Typography variant="h5" className={styles.preguntaRegalo}>
              ¿TE HICIERON ESTE REGALO?
            </Typography>
          </Card>
        </Box>
        <GaleriaImgProducto
          open={openGallery}
          close={handleCloseGallery}
          imagen={product.imagen}
        />

        {/* 🔹 Sección de Política de Uso */}
        <Divider sx={{ marginTop: 2 }} />
        <Box>
          <Typography
            gutterBottom
            sx={{ typography: { mobile: "h6", tablet: "h5" }, mt: 3 }}
          >
            Política de uso
          </Typography>
          <Typography
            gutterBottom
            sx={{ typography: { mobile: "body2", tablet: "body1" } }}
          >
            Revisa la política completa para obtener más detalles.
          </Typography>
          <Button
            onClick={handleClickOpenPolitica("paper")}
            color="primary"
            variant="text"
            endIcon={<KeyboardArrowRightIcon />}
            sx={{ pl: 0 }}
          >
            VER POLÍTICA
          </Button>
        </Box>

        {/* Modal de Política de Uso */}
        {openPolitica && (
          <PoliticaDialog
            open={openPolitica}
            close={handleClosePolitica}
            scroll={scroll}
          />
        )}
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        sx={{
          "&.MuiSnackbar-root": {
            top: "50%",
            transform: "translateY(-50%)",
          },
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default CardDetalleProducto;
