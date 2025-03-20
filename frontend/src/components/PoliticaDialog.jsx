/* eslint-disable react/prop-types */
import {
  Typography,
  List,
  ListItem,
  Dialog,
  IconButton,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PoliticaDialog = ({ open, close, scroll }) => {
  return (
    <Dialog open={open} onClose={close} scroll={scroll}>
      <DialogTitle
        id="scroll-dialog-title"
        sx={{
          typography: { mobile: "subtitle1", tablet: "h5" },
          textDecoration: "underline",
        }}
      >
        Política de uso de Experiencias
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers={scroll === "paper"}>
        <Typography
          sx={{
            typography: { mobile: "subtitle1", tablet: "h6" },
            fontWeight: { mobile: 500 },
          }}
        >
          Experiencias Explora
        </Typography>
        <Typography
          gutterBottom
          sx={{
            typography: { mobile: "body2", tablet: "body1" },
          }}
        >
          Xplora ofrece experiencias de distintas categorías (tales como y sin
          que ello implique limitación alguna, experiencias gastronómicas, de
          aventura, de relajación, viajes, entre otras), las cuales dan derecho
          al Cliente al uso y goce de bienes y/o servicios (la/s
          “Experiencia/s”) ofrecidos por terceros (el/los “Prestador/es”),
          independientes y ajenos a Xplora.
        </Typography>

        <Typography
          sx={{
            typography: { mobile: "subtitle1", tablet: "h6" },
            fontWeight: { mobile: 500 },
          }}
        >
          A. Compra y Entrega
        </Typography>

        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            Las compras se realizan en el sitio web con registro previo.
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            El cliente recibe una confirmación por correo electrónico con el
            detalle de la compra.
          </ListItem>
        </List>

        <Typography
          sx={{
            typography: { mobile: "subtitle1", tablet: "h6" },
            fontWeight: { mobile: 500 },
          }}
        >
          B. Uso de la Experiencia
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            Cada código tiene una fecha de vencimiento.
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            El cliente debe contactar al Prestador para reservar, usando el
            código.
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            Las reservas canceladas fuera del plazo del prestador, implica que
            el código se considera utilizado.
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            El cliente puede usar el código hasta la fecha de vencimiento.
          </ListItem>
        </List>

        <Typography
          sx={{
            typography: { mobile: "subtitle1", tablet: "h6" },
            fontWeight: { mobile: 500 },
          }}
        >
          C. Vencimiento y Crédito
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            Los códigos vencidos se convierten en crédito en el sitio web por 60
            días.
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            El crédito es equivalente al valor de la experiencia original.
          </ListItem>
        </List>

        <Typography
          sx={{
            typography: { mobile: "subtitle1", tablet: "h6" },
            fontWeight: { mobile: 500 },
          }}
        >
          D. Obligaciones del Cliente
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 2 }}>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            El cliente elige la experiencia y reserva directamente con el
            Prestador.
          </ListItem>
          <ListItem
            sx={{
              display: "list-item",
              typography: { mobile: "body2", tablet: "body1" },
            }}
          >
            Debe cumplir con las normas y políticas del Prestador.
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default PoliticaDialog;
