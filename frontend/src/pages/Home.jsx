/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Import styles
import { Box, Button, Container, ImageList, ImageListItem, InputAdornment, TextField, Typography, useMediaQuery, useTheme, Autocomplete } from '@mui/material';
import ProductoAleatorio from "../components/ProductoAleatorio";
import { BeachAccess, CalendarToday } from "@mui/icons-material";
/*import { DateRangePicker } from "@mui/x-date-pickers";*/
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import { useProducts } from '../contexts/ProductContext';

const Home = () => {
  const theme = useTheme();
  const { products, loading, error } = useProducts();

  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const isTablet = useMediaQuery(theme.breakpoints.down('desktop'));
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]); 
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const fechaInicio = dateRange[0] || null;
  const fechaFin = dateRange[1] || null;
  const [errorQuery, setErrorQuery] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  
  const calendarRef = useRef(null);
  const [sugerencias, setSugerencias] = useState([]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /*sugerencias*/
  useEffect(() => {
    if (products.length > 0 && query) {
      const filtrarSugerencias = products.filter(product =>
        product.nombre.toLowerCase().includes(query.toLowerCase())
      );
      
      setSugerencias(filtrarSugerencias);
    } else {
      setSugerencias([]);
    }
  }, [query, products]);

  const handleBuscar = () => {
    if (!query.trim() && !fechaInicio && !fechaFin) {
      setErrorQuery(true);
      setErrorDate(true);
      return;
    }
  
    setErrorQuery(false);
    setErrorDate(false);
    
    const params = new URLSearchParams();
    if (query.trim()) params.append("nombre", query.trim());
    if (fechaInicio) params.append("fecha_inicio", format(fechaInicio, "yyyy-MM-dd"));
    if (fechaFin) params.append("fecha_fin", format(fechaFin, "yyyy-MM-dd"));
  
    navigate(`/resultados?${params.toString()}`);

  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar los productos: {error.message}</p>;
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="home-container"
        sx={{
          paddingLeft: {tablet: "32px !important"},
          paddingRight: {tablet: "32px !important"},
        }}>
        <Container className="search-bar"
          sx={{
            // paddingLeft: {tablet: "32px !important"},
            display: {desktop: "flex !important"},
            flexWrap: {desktop: "wrap"}
          }}
        >
          <Box
            sx={{
            display: {desktop: "flex !important"},
            height: {tablet: "335px !important"},
            width: {desktop: "40%"},
            flexDirection: {desktop: "column"}
          }}
          >
            <Typography
              sx={{ 
                fontSize: {tablet: "64px !important"},
                display: {desktop: "block !important"},
              }}
              >
              Empieza a crear momentos inolvidables
            </Typography>
            <Typography className="subtext"
              sx={{ 
                textTransform: {tablet: "none !important"},
                display: {desktop: "block !important"},
                fontSize: {tablet: "24px !important"},
              }}
            >
              Regala Experiencias
            </Typography>
          </Box>
          <Box
            className="image_list"
            sx={{
              display: {desktop: "block !important"},
            }}
          >
            <ImageList sx={{ height: 335, margin: 0, }} cols={3} gap="20px">
              <ImageListItem key="1">
                <img src="/imagen_21.jpeg" alt="" />
              </ImageListItem>
              <ImageListItem key="2">
                <img src="/imagen_22.jpeg" alt="" />
              </ImageListItem>
              <ImageListItem key="3">
                <img src="/imagen_23.jpeg" alt="" />
              </ImageListItem>
            </ImageList>
          
          </Box>

          <Box
            component="form"
            noValidate
            className="box-form"
            sx={{
              display: {tablet: "flex", mobile: "flex"}, 
              flexDirection: { mobile: "column", desktop: "row", tablet: "row" },
              alignSelf: {desktop: "flex-start"},
              gap: {tablet: "16px"}, 
              alignItems: { mobile: "flex-start" },
              // marginTop: {tablet: "96px"},
              width: {desktop: "50% !important"}
          }}
          >  
            <Autocomplete
              freeSolo
              options={sugerencias.map((sug) => sug.nombre)}
              value={query}
              onInputChange={(_, newValue) => setQuery(newValue)}
              onChange={(_, newValue) => setQuery(newValue)}
              className="autocomplete"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="¿Qué vamos a hacer?"
                  placeholder="Playa, masajes, cena, cabalgata..."
                  {...(isMobile ? { fullWidth: true } : {})}
                  size="small"
                  margin="normal"
                  error={errorQuery}
                  helperText={errorQuery ? "Por favor ingresa un nombre o selecciona una fecha" : ""}
                  variant="outlined"
                  className="input-nombre"
                  sx={{
                    flexGrow: {tablet: "3"},
                    "& .MuiFormHelperText-root": {
                      fontSize: "0.75rem", 
                      marginTop: {desktop: "45px", mobile: "170px"},
                      position: "absolute"
                    },
                  }}
                  InputLabelProps={{
                    shrink: true, 
                  }}
                  InputProps={{
                    ...params.InputProps, // Mantén las propiedades del Autocomplete
                    startAdornment: !isMobile && ( 
                      <InputAdornment position="start">
                        <BeachAccess />
                      </InputAdornment>
                    ),
                  }}
                  
                />
              )}
              
            />

            <Box sx={{ position: 'relative'}} ref={calendarRef}>
              <TextField
                
                label="¿Cuándo?"
                placeholder="Elige una fecha"
                size="small"
                fullWidth
                variant="outlined"
                className="input-fecha"
                value={
                  fechaInicio && fechaFin
                  ? `${format(fechaInicio, "dd/MM/yyyy")} - ${format(fechaFin, "dd/MM/yyyy")}`
                  : ""
                }
                onClick={() => setOpen(true)}
                InputLabelProps={{
                  shrink: true, 
                }}
                {...(!isMobile && {
                  slotProps: {
                    
                    input: {
                      readOnly: true,
                      startAdornment: 
                      <InputAdornment position="start"> 
                        <CalendarToday/> 
                      </InputAdornment>,
                    },
                  },
                })}
              />

                {/* Calendario doble oculto */}
                {open && (
                  <Box className="box-calendar">
                    <DatePicker
                      selectsRange
                      startDate={fechaInicio}
                      endDate={fechaFin}
                      onChange={(update) => setDateRange(update)}
                      onCalendarClose={() => setOpen(false)}
                      minDate={new Date()}
                      inline
                      locale={es}
                      monthsShown={isTablet ? 1 : 2}
                      calendarClassName="custom-calendar"
                    />
                  </Box>
                )}
              </Box>
            
              <Button
                onClick={handleBuscar}
                variant="contained"
                className="boton-buscar"
                sx={{display: "block", height: {tablet: "40px !important"}}}
                {...(isMobile ? {} : { size: "small" })}
              >
                BUSCAR
              </Button>
          
          </Box>
        </Container>

          <Container sx={{padding:"0px"}}>
            <Typography variant="h5" className="titulo-recomendados" >
              Lo que nuestros Xplorers recomiendan
            </Typography>
            <ProductoAleatorio />
          </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default Home;
