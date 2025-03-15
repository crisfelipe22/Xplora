import { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import SidebarAdmin from "./SidebarAdmin";
import AdminLayout from "./AdminLayout";
import styles from "../styles/CrearCategoria.module.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
    
const CategoriaForm = () => {
 
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setArchivo(file);
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

    /*    const handleSubmit = async (e) =>{
                e.preventDefault()
                if (validaciones()){
                    //llamada a POST
                    try {
                        const response = await axios.post('/api/categoria', categoriaFormatoEnvio, {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                    
                        console.log("Categoria agregado:", response.data);
                        resetState()
                        setOpenAlertExito(true)
                    
                       
                    } catch (error) {
                        console.error("Error al enviar la categoria:", error);
                        setErroresRequest(error?.response?.data["mensaje: "]);
                        setOpenAlertFracaso(true)
                    }
                    
                } else {
                    console.log("no se puede enviar el formulario",errores)
                    return;
                }
            }*/
  };

  return (
    <AdminLayout>
      <Box className={styles.contenedorPrincipal}>
        <SidebarAdmin />
        <Box className={styles.contenido}>
          <Container className={styles.container}>
            <Box component="form" className={styles.form} onSubmit>
              <Typography variant="h5" className="titulo">
                Nueva Categoría
              </Typography>
              <TextField
                label="Título"
                placeholder="Ingresa un título para la categoría"
                variant="outlined"
                fullWidth
                className={styles.textField}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Descripción"
                placeholder="Añade una breve descripción de la categoría"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                className={styles.textField}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="caption" color="textSecondary">
                {descripcion.length}/100
              </Typography>
              <Box className={styles.fileUpload} sx={{ marginBottom: 2 }}>
                <input
                  type="file"
                  id="fileInput"
                  hidden
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput" className="file-label">
                  Imagen categoría
                </label>
              </Box>
             {archivo && (
                <Box className="file-info">
                  <Typography>{archivo.name}</Typography>
                  <Typography>{(archivo.size / 1024).toFixed(2)}kb</Typography>
                </Box>
              )}

              <Box className={styles.subirImg}>
                <UploadFileIcon className={styles.iconImg} fontSize="small" />
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

              <Box
                className="buttons"
                sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 14 }}
              >
                <Button variant="text" color="secondary">
                  Cancelar
                </Button>
                <Button
                  className={styles.botonAddProduct}
                  variant="contained"
                  color="primary"
                >
                  {/* {" "} */}
                  Añadir Categoría
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default CategoriaForm;
