/* eslint-disable no-unused-vars */
import { useState, useEffect, React } from "react";
import SidebarAdmin from "./SidebarAdmin";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead,
  Typography,
  Paper,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  IconButton, List, ListItem, ListItemText, Alert, LinearProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import styles from "../styles/AdminProducts.module.css";
import stylesCategoria from "../styles/CrearCategoria.module.css";
import AdminLayout from "./AdminLayout";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import usePaginacionDinamica from '../hooks/usePaginacionDinamica';
import {useCategories} from '../contexts/CategoryContext';

const Categorias = () => {
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });
  const [pag, setPag] = useState(0);
  const {columnPorPag, setColumnPorPag } = usePaginacionDinamica(98, 3)

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [CategoriasEliminar, setCategoriasEliminar] = useState([]);

  const [errores, setErrores] = useState({})
  const [openAlertExito, setOpenAlertExito] = useState(false);
  const [openAlertExitoEliminar, setOpenAlertExitoEliminar] = useState(false);
  const [openAlertExitoEditar, setOpenAlertExitoEditar] = useState(false);
  const [openAlertFracaso, setOpenAlertFracaso] = useState(false);

  const { categorias, addCategoria, setCategorias } = useCategories();

  const handleCloseAlertExito = (_, reason) => {
        if (reason === "clickaway") return;
        setOpenAlertExito(false);
    };

    const handleCloseAlertExitoEliminar = (_, reason) => {
      if (reason === "clickaway") return;
      setOpenAlertExitoEliminar(false);
  };

    const handleCloseAlertFracaso = (_, reason) => {
        if (reason === "clickaway") return;
        setOpenAlertFracaso(false);
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  const validaciones = () =>{
    let erroresObj = {}
    if(categoria.nombre.trim().length<3){
        erroresObj.nombre = 'El nombre de la categoría es obligatorio y debe tener mínimo 3 carácteres';
    } if(categoria.descripcion.trim().length < 10){
        erroresObj.descripcion = 'La descripción de la categoría es obligatoria y debe tener mínimo 10 carácteres';
    } if(categoria.imagen === ''){
        erroresObj.imagen = 'Se debe incluir una imagen del producto';
    } 

    setErrores(erroresObj)
    return Object.keys(erroresObj).length === 0;
}

  const handleUploadImagenes = async(e) =>{
    if (!e.target.files || e.target.files.length === 0) return;
    const archivo = e.target.files[0]

    const imagenSubir = {
      archivo,
      nombre: archivo.name,
      status: "Cargando",
      url: null,
    };

    setCategoria({...categoria, imagen:imagenSubir })
    
    const resultado = await subirImagenAlServidor(archivo);

    setCategoria((prev) => ({
        ...prev,
        imagen: {
            ...imagenSubir,
            status: resultado.success ? "Completado" : "Fallido",
            url: resultado.success ? resultado.url : null,
        },
    }));
  }

  const subirImagenAlServidor = async (archivo) => {
    const formData = new FormData();
    formData.append("image", archivo);
    //para la API, la respuesta es response.data.data.url (no response.data.url)
      try {
          const response = await axios.post("https://api.imgbb.com/1/upload?key=3a27a2eb2845f0a6d1f2712d0f5b0ca2", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: undefined
              },
              withCredentials: false,
          });

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

  const eliminarImagen = () => {
    setCategoria({ ...categoria, imagen: '' }); 
  };

  const categoriaFormatoEnvio = {
    ...categoria,
    imagen: categoria.imagen?.status === "Completado" && categoria.imagen.url 
    ? categoria.imagen.url 
    : ""
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (editMode) {
    handleUpdate(e); // Si es edición, actualizar la categoría
  } else {
    if (validaciones()){
      try {
        const response = await axios.post('/api/categoria', categoriaFormatoEnvio, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        console.log("Categoria agregada:", response.data);
        addCategoria(response.data);
        setOpenSnackbar(true);
        setOpenAlertExito(true)
        handleCloseDialog();
        
    
        setTimeout(() => {
            setOpenAlertExito(false)
        }, 3000);
    } catch (error) {
        console.error("Error al enviar la categoria:", error);
        setOpenAlertFracaso(true)
    }
    } else {
      console.log("no se puede enviar el formulario",errores)
      return;
    };  
  }
  
}

  
  const handleEdit = (category) => {
    setCategoria({ 
      nombre: category.nombre, 
      descripcion: category.descripcion,
      imagen: category.imagen });
    setSelectedId(category.id_categoria);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validaciones()) {
      try {
        const response = await axios.put(`/api/categoria/${selectedId}`, categoriaFormatoEnvio, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        // Actualizar la lista de categorías en el estado global
        setCategorias((prevCategorias) =>
          prevCategorias.map((cat) =>
            cat.id_categoria === selectedId ? response.data : cat
          )
        );
  
        setOpenAlertExitoEditar(true);
        setTimeout(() => setOpenAlertExitoEditar(false), 3000);
        handleCloseDialog();
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        setOpenAlertFracaso(true);
      }
    } else {
      console.log("No se puede actualizar, hay errores:", errores);
      return;
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/categoria/${CategoriasEliminar.id_categoria}`);
      setCategorias(
        categorias.filter(
          (c) => c.id_categoria !== CategoriasEliminar.id_categoria
        )
      );
      setOpenAlertExitoEliminar(true)
  
      setTimeout(() => {
          setOpenAlertExitoEliminar(false)
      }, 3000);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    setOpenDialogDelete(false);
  };

  const handleOpenDialog = () => {
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleOpenDialogDelete = (categoria) => {
    setCategoriasEliminar(categoria);
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  const handleCloseDialog = () => {
    resetState()
    setOpenDialog(false);
    setEditMode(false);
    setSelectedId(null);
  };

  const resetState = () =>{
    setCategoria({ nombre: '', descripcion: "", imagen: ''})
  }
  

  return (
    <AdminLayout>
      <Box className={styles.container}>
        <SidebarAdmin />
        <Box className={styles.productContainer}>
          <Box className={styles.titleLista}>
            <Typography variant="h4" className={styles.titleListaProductos}>
              Lista de Categorías
            </Typography>
          </Box>
          <Box className={styles.titleProduct}>
            <Typography variant="h4" className={styles.titleProducts}>
              Categorías
            </Typography>
          </Box>
          <Box className={styles.contenido}>
              <Button
                className={styles.botonAddProduct}
                onClick={handleOpenDialog}
                variant="contained"
                color="primary"
              >
                AGREGAR CATEGORÍA
              </Button>

            <TableContainer className={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>ID Categoria</TableCell>
                    <TableCell className={styles.tableHeader}>Nombre</TableCell>
                    <TableCell className={styles.tableHeader}>Descripción</TableCell>
                    <TableCell className={styles.tableHeader}>Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {categorias.slice(pag * columnPorPag, pag * columnPorPag + columnPorPag)
                  .map((cat) => (
                    <TableRow key={cat.id_categoria} className={styles.tableRow}>
                      <TableCell sx={{ width: "20%" }}>{cat.id_categoria}</TableCell>
                      <TableCell sx={{ width: "25%" }}>{cat.nombre}</TableCell>
                      <TableCell sx={{ maxWidth: "180px", minWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                        {cat.descripcion}</TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        <Button
                          variant="outlined"
                          className={styles.botonEliminar}
                          onClick={() => handleOpenDialogDelete(cat)}
                        >
                          Eliminar
                        </Button>
                        <Button color="primary" onClick={() => handleEdit(cat)}>
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
                count={categorias.length}
                rowsPerPage={columnPorPag}
                page={pag}
                onPageChange={(event, newPage) => setPag(newPage)}
                onRowsPerPageChange={(event) =>
                  setColumnPorPag(parseInt(event.target.value, 5))
                }
                labelRowsPerPage="Filas por página"
                sx={{ marginTop: "auto" }}
                rowsPerPageOptions={Array.from({ length: 100 }, (_, i) => i + 1)}
            />
          </Box>
        </Box>
      </Box>
      {/* Agregar la categoria*/}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        sx={{
          width: "80%",
          "& .MuiDialog-paper": {
            backgroundColor: "#f5f0ff",
            overflow: "visible",
          }, // Evita scroll en el contenedor principal
        }}
        className={styles.contenidoAgregar}
      >
        <DialogTitle>{editMode ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle>
        <DialogContent
          sx={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 1.2,
          }}
        >
          <TextField
            label="Título"
            placeholder="Ingresa un título para la categoría"
            variant="outlined"
            fullWidth
            value={categoria.nombre}
            onChange={(e) =>
              setCategoria({ ...categoria, nombre: e.target.value })
            }
            // margin="normal"
            margin="dense" // Reduce el margen vertical
            InputLabelProps={{ shrink: true }}
            sx={{
              maxWidth: "600px",
              marginBottom: 0.5,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6239E6 !important", // Mantiene el borde siempre morado
                },
              },
            }}
          />
          <TextField
            label="Descripción"
            placeholder="Añade una breve descripción de la categoría"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={categoria.descripcion}
            onChange={(e) =>
              setCategoria({ ...categoria, descripcion: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: 0.5,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6239E6 !important", // Mantiene el borde siempre morado
                },
              },
            }}
          />
          <Typography variant="caption" color="textSecondary">
            {categoria.descripcion.length}/100
          </Typography>


          <Box className={stylesCategoria.fileUpload} sx={{ marginBottom: 2 }}>
            <Typography className={styles.h5} variant="h5" gutterBottom>
              Imagen Categoría
            </Typography>
          </Box>

          <Box >
            <Box className={stylesCategoria.subirImg}>
              <UploadFileIcon  className={stylesCategoria.iconImg} fontSize="small" />
                <Typography variant="body2" >
                  <label htmlFor="upload">Selecciona archivo</label> o arrastra para subir
                </Typography>
                <Typography variant="caption">
                  SVG, PNG, JPG o GIF (max. 3MB)
                </Typography>
                <input id="upload" type="file" multiple hidden onChange={handleUploadImagenes} />
            </Box>

              {categoria.imagen && (
                <List className={stylesCategoria.listaImg}>
                  <ListItem  className={stylesCategoria.listaItem}
                    secondaryAction={
                      <IconButton edge="end" onClick={eliminarImagen} >
                        <DeleteIcon  fontSize="small"/>
                      </IconButton>
                    }>
                  <UploadFileIcon className={stylesCategoria.iconUpload} fontSize="small" />


                  {typeof categoria.imagen === "string" ? (
                  // Si es una URL, solo muestra la imagen sin los datos de tamaño/status
                  <ListItemText 
                    className={stylesCategoria.imgPrevisualizar} 
                    primary="Imagen subida" 
                    secondary={
                      <span className={stylesCategoria.imgPrevEditar}>
                        <img src={categoria.imagen} alt="Imagen de la categoría" />
                      </span>
                    } 
                  />
                ) : (
                  // Si es un objeto con información del archivo, muestra los datos normales  
                  <ListItemText  className={stylesCategoria.listaItemText} primary={categoria.imagen.nombre} 
                      secondary={
                        <span className={stylesCategoria.imgText}>
                          <span >{Math.round(categoria.imagen.archivo.size / 1024)}kb • </span>
                          <span>{categoria.imagen.status}</span>

                            {categoria.imagen.status === "Cargando" && (
                                <LinearProgress 
                                  className={stylesCategoria.barraProgreso}
                                  variant="indeterminate" 
                                />
                            )}
                        </span>
                      } 
                  />
                )}                              
                </ListItem>
                </List>
              )}
            </Box>

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
          {editMode ? "Actualizar Categoría" : "Añadir Categoría"}
          </Button>
        </DialogActions>

        
      </Dialog>
      <Snackbar
          open={openAlertExito}
          autoHideDuration={3000}
          onClose={handleCloseAlertExito}
          anchorOrigin={{ vertical: "center", horizontal: "center" }} 
        >
          <Alert onClose={handleCloseAlertExito} severity="success" className={styles.alertaExito}>
          ¡Categoría agregada con éxito!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openAlertExitoEditar}
          autoHideDuration={3000}
          onClose={handleCloseAlertExito}
          anchorOrigin={{ vertical: "center", horizontal: "center" }} 
        >
          <Alert onClose={handleCloseAlertExito} severity="success" className={styles.alertaExito}>
          ¡Categoría actualizada con éxito!
          </Alert>
        </Snackbar>

      <Dialog open={openDialogDelete} onClose={handleCloseDialog}>
        <DialogTitle>¿Eliminar categoria?</DialogTitle>
        <DialogContent>
          <p>
            ¿Estás seguro de que deseas eliminar -- {CategoriasEliminar?.nombre}{" "}
            -- ? Esta acción no se puede deshacer.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
          open={openAlertExitoEliminar}
          autoHideDuration={3000}
          onClose={handleCloseAlertExitoEliminar}
          anchorOrigin={{ vertical: "center", horizontal: "center" }} 
        >
          <Alert onClose={handleCloseAlertExitoEliminar} severity="success" className={styles.alertaExito}>
            ¡Categoría eliminada con éxito!
          </Alert>
        </Snackbar>
    </AdminLayout>
  );
};

export default Categorias;
