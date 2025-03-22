/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Alert,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, TablePagination 
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import styles from "../styles/AddCaracteristicaForm.module.css";
import SidebarAdmin from "./SidebarAdmin";
import AdminLayout from "./AdminLayout";
//iconos//
import {
  LocalParking,
  CalendarToday,
  Landscape,
  FreeBreakfast,
  Pets,
  OutdoorGrill,
  Wifi,
  Brush,
} from "@mui/icons-material";
import { useIcons } from "../contexts/IconContext";
import usePaginacionDinamica from '../hooks/usePaginacionDinamica';

//

const AdminCaracteristicas = () => {
  const { icons: iconosDisponibles } = useIcons();
  const [nombreCaracteristica, setNombreCaracteristica] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [pag, setPag] = useState(0);
  const {columnPorPag, setColumnPorPag } = usePaginacionDinamica(98, 3)
      
  // Replace your current Iconardo function with this:
  const Iconardo = ({ iconId }) => {
    const IconComponent =
      iconosDisponibles.find((icon) => icon.id === iconId)?.component ||
      iconosDisponibles[0].component;
    return <IconComponent />;
  };

  const [caracteristicasDisponibles, setAllCaracteristicas] = useState([""]);
  useEffect(() => {
    const fetchCaracteristicas = async () => {
      try {
        const response = await axios.get("/api/caracteristica");
        console.log("response.data: ", response.data);
        setAllCaracteristicas(response.data);
      } catch (error) {
        console.error("Error al cargar características:", error);
      }
    };

    fetchCaracteristicas();
  }, []);

  const [errores, setErrores] = useState({});
  const [erroresRequest, setErroresRequest] = useState({});
  const [openAlertExito, setOpenAlertExito] = useState(false);
  const [openAlertFracaso, setOpenAlertFracaso] = useState(false);
  let navigate = useNavigate();

  const handleCloseAlertExito = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenAlertExito(false);
  };

  const handleCloseAlertFracaso = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenAlertFracaso(false);
  };

  const [categorias, setCategorias] = useState([]);

  //CARACTERISTICAS///////
  // const caracteristicasDisponibles = [
  //   { id_car: 1, nombre: "Estacionamiento gratuito" },
  //   { id_car: 2, nombre: "Fechas flexibles" },
  //   { id_car: 3, nombre: "Vista a las montañas" },
  //   { id_car: 4, nombre: "Desayuno incluido" },
  //   { id_car: 5, nombre: "Se permiten mascotas" },
  //   { id_car: 6, nombre: "Zona de comida al aire libre" },
  //   { id_car: 7, nombre: "Servicio de Wi-Fi" },
  //   { id_car: 8, nombre: "Servicio de decoración" },
  // ];

  const [caracteristicas, setCaracteristicas] = useState([]);
  const [dialogCaracteristicas, setDialogCaracteristicas] = useState(false);
  const [caracteristicaSeleccionada, setCaracteristicaSeleccionada] =
    useState("");
  const [iconoSeleccionado, setIconoSeleccionado] = useState("");

  const handleOpenDialogCarac = () => {
    setDialogCaracteristicas(true);
  };

  const handleCloseDialogCarac = () => {
    setDialogCaracteristicas(false);
    setNombreCaracteristica("");
    setIconoSeleccionado("");
  };

  const handleGuardarCaracteristica = async () => {
    if (nombreCaracteristica && iconoSeleccionado) {
      setIsSubmitting(true);

      try {
        // Prepare data according to your DTO format
        const caracteristicaData = {
          nombre: nombreCaracteristica,
          logo: (parseInt(iconoSeleccionado, 10)).toString(),
        };

        // Make POST request
        const response = await axios.post(
          "/api/caracteristica",
          caracteristicaData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Característica agregada:", response.data);

        // Refresh the list of available characteristics
        const updatedCaracteristicas = await axios.get("/api/caracteristica");
        setAllCaracteristicas(updatedCaracteristicas.data);

        // Show success message
        setOpenAlertExito(true);

        // Close dialog and reset form
        handleCloseDialogCarac();
        setNombreCaracteristica("");
        setIconoSeleccionado("");
      } catch (error) {
        console.error("Error al guardar la característica:", error);
        setOpenAlertFracaso(true);
        setErroresRequest(
          error?.response?.data?.mensaje || "Error al guardar la característica"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const handleEliminarCaracteristica = (id_car_prod) => {
    setCaracteristicas(
      caracteristicas.filter((item) => item.id_car_prod !== id_car_prod)
    );
  };

  /////////
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get("/api/categoria");
        setCategorias(response.data);
        console.log();
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      //llamada a POST
      try {
        const response = await axios.post(
          "/api/paquete-experiencia",
          productFormatoEnvio,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Producto agregado:", response.data);
        resetState();
        setOpenAlertExito(true);

        setTimeout(() => {
          setOpenAlertExito(false);
          navigate("/admin/productos");
        }, 3000);
      } catch (error) {
        console.error("Error al enviar el producto:", error);
        setErroresRequest(error?.response?.data["mensaje: "]);
        setOpenAlertFracaso(true);
      }
    } else {
      console.log("no se puede enviar el formulario", errores);
      return;
    }
  };

  return (
    <AdminLayout>
      <Box className={styles.contenedorPrincipal}>
        <SidebarAdmin />

        <Box className={styles.contenido}>
          <Container className={styles.container}>
            <Box
              component="form"
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <Box className={styles.seccion}>
                <Typography className={styles.h6} variant="h6" gutterBottom>
                  Administrar características
                </Typography>

                <TableContainer className={styles.tableContainer}>
                  <Button
                    variant="contained"
                    onClick={handleOpenDialogCarac}
                    className={styles.botonNuevaCarac}
                  >
                    AÑADIR NUEVA
                  </Button>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.tableHeader}>
                          Ícono
                        </TableCell>
                        <TableCell className={styles.tableHeader}>
                          Características
                        </TableCell>
                        <TableCell className={styles.tableHeader}>
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {caracteristicasDisponibles.slice(pag * columnPorPag, pag * columnPorPag + columnPorPag)
                      .map((carac, index) => (
                        <TableRow key={index} className={styles.tableRow}>
                          <TableCell>
                            {/* Pass the icon ID to the Iconardo component */}
                            <Iconardo
                              iconId={
                                parseInt(carac.logo, 10) || carac.id_icono
                              }
                            />
                          </TableCell>
                          <TableCell>{carac.nombre}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              className={styles.botonEliminar}
                              onClick={() =>
                                handleEliminarCaracteristica(carac.id_car_prod)
                              }
                            >
                              Eliminar
                            </Button>
                            <Button
                              variant="outlined"
                              className={styles.botonEditar}
                            >
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  component="div"
                  count={caracteristicasDisponibles.length}
                  rowsPerPage={columnPorPag}
                  page={pag}
                  onPageChange={(event, newPage) => setPag(newPage)}
                  onRowsPerPageChange={(event) => setColumnPorPag(parseInt(event.target.value, 10))}
                  labelRowsPerPage="Filas por página"
                  sx={{ marginTop: "auto" }}
                  rowsPerPageOptions={Array.from({ length: 100 }, (_, i) => i + 1)}
                />

                <Dialog
                  open={dialogCaracteristicas}
                  onClose={handleCloseDialogCarac}
                  maxWidth="sm"
                  fullWidth
                >
                  <DialogTitle>Agregar Característica</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Nombre de la característica"
                      type="text"
                      fullWidth
                      value={nombreCaracteristica}
                      onChange={(e) => setNombreCaracteristica(e.target.value)}
                      inputProps={{ maxLength: 255 }}
                      helperText={`${nombreCaracteristica.length}/255 caracteres`}
                      style={{ marginBottom: "16px" }}
                    />

                    <FormControl fullWidth style={{ marginTop: "16px" }}>
                      <InputLabel>Selecciona un icono</InputLabel>
                      <Select
                        value={iconoSeleccionado}
                        onChange={(e) => setIconoSeleccionado(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Selecciona un icono
                        </MenuItem>
                        {iconosDisponibles.map((icon) => (
                          <MenuItem key={icon.id} value={icon.id}>
                            {React.createElement(icon.component, {
                              style: { fontSize: 24, marginRight: 8 },
                            })}
                            {`Icono ${icon.id}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handleCloseDialogCarac} color="secondary">
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleGuardarCaracteristica}
                      color="primary"
                      variant="contained"
                      disabled={
                        !nombreCaracteristica ||
                        !iconoSeleccionado ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? "Guardando..." : "Guardar"}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>

              {/* <Box className={styles.botones}>
                <Snackbar
                  open={openAlertExito}
                  autoHideDuration={3000}
                  onClose={handleCloseAlertExito}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert
                    onClose={handleCloseAlertExito}
                    severity="success"
                    className={styles.alertaExito}
                  >
                    ¡Producto agregado con éxito!
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openAlertFracaso}
                  autoHideDuration={3000}
                  onClose={handleCloseAlertFracaso}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert
                    onClose={handleCloseAlertFracaso}
                    severity="error"
                    className={styles.alertaFracaso}
                  >
                    {erroresRequest}
                  </Alert>
                </Snackbar>
              </Box> */}
            </Box>
          </Container>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminCaracteristicas;
