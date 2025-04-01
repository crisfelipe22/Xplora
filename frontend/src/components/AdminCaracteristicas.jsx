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
  DialogTitle,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import styles from "../styles/AddCaracteristicaForm.module.css";
import SidebarAdmin from "./SidebarAdmin";
import AdminLayout from "./AdminLayout";
import { useIcons } from "../contexts/IconContext";
import usePaginacionDinamica from "../hooks/usePaginacionDinamica";

//

const AdminCaracteristicas = () => {
  const { icons: iconosDisponibles } = useIcons();
  const [nombreCaracteristica, setNombreCaracteristica] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pag, setPag] = useState(0);
  const { columnPorPag, setColumnPorPag } = usePaginacionDinamica(48, 3);

  const IconoCaracteristica = ({ iconId }) => {
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
    setEditMode(false);
    setCaracteristicaEditando(null);
  };

  const handleGuardarCaracteristica = async () => {
    if (nombreCaracteristica && iconoSeleccionado) {
      setIsSubmitting(true);

      try {
        // Prepare data according to your DTO format
        const caracteristicaData = {
          nombre: nombreCaracteristica,
          logo: parseInt(iconoSeleccionado, 10).toString(),
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
  const handleEliminarCaracteristica = async (id) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar esta característica?"
      )
    ) {
      try {
        const response = await axios.delete(`/api/caracteristica/${id}`);
        console.log("Característica eliminada:", response.data);

        // Refresh the list of characteristics
        const updatedCaracteristicas = await axios.get("/api/caracteristica");
        setAllCaracteristicas(updatedCaracteristicas.data);

        // Show success message
        setOpenAlertExito(true);
        setTimeout(() => setOpenAlertExito(false), 3000);
      } catch (error) {
        console.error("Error al eliminar la característica:", error);
        setErroresRequest(
          error?.response?.data?.mensaje ||
            "Error al eliminar la característica"
        );
        setOpenAlertFracaso(true);
      }
    }
  };

  // Add these state variables for editing
  const [editMode, setEditMode] = useState(false);
  const [caracteristicaEditando, setCaracteristicaEditando] = useState(null);

  // Add this function to handle opening the edit dialog
  const handleOpenEditDialog = (carac) => {
    setEditMode(true);
    setCaracteristicaEditando(carac);
    setNombreCaracteristica(carac.nombre);
    setIconoSeleccionado(carac.logo);
    setDialogCaracteristicas(true);
  };

  // Update handleCloseDialogCarac to also reset edit mode

  const handleActualizarCaracteristica = async () => {
    if (nombreCaracteristica && iconoSeleccionado && caracteristicaEditando) {
      setIsSubmitting(true);

      try {
        // Prepare data according to your DTO format
        const caracteristicaData = {
          nombre: nombreCaracteristica,
          logo: parseInt(iconoSeleccionado, 10).toString(),
        };

        // Make PUT request
        const response = await axios.put(
          `/api/caracteristica/${caracteristicaEditando.id}`,
          caracteristicaData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Característica actualizada:", response.data);

        // Refresh the list of available characteristics
        const updatedCaracteristicas = await axios.get("/api/caracteristica");
        setAllCaracteristicas(updatedCaracteristicas.data);

        // Show success message
        setOpenAlertExito(true);

        // Close dialog and reset form
        handleCloseDialogCarac();
      } catch (error) {
        console.error("Error al actualizar la característica:", error);
        setOpenAlertFracaso(true);
        setErroresRequest(
          error?.response?.data?.mensaje ||
            "Error al actualizar la característica"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
          <Container className={styles.botonNuevaCarac}>
            <Box
              component="form"
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <Box className={styles.seccion}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Typography className={styles.h6} variant="h6" gutterBottom>
                    Administrar características
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleOpenDialogCarac}
                    className={styles.botonNuevaCarac}
                  >
                    AÑADIR NUEVA
                  </Button>
                </Box>
                <TableContainer className={styles.tableContainer}>
                  <Table size="small">
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
                      {caracteristicasDisponibles
                        .slice(
                          pag * columnPorPag,
                          pag * columnPorPag + columnPorPag
                        )
                        .map((carac, index) => (
                          <TableRow key={index} className={styles.tableRow}>
                            <TableCell>
                              {/* Pass the icon ID to the IconoCaracteristica component */}
                              <IconoCaracteristica
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
                                  handleEliminarCaracteristica(carac.id)
                                }
                              >
                                Eliminar
                              </Button>
                              <Button
                                variant="outlined"
                                className={styles.botonEditar}
                                onClick={() => handleOpenEditDialog(carac)}
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
                  onRowsPerPageChange={(event) =>
                    setColumnPorPag(parseInt(event.target.value, 10))
                  }
                  labelRowsPerPage="Filas por página"
                  sx={{ marginTop: "auto" }}
                  rowsPerPageOptions={Array.from(
                    { length: 5 },
                    (_, i) => (i + 1) * 10
                  )}
                />

                <Dialog
                  open={dialogCaracteristicas}
                  onClose={handleCloseDialogCarac}
                  maxWidth="sm"
                  fullWidth
                >
                  <DialogTitle>
                    {editMode
                      ? "Editar Característica"
                      : "Agregar Característica"}
                  </DialogTitle>
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
                      onClick={
                        editMode
                          ? handleActualizarCaracteristica
                          : handleGuardarCaracteristica
                      }
                      color="primary"
                      variant="contained"
                      disabled={
                        !nombreCaracteristica ||
                        !iconoSeleccionado ||
                        isSubmitting
                      }
                    >
                      {isSubmitting
                        ? "Guardando..."
                        : editMode
                        ? "Actualizar"
                        : "Guardar"}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>

              {/* Add this at the end of your component, right before the closing tags */}
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
                  {"¡Los cambios fueron aplicados!"}
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
            </Box>
          </Container>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminCaracteristicas;
