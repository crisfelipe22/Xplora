/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useIcons } from "../contexts/IconContext";
import DialogSelect from "./DialogSelect";
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
  Stack,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import styles from "../styles/AddProductForm.module.css";
import SidebarAdmin from "./SidebarAdmin";
import AdminLayout from "./AdminLayout";
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

import { useCategories } from "../contexts/CategoryContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import dayjs from "dayjs";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    ubicacion: "",
    id_categoria: "",
    imagen: [],
    fecha_inicio: null,
    fecha_fin: null,
    caracteristicas_paquete_experiencia: [],
  });

  const [errores, setErrores] = useState({});
  const [erroresRequest, setErroresRequest] = useState({});
  const [openAlertExito, setOpenAlertExito] = useState(false);
  const [openAlertFracaso, setOpenAlertFracaso] = useState(false);

  let navigate = useNavigate();
  const { categorias } = useCategories();
  const { icons: iconosDisponibles } = useIcons();

  const [caracteristicasDisponibles, setCaracteristicasDisponibles] = useState(
    []
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch available characteristics
  useEffect(() => {
    const obtenerCaracteristicasDisponibles = async () => {
      try {
        const response = await axios.get("/api/caracteristica");
        setCaracteristicasDisponibles(response.data);
      } catch (error) {
        console.error("Error al obtener las características: ", error);
      }
    };

    obtenerCaracteristicasDisponibles();
  }, []);

  const handleCloseAlertExito = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenAlertExito(false);
  };

  const handleCloseAlertFracaso = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenAlertFracaso(false);
  };

  const IconoCaracteristica = ({ iconId }) => {
    const IconComponent =
      iconosDisponibles.find((icon) => icon.id === iconId)?.component ||
      iconosDisponibles[0].component;
    return <IconComponent />;
  };
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
    setCaracteristicaSeleccionada("");
    setIconoSeleccionado("");
  };

  const handleGuardarCaracteristica = () => {
    if (caracteristicaSeleccionada && iconoSeleccionado) {
      const caracteristica = caracteristicasDisponibles.find(
        (c) => c.id_car === Number(caracteristicaSeleccionada)
      );

      setCaracteristicas((prev) => [
        ...prev,
        {
          id_car_prod: Date.now(),
          id_car: caracteristica.id_car,
          id_icono: iconoSeleccionado,
          nombre: caracteristica.nombre,
          icono: iconosDisponibles[iconoSeleccionado],
        },
      ]);
      handleCloseDialogCarac();
      console.log(caracteristicas);
    }
  };
  const handleEliminarCaracteristica = (idAEliminar) => {
    const updatedTraits = product.caracteristicas_paquete_experiencia.filter(
      (caracteristica) => caracteristica.id_caracteristica !== idAEliminar
    );
    setProduct((prev) => ({
      ...prev,
      caracteristicas_paquete_experiencia: updatedTraits,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleStartDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      setStartDate(date);
      setProduct((prev) => ({ ...prev, fecha_inicio: formattedDate }));
      console.log("date: " + date + "date formato: " + formattedDate);
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      setEndDate(date);
      setProduct((prev) => ({ ...prev, fecha_fin: formattedDate }));
    }
  };

  const validaciones = () => {
    let erroresObj = {};
    if (product.nombre.trim().length < 3) {
      erroresObj.nombre =
        "El nombre del producto es obligatorio y debe tener mínimo 3 carácteres";
    }
    if (product.descripcion.trim().length < 10) {
      erroresObj.descripcion =
        "La descripción del producto es obligatoria y debe tener mínimo 10 carácteres";
    }
    if (!product.precio.trim()) {
      erroresObj.precio = "El precio es obligatorio";
    } else if (isNaN(Number(product.precio))) {
      erroresObj.precio = "El precio debe ser un número";
    } else if (Number(product.precio) < 0) {
      erroresObj.precio = "El precio no puede ser negativo";
    }
    if (isNaN(Number(product.precio))) {
      erroresObj.precio = "El precio debe ser un número ";
    }
    if (!product.ubicacion.trim()) {
      erroresObj.ubicacion = "La ubicación es obligatoria";
    }
    if (product.imagen.length === 0) {
      erroresObj.imagen = "Se debe incluir al menos una imagen del producto";
    }
    if (product.id_categoria === "") {
      erroresObj.id_categoria = "Se debe escoger una categoría";
    }
    if (product.fecha_inicio === null) {
      erroresObj.fecha_inicio = "Se debe seleccionar una fecha de inicio";
    }
    if (product.fecha_fin === null) {
      erroresObj.fecha_fin = "Se debe seleccionar una fecha de fin";
    }

    setErrores(erroresObj);
    return Object.keys(erroresObj).length === 0;
  };

  const handleUploadImagenes = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const archivos = Array.from(e.target.files);

    const imagenesSubir = archivos.map((archivo) => ({
      archivo,
      nombre: archivo.name,
      status: "Cargando",
      url: null,
    }));
    setProduct({ ...product, imagen: [...product.imagen, ...imagenesSubir] });
    console.log(product.imagen);

    const imagenesSubidas = await Promise.all(
      imagenesSubir.map(async (img) => {
        const resultado = await subirImagenAlServidor(img.archivo);
        return {
          ...img,
          status: resultado.success ? "Completado" : "Fallido",
          url: resultado.success ? resultado.url : null,
        };
      })
    );
    setProduct((prev) => ({
      ...prev,
      imagen: prev.imagen.map(
        (imagen) =>
          imagenesSubidas.find((img) => img.nombre === imagen.nombre) || imagen
      ),
    }));
  };

  const eliminarImagen = (index) => {
    const imagenesSubir = product.imagen.filter((_, i) => i !== index);
    setProduct({ ...product, imagen: imagenesSubir });
  };

  const resetState = () => {
    setProduct({
      nombre: "",
      descripcion: "",
      precio: "",
      ubicacion: "",
      id_categoria: "",
      imagen: [],
      fecha_inicio: "",
      fecha_fin: "",
    });
    navigate("/admin/productos");
  };

  const productFormatoEnvio = {
    ...product,
    precio: Number(product.precio),
    imagen: product.imagen
      .filter((img) => img.status === "Completado" && img.url)
      .map((img) => img.url)
      .join(","),
    duracion: "30 min",
    id_categoria: Number(product.id_categoria),
    caracteristicas_paquete_experiencia:
      product.caracteristicas_paquete_experiencia.map((caracteristica) => ({
        id_caracteristica: caracteristica.id_caracteristica,
      })),
  };

  const subirImagenAlServidor = async (archivo) => {
    const formData = new FormData();
    formData.append("image", archivo);
    //para la API, la respuesta es response.data.data.url (no response.data.url)
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=3a27a2eb2845f0a6d1f2712d0f5b0ca2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: undefined,
          },
          withCredentials: false,
        }
      );

      if (response.data && response.data.data.url) {
        return { success: true, url: response.data.data.url };
      } else {
        throw new Error("No se recibió una URL válida del servidor");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return { success: false };
    }
  };

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className={styles.contenedorPrincipal}>
          <SidebarAdmin />

          <Box className={styles.contenido}>
            <Box className={styles.titleLista}>
              <Typography variant="h4" className={styles.titleListaProductos}>
                Lista de Productos
              </Typography>
            </Box>
            <Box className={styles.titleProduct}>
              <Typography variant="h4" className={styles.titleProducts}>
                Nuevo producto
              </Typography>
            </Box>

            <Container className={styles.container}>
              <Box
                component="form"
                className={styles.form}
                onSubmit={handleSubmit}
              >
                <Box className={styles.seccion}>
                  <Typography className={styles.h6} variant="h6" gutterBottom>
                    Descripción del producto
                  </Typography>

                  <TextField
                    className={styles.textField}
                    label="Nombre"
                    name="nombre"
                    value={product.nombre}
                    onChange={handleChange}
                    error={!!errores.nombre}
                    helperText={errores.nombre}
                    fullWidth
                  />

                  <TextField
                    className={styles.textField}
                    label="Descripción"
                    name="descripcion"
                    value={product.descripcion}
                    onChange={handleChange}
                    error={!!errores.descripcion}
                    helperText={errores.descripcion}
                    multiline
                    rows={2}
                    fullWidth
                  />

                  <TextField
                    className={styles.textField}
                    label="Precio"
                    name="precio"
                    value={product.precio}
                    onChange={handleChange}
                    error={!!errores.precio}
                    helperText={errores.precio}
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      },
                    }}
                  />

                  <TextField
                    className={styles.textField}
                    label="Ubicación"
                    name="ubicacion"
                    value={product.ubicacion}
                    onChange={handleChange}
                    error={!!errores.ubicacion}
                    helperText={errores.ubicacion}
                    fullWidth
                  />

                  <FormControl fullWidth className={styles.textField}>
                    <InputLabel id="categoria-label">Categoría</InputLabel>
                    <Select
                      name="id_categoria"
                      labelId="categoria-label"
                      value={product.id_categoria}
                      displayEmpty
                      onChange={handleChange}
                    >
                      <MenuItem value="" disabled>
                        Elige una categoría
                      </MenuItem>
                      {categorias.map((cat) => (
                        <MenuItem
                          key={cat.id_categoria}
                          value={cat.id_categoria}
                        >
                          {cat.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box className={styles.seccion}>
                  <Typography className={styles.h6} variant="h6" gutterBottom>
                    Subir Imágenes
                  </Typography>

                  <Box>
                    <Box className={styles.subirImg}>
                      <UploadFileIcon
                        className={styles.iconImg}
                        fontSize="small"
                      />
                      <Typography variant="body2">
                        <label htmlFor="upload">Selecciona archivo</label> o
                        arrastra para subir
                      </Typography>
                      <Typography variant="caption">
                        SVG, PNG, JPG o GIF (max. 3MB)
                      </Typography>
                      <input
                        id="upload"
                        type="file"
                        multiple
                        hidden
                        onChange={handleUploadImagenes}
                      />
                    </Box>

                    {product.imagen.length > 0 && (
                      <List className={styles.listaImg}>
                        {product.imagen.map((img, index) => (
                          <ListItem
                            key={index}
                            className={styles.listaItem}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                onClick={() => eliminarImagen(index)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            }
                          >
                            <UploadFileIcon
                              className={styles.iconUpload}
                              fontSize="small"
                            />

                            <ListItemText
                              className={styles.listaItemText}
                              primary={img.nombre}
                              secondary={
                                <span className={styles.imgText}>
                                  <span>
                                    {Math.round(img.archivo.size / 1024)}kb •{" "}
                                  </span>
                                  <span>{img.status}</span>

                                  {img.status === "Cargando" && (
                                    <LinearProgress
                                      className={styles.barraProgreso}
                                      variant="indeterminate"
                                    />
                                  )}
                                </span>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
                </Box>

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
                    <DialogSelect
                      product={product}
                      updateProduct={setProduct}
                      buttonText="AÑADIR NUEVA"
                      options={caracteristicasDisponibles}
                    ></DialogSelect>
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
                        {product.caracteristicas_paquete_experiencia &&
                          product.caracteristicas_paquete_experiencia.map(
                            (caracteristica_producto, index) => {
                              const carac = caracteristicasDisponibles.find(
                                (caracteristica) =>
                                  caracteristica.id ===
                                  caracteristica_producto.id_caracteristica
                              );

                              return (
                                <TableRow
                                  key={index}
                                  className={styles.tableRow}
                                >
                                  <TableCell>
                                    {/* Pass the icon ID to the IconoCaracteristica component */}
                                    <IconoCaracteristica
                                      iconId={
                                        parseInt(carac?.logo, 10) ||
                                        carac?.id_icono
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>{carac?.nombre}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="outlined"
                                      className={styles.botonEliminar}
                                      onClick={() =>
                                        handleEliminarCaracteristica(carac?.id)
                                      }
                                    >
                                      Eliminar
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* Características producto -> Trae las del producto a un estado y haces una tabla. Trae todas las que existen a un Select y permite agregar nuevas, y también eliminar */}
                </Box>

                <Box className={styles.seccion}>
                  <Typography className={styles.h6} variant="h6" gutterBottom>
                    Disponibilidad del producto
                  </Typography>

                  <Stack spacing={2} direction="column">
                    <DatePicker
                      label="Fecha de inicio"
                      selected={startDate}
                      onChange={handleStartDateChange}
                      minDate={new Date()}
                      customInput={
                        <TextField
                          value={
                            startDate
                              ? startDate.toLocaleDateString("es-ES")
                              : ""
                          }
                          label="Fecha de inicio"
                          error={!!errores.fecha_inicio}
                          helperText={errores.fecha_inicio}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarToday />
                                </InputAdornment>
                              ),
                            },
                          }}
                          fullWidth
                        />
                      }
                    />
                    <DatePicker
                      label="Fecha fin"
                      selected={endDate}
                      onChange={handleEndDateChange}
                      disabled={!startDate}
                      minDate={startDate}
                      customInput={
                        <TextField
                          value={
                            endDate ? endDate.toLocaleDateString("es-ES") : ""
                          }
                          label="Fecha fin"
                          error={!!errores.fecha_fin}
                          helperText={errores.fecha_fin}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarToday />
                                </InputAdornment>
                              ),
                            },
                          }}
                          fullWidth
                        />
                      }
                    />
                  </Stack>
                </Box>

                <Box className={styles.botones}>
                  <Button
                    className={styles.botonAgregar}
                    type="submit"
                    variant="contained"
                  >
                    Añadir Producto
                  </Button>

                  <Button
                    className={styles.botonCancelar}
                    variant="outlined"
                    color="secondary"
                    onClick={() => resetState()}
                  >
                    Cancelar
                  </Button>

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
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </LocalizationProvider>
    </AdminLayout>
  );
};

export default AddProductForm;
