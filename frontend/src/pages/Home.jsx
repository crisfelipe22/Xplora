/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Home.css"; // Import styles
import { Box, Button, Container, ImageList, ImageListItem, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import BeachAccessFilled from '@mui/icons-material/BeachAccess';
import CalendarTodayFilled from '@mui/icons-material/CalendarToday';
import ProductoAleatorio from "../components/ProductoAleatorio";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
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
            sx={{
              flexGrow: {tablet: "3"},
            }}
            {...(!isMobile && {
              slotProps: {
                input: {
                  startAdornment: <InputAdornment position="start"> <BeachAccessFilled/> </InputAdornment>,
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
          
          <Link to="`/resultados?query=${query}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`">
            <Button
              variant="contained"
              sx={{display: "block", height: {tablet: "40px !important"}}}
              {...(isMobile ? {} : { size: "small" })}
            >
              BUSCAR
            </Button>
          </Link>
        </Box>
      </Container>

        <Container sx={{padding:"0px"}}>
          <Typography variant="h5" className="titulo-recomendados" >
            Lo que nuestros Xplorers recomiendan
          </Typography>
          <ProductoAleatorio />
        </Container>
    </Box>
  );
};

export default Home;
