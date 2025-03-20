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
} from "@mui/material";
import axios from "axios";
import styles from "../styles/AdminProducts.module.css";
import stylesCategoria from "../styles/CrearCategoria.module.css";
import AdminLayout from "./AdminLayout";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Categorias = () => {

      const [categoria, setCategoria] = useState({
          nombre: '',
          descripcion: '',
          imagen:''
      })
  const [pag, setPag] = useState(0);
  const [columnPorPag, setColumnPorPag] = useState(5);

  const [Categorias, setCategorias] = useState([]);
  const [category, setCategory] = useState({ nombre: "", descripcion: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [CategoriasEliminar, setCategoriasEliminar] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("/api/categoria");
      setCategorias(response.data);
    } catch (error) {
      console.error("Error fetching Categorias:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("/api/categoria", categoria);
      fetchCategorias();
      handleCloseDialog();
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setArchivo(file);
    }
};

  const handleEdit = (category) => {
    setCategory({ nombre: category.nombre, descripcion: category.descripcion });
    setSelectedId(category.idCategoria);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/categoria/${CategoriasEliminar.idCategoria}`);
      setCategorias(Categorias.filter(c => c.idCategoria !== CategoriasEliminar.idCategoria));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    setOpenDialogDelete(false)
  };

  const handleOpenDialog = () => {
    setCategory({ nombre: "", descripcion: "" });
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
    setOpenDialog(false);
    setEditMode(false);
    setSelectedId(null);
  };
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

  const handleUploadImagenes = async(e) =>{
    debugger;
    if (!e.target.files || e.target.files.length === 0) return;
    const archivo = e.target.files[0]
    const resultado = await subirImagenAlServidor(archivo);
    const imagenesSubir = {
        nombre: archivo.name,
        status:resultado.success ? 'Completado' : 'Fallido',
        url: resultado.success ? resultado.url : null,
    }
    debugger;
    setCategoria({...categoria, imagen:imagenesSubir.url })
    
}


  return (
    <AdminLayout>
      <Box className={styles.container}>
        <SidebarAdmin />
        <Box className={styles.productContainer}>
          <Box className={styles.titleProduct}>
            <Typography variant="h4" className={styles.titleProducts}>
              Categorías
            </Typography>
          </Box>
          <Box className={styles.contenido}>
            <Link to="">
              <Button
                className={styles.botonAddProduct}
                onClick={handleOpenDialog}
                variant="contained"
                color="primary"
              >
                AGREGAR CATEGORÍA
              </Button>
            </Link>
            <TableContainer className={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.tableHeader}>
                      Id Categoria
                    </TableCell>
                    <TableCell className={styles.tableHeader}>Nombre</TableCell>
                    <TableCell className={styles.tableHeader}>
                      Descripción
                    </TableCell>
                    <TableCell className={styles.tableHeader}>
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Categorias.map((cat) => (
                    <TableRow key={cat.idCategoria}>
                      <TableCell>{cat.idCategoria}</TableCell>
                      <TableCell>{cat.nombre}</TableCell>
                      <TableCell>{cat.descripcion}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          className={styles.botonEliminar}
                          onClick={() => handleOpenDialogDelete(cat)}
                        >
                          Eliminar
                        </Button>
                        {/* <Button color="primary" onClick={() => handleEdit(cat)}>
                          Editar
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={Categorias.length}
              rowsPerPage={columnPorPag}
              page={pag}
              onPageChange={(event, newPage) => setPag(newPage)}
              onRowsPerPageChange={(event) =>
                setColumnPorPag(parseInt(event.target.value, 5))
              }
              labelRowsPerPage="Filas por página"
            />
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}fullWidth
        maxWidth="sm"
        sx={{width: "80%",
          '& .MuiDialog-paper': { backgroundColor: '#f5f0ff', overflow: 'visible' } // Evita scroll en el contenedor principal
        }}
        className={styles.contenido}>
      <DialogTitle>Nueva Categoría</DialogTitle>
            <DialogContent sx={{ overflow: 'hidden', display: "flex", flexDirection: "column", gap: 1.2 }}>
            <TextField
            label="Título"
            placeholder="Ingresa un título para la categoría"
            variant="outlined"
            fullWidth
            value={categoria.nombre}
            onChange={(e) => setCategoria({ ...categoria, nombre: e.target.value })}
            // margin="normal"
            margin="dense" // Reduce el margen vertical
            InputLabelProps={{ shrink: true }}
            sx={{
              maxWidth: "600px", marginBottom: 0.5, "& .MuiOutlinedInput-root": {
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
            onChange={(e) => setCategoria({ ...categoria, descripcion: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 0.5 , "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6239E6 !important", // Mantiene el borde siempre morado
                },
              },}}
          />
                <Typography variant="caption" color="textSecondary">
                    {categoria.descripcion.length}/100
                </Typography>
                <Box className={stylesCategoria.fileUpload} sx={{ marginBottom: 2 }}>
                <label htmlFor="fileInput" className="file-label">
                  Imagen categoría
                </label>
              </Box>
             

             

              <Box className={stylesCategoria.subirImg}>
                <UploadFileIcon className={stylesCategoria.iconImg} fontSize="small" />
                <Typography variant="body2">
                  <label htmlFor="upload">Selecciona archivo</label> o arrastra
                  para subir
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialogDelete} color="secondary">Cancelar</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Añadir Categoría</Button>
            </DialogActions>
      </Dialog>

      <Dialog open={openDialogDelete} onClose={handleCloseDialog}>
                      <DialogTitle>¿Eliminar categoria?</DialogTitle>
                      <DialogContent>
                          <p>¿Estás seguro de que deseas eliminar -- {CategoriasEliminar?.nombre} -- ? Esta acción no se puede deshacer.</p>
                      </DialogContent>
                      <DialogActions>
                          <Button onClick={handleCloseDialogDelete} color="primary">Cancelar</Button>
                          <Button onClick={handleDelete} color="error">Eliminar</Button>
                      </DialogActions>
                  </Dialog>
    </AdminLayout>
  );
};

export default Categorias;