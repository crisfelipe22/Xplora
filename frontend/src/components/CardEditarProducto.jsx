/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
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
  Stack,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import styles from "../styles/AddProductForm.module.css";
import SidebarAdmin from "./SidebarAdmin";
import AdminLayout from "./AdminLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import dayjs from "dayjs";
import { CalendarToday } from "@mui/icons-material";
import { useIcons } from "../contexts/IconContext";
import DialogSelect from "./DialogSelect";

const CardEditarProducto = () => {
  const { icons: iconosDisponibles } = useIcons();
  const { id_paquete_experiencia } = useParams();

  const [errores, setErrores] = useState({});

  const [product, setProduct] = useState();
  const [categorias, setCategorias] = useState([]);
  const [caracteristicasDisponibles, setCaracteristicasDisponibles] = useState(
    []
  );
  
  let navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [openAlertExito, setOpenAlertExito] = useState(false);

  const handleCloseAlertExito = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenAlertExito(false);
  };

  const IconoCaracteristica = ({ iconId }) => {
    const IconComponent =
      iconosDisponibles.find((icon) => icon.id === iconId)?.component ||
      iconosDisponibles[0].component;
    return <IconComponent />;
  };

  const handleEliminarCaracteristica = (idAEliminar) => {
    console.log(product.caracteristicas_paquete_experiencia)
    console.log()
    const updatedTraits = product.caracteristicas_paquete_experiencia.filter(
      (caracteristica) => caracteristica.id_caracteristica != idAEliminar
    );
    product.caracteristicas_paquete_experiencia = updatedTraits;

    setProduct({...product})
    
    console.log(product?.caracteristicas_paquete_experiencia)
  }

  //LLAMADO GET
  useEffect(() => {
    const fetchProductoEditar = async () => {
      try {
        const response = await fetch(
          `/api/paquete-experiencia/${id_paquete_experiencia}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        const imagenesArray = data.imagen
          ? data.imagen.split(",").map((url) => ({ url, status: "Completado" }))
          : [];
        const precioString = data.precio.toString();
        const fechaInicioFormat = data.fecha_inicio
          ? new Date(data.fecha_inicio)
          : null;
        const fechaFinFormat = data.fecha_fin ? new Date(data.fecha_fin) : null;

        setProduct({
          ...data,
          precio: precioString,
          imagen: imagenesArray,
          fecha_inicio: fechaInicioFormat,
          fecha_fin: fechaFinFormat,
        });
      } catch (error) {
        console.error("Hubo un problema con la solicitud de la API:", error);
      }
    };

    const obtenerCategorias = async () => {
      try {
        const response = await axios.get("/api/categoria");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    const obtenerCaracteristicasDisponibles = async () => {
      try {
        const response = await axios.get("/api/caracteristica");
        setCaracteristicasDisponibles(response.data);
      } catch (error) {
        console.error("Error al obtener las características: ", error);
      }
    };

    obtenerCaracteristicasDisponibles();
    obtenerCategorias();
    fetchProductoEditar();
  }, [id_paquete_experiencia]);

  if (!product) {
    return <div>Cargando...</div>;
  }

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

  const productFormatoEnvio = {
    ...product,
    precio: Number(product.precio),
    imagen: product.imagen
      .filter((img) => img.status === "Completado" && img.url)
      .map((img) => img.url)
      .join(","),
    duracion: "30 min",
    id_categoria: Number(product.id_categoria),
  };

  const handleCancel = () => {
    navigate("/admin/productos");
  };

  //LLAMADO PUT

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      try {
        await axios.put(
          `/api/paquete-experiencia/${id_paquete_experiencia}`,
          productFormatoEnvio
        );
        setOpenAlertExito(true);
        setTimeout(() => {
          setOpenAlertExito(false);
          navigate("/admin/productos");
        }, 3000);
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
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
          <Box className={styles.titleLista}>
            <Typography variant="h4" className={styles.titleListaProductos}>
              Lista de Productos
            </Typography>
          </Box>
          <Box className={styles.titleProduct}>
            <Typography variant="h4" className={styles.titleProducts}>
              Editar Producto
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
                  rows={3}
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
                      <MenuItem key={cat.id_categoria} value={cat.id_categoria}>
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
                    <Box className={styles.imgPrevisualizar}>
                      {product.imagen.map((img, index) => (
                        <Box key={index} className={styles.imgBoxEditar}>
                          {img.status === "Cargando" ? (
                            <Box className={styles.progressContainerEditar}>
                              <LinearProgress
                                className={styles.barraProgreso}
                                variant="indeterminate"
                              />
                              <Typography variant="caption">
                                Subiendo {img.progreso}
                              </Typography>
                            </Box>
                          ) : img.status === "Fallido" ? (
                            <span className={styles.imgText}>
                              Error al subir
                            </span>
                          ) : (
                            <Box>
                              <img
                                src={img.url}
                                alt={`Vista ${index + 1}`}
                                className={styles.imgEditar}
                              />
                              <IconButton
                                className={styles.deleteIconEditar}
                                onClick={() => eliminarImagen(index)}
                                size="small"
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
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
                      {product.caracteristicas_paquete_experiencia.map(
                        (caracteristica_producto, index) => {
                          const carac = caracteristicasDisponibles.find(
                            (caracteristica) =>
                              caracteristica.id ===
                              caracteristica_producto.id_caracteristica
                          );

                          return (
                            <TableRow key={index} className={styles.tableRow}>
                              <TableCell>
                                {/* Pass the icon ID to the IconoCaracteristica component */}
                                <IconoCaracteristica
                                  iconId={
                                    parseInt(carac?.logo, 10) || carac?.id_icono
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
                    selected={product.fecha_inicio}
                    onChange={handleStartDateChange}
                    minDate={new Date()}
                    customInput={
                      <TextField
                        value={
                          startDate ? startDate.toLocaleDateString("es-ES") : ""
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
                    selected={product.fecha_fin}
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
                  Guardar Cambios
                </Button>

                <Button
                  className={styles.botonCancelar}
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
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
                    ¡Producto guardado con éxito!
                  </Alert>
                </Snackbar>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default CardEditarProducto;
