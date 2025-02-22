// eslint-disable-next-line no-unused-vars
import React from "react";
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
              <img src="https://s3-alpha-sig.figma.com/img/99ee/a096/6a8f6ea11be8b03b86ec85d65982177d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=S~QBpu0mQ--UC2xL69ChHSLqnjFOXvRO8yJ8ySXPChv6FSCODbjsg5MxMmTCjl1V4qZCQxR3t9-8oU~UPPLZQo9yAJ4OdCp3g7u3UpfrwDbD8OIJHq52Z2KnjSVvgmQjrkz5offpsIAjbG6GI5vzuKj4ka9B43TweTg~RZ42PzDWt5hX~BeptZD7GP0d0co9PPGoY7yJGh7~6p5MyeqTqDCLG-X6RJ2wNoUnDIcv2pq7UWeSADVIu7eK7p5oB8OVjdSL0ud~gnoavCwxkv3SR434dV9hqXN3akeOVEgXS8g6c0RWZa1uf3mXBRLTwNI~qhk~5FJp5Ym~MHQlBg4Zhg__" alt="" />
            </ImageListItem>
            <ImageListItem key="2">
              <img src="https://s3-alpha-sig.figma.com/img/708f/1c4d/b55322b4e325a3c31ca4c83ba261b3dd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=B0~YBqcxlYGe261xRoIlKF2arTgew49NYNV8CzOFGKNqKfIG1lSVvMeBeGaoo8CPflsF9RlPsNSyj4pNilVPvowF39V6SOPWFk6RxaVgy1Aer00bAToN6AC3sLIlL8mlTdLdMAJVBIPAzUPuGiShrETG2UP5-r1xeJywYqVRxgC0aH8GgRq52Z1moClsODRN8~cPEz~f0ohE1vRn8ORbirmgxGUsf2ibiL44sB1c4ad5CZHSvsw7QKDGlaShngSAXh-Y~k2uhdsfvycAdgrLNH8df0bedi1m3ndwzgxOQhrTKgdEyzWLeOj2LyroMD4Z3sV-oOV8ocKzX6X2SifNKA__" alt="" />
            </ImageListItem>
            <ImageListItem key="3">
              <img src="https://s3-alpha-sig.figma.com/img/c348/c08f/a883738a693bf25a2f96cb3232729b60?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OOkV5BriOS389OclQv4jWdmUHQ9VBU8kQ2t3gXsRrndF8P5v3RxY2y54a9mTmESwGtnJ1qSfVKvKoEy7Djn1Qz6YycXeMOoepCmQte-csqUaO3lTZ8MxYsnFfTocbAulNTynhCcl~7jdDkhn~45SkLi40VaqkZ5DTD98YghBS8fKXwMOtjCtbBTZHzhqvYwTljhimz~1YE21C241l8BMG7QpXp2ZhC-OTGnDdmt2Fkvs0TKmKhO11q79hgVyPpPC8GU6KCrVz9gkz5M98sXB00NQqVTW8AIoL9NtflTHqr9SaDNP7t~e5NCow-lnDFRCbDafbA~GA6CGLJKxYPTApA__" alt="" />
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
            defaultValue="Playa, masajes, cena, cabalgata..."
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
            defaultValue="Elegir fecha"
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
          <Button
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
  );
};

export default Home;
