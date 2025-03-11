/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Import styles
import { Box, Button, Container, ImageList, ImageListItem, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import BeachAccessFilled from '@mui/icons-material/BeachAccess';
import CalendarTodayFilled from '@mui/icons-material/CalendarToday';
import ProductoAleatorio from "../components/ProductoAleatorio";
import { BeachAccess, CalendarToday } from "@mui/icons-material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]); 
  const navigate = useNavigate();
  
  const handleBuscar = () => {
    const [fechaInicio, fechaFin] = dateRange;
    if (!query || !fechaInicio || !fechaFin) {
      alert("Por favor completa todos los campos.");
      return;
    }
    
    const formattedFechaInicio = dayjs(fechaInicio).format("YYYY-MM-DD");
    const formattedFechaFin = dayjs(fechaFin).format("YYYY-MM-DD");

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
              className="search-inputs"
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
            <TextField
              label="¿Cuándo?"
              placeholder="Elegir fecha"
              size="small"
              margin="normal"
              className="search-inputs"
              {...(!isMobile && {
                slotProps: {
                  input: {
                    startAdornment: <InputAdornment position="start"> <CalendarTodayFilled/> </InputAdornment>,
                  },
                },
              })}
            >
            </TextField>
            {/*///////////////////////// */}
            <DateRangePicker
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              localeText={{ start: "Desde", end: "Hasta" }}
              sx={{
                flexGrow: { tablet: "3" },
                marginTop: "8px",
              }}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    size="small"
                    margin="normal"
                    className="search-inputs"
                    sx={{
                      flexGrow: { tablet: "3" },
                    }}
                    {...(!isMobile && {
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday />
                          </InputAdornment>
                        ),
                      },
                    })}
                  />
                ),
              }}
            />
            {/*///////////////////////// */}
            
              <Button
                onClick={handleBuscar}
                variant="contained"
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
