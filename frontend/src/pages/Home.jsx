/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Import styles
import { Box, Button, Container, ImageList, ImageListItem, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import ProductoAleatorio from "../components/ProductoAleatorio";
import { BeachAccess, CalendarToday } from "@mui/icons-material";
/*import { DateRangePicker } from "@mui/x-date-pickers";*/
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/*import "./custom-datepicker.css";*/
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import es from "date-fns/locale/es";
import { format } from "date-fns";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]); 
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const fechaInicio = dateRange[0] || null;
  const fechaFin = dateRange[1] || null;
  
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBuscar = () => {
    if (!query || !fechaInicio || !fechaFin) {
      alert("Por favor completa todos los campos.");
      return;
    }
    
    const formattedFechaInicio = format(fechaInicio, "yyyy-MM-dd");
    const formattedFechaFin = format(fechaFin, "yyyy-MM-dd");
    console.log("Buscando:", { query, formattedFechaInicio, formattedFechaFin })

    navigate(`/resultados?query=${query}&fechaInicio=${formattedFechaInicio}&fechaFin=${formattedFechaFin}`);
  };

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
            <ImageList sx={{ height: 335, margin: 0, }} cols={3} rowHeight={335} gap="20px">
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
              display: {tablet: "flex"}, 
              alignSelf: {desktop: "flex-start"},
              gap: {tablet: "16px"}, 
              // marginTop: {tablet: "96px"},
              width: {desktop: "50% !important"}
          }}
          >
            <TextField
              label="¿Qué vamos a hacer?"
              placeholder="Playa, masajes, cena, cabalgata..."
              {...(isMobile ? { fullWidth: true } : {})}
              size="small"
              margin="normal"
              className="input-nombre"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                flexGrow: {tablet: "3"},
              }}
              {...(!isMobile && {
                slotProps: {
                  input: {
                    startAdornment: <InputAdornment position="start"> <BeachAccess /> </InputAdornment>,
                  },
                },
              })}
            >
            </TextField>

            <Box sx={{ position: 'relative'}} ref={calendarRef}>
              <TextField
                
                label="¿Cuándo?"
                placeholder="Elige una fecha"
                size="small"
                fullWidth
                className="input-fecha"
                value={
                  fechaInicio && fechaFin
                  ? `${format(fechaInicio, "dd/MM/yyyy")} - ${format(fechaFin, "dd/MM/yyyy")}`
                  : ""
                }
                onClick={() => setOpen(true)}
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
                      inline
                      locale={es}
                      monthsShown={2}
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
