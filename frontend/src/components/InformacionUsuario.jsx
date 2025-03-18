/* eslint-disable react/prop-types */
import {
    Typography,
    Box,
    Avatar,
    Card,
    CardContent,
  } from "@mui/material";

const InformacionUsuario = ({currentUser, obtenerIniciales, obtenerRolTexto}) => {
  return (
    <Card
    sx={{
      backgroundColor: "background.default",
      mt: 2,
      width: "100%",
    }}
  >
    <Box
      sx={{
        display: "flex",
        px: 2.5,
        py: 2,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          typography: {
            mobile: "h6",
            tablet: "h5",
            desktop: "h5",
          },
        }}
      >
        {currentUser.nombre}
      </Typography>

      <Avatar
        sx={{
          width: {
            mobile: "40px",
            tablet: "100px",
          },
          height: {
            mobile: "40px",
            tablet: "100px",
          },
          bgcolor: "secondary.main",
          fontSize: {
            tablet: "48px",
          },
        }}
      >
        {obtenerIniciales(currentUser.nombre)}
      </Avatar>
    </Box>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 2.5,
        py: 2,
      }}
    >
      <Typography
        sx={{
          typography: { mobile: "body2", tablet: "subtitle1" },
        }}
      >
        Tipo Usuario
      </Typography>
      <Typography
        gutterBottom
        sx={{
          typography: { mobile: "body1", tablet: "h6" },
          fontWeight: { mobile: 600 },
          pb: 2,
        }}
      >
        {obtenerRolTexto(currentUser.id_rol)}
      </Typography>
      <Typography
        sx={{
          typography: { mobile: "body2", tablet: "subtitle1" },
        }}
      >
        Correo electrónico
      </Typography>
      <Typography
        gutterBottom
        sx={{
          typography: { mobile: "body1", tablet: "h6" },
          fontWeight: { mobile: 600 },
        }}
      >
        {currentUser.email}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default InformacionUsuario