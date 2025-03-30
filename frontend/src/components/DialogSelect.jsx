import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useIcons } from "../contexts/IconContext";

export default function DialogSelect({
  buttonText = "Abrir",
  options = [],
  product = {},
  updateProduct, // Remove default empty object
}) {
  const [open, setOpen] = React.useState(false);
  const { icons: iconosDisponibles } = useIcons();
  const [iconoSeleccionado, setIconoSeleccionado] = useState("");

  const availableOptions = options.filter(
    (option) =>
      !product.caracteristicas_paquete_experiencia?.some(
        (existingChar) => existingChar.id_caracteristica === option.id
      )
  );

  console.log(
    "Existing characteristics:",
    product.caracteristicas_paquete_experiencia
  );
  console.log("Available options:", availableOptions);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handlePick = () => {
    // Create a new characteristic object
    const newCaracteristica = {
      id_paquete_experiencia: product.id_paquete_experiencia,
      id_caracteristica: iconoSeleccionado,
    };

    // Create a new array with the existing characteristics and the new one
    const updatedCaracteristicas = [
      ...product.caracteristicas_paquete_experiencia,
      newCaracteristica,
    ];

    // Create a new product object with updated characteristics
    const updatedProduct = {
      ...product,
      caracteristicas_paquete_experiencia: updatedCaracteristicas,
    };

    // Call the update function from the parent
    updateProduct(updatedProduct);
    setIconoSeleccionado("");

    // Close the dialog
    setOpen(false);
  };

  const IconoCaracteristica = ({ iconId }) => {
    const IconComponent =
      iconosDisponibles.find((icon) => icon.id === iconId)?.component ||
      iconosDisponibles[0].component;
    return <IconComponent />;
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Selecciona una característica</DialogTitle>
        <DialogContent>
          <FormControl sx={{ mt: 2, minWidth: 240 }}>
            <InputLabel htmlFor="demo-dialog-native">
              Características
            </InputLabel>
            <Select
              value={iconoSeleccionado}
              onChange={(e) => setIconoSeleccionado(e.target.value)}
              
              input={
                <OutlinedInput
                  label="Características"
                  id="demo-dialog-native"
                />
              }
            >
              <MenuItem value="" disabled>
                Selecciona una opción
              </MenuItem>
              {availableOptions.map((icon) => (
                <MenuItem
                  key={icon.id}
                  value={icon.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "nowrap",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconoCaracteristica iconId={parseInt(icon.logo, 10)} />
                    <Typography sx={{ ml: 2 }}>{icon.nombre}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePick} disabled={!iconoSeleccionado}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
