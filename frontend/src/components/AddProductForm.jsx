/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Container, TextField, Button, Typography, Box, IconButton, List, ListItem, ListItemText, Alert, LinearProgress, Select, MenuItem, FormControl, InputLabel, InputAdornment} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import styles from "../styles/AddProductForm.module.css"

const AddProductForm = () => {
    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        ubicacion: '',
        categoria: '',
        imagenes: []
    })

    const [errores, setErrores] = useState({})
    const [exito, setExito] = useState(false)
    const categorias = ['Bienestar y relajación', 'Aventura y deporte', 'Estadía', 'Gastronomía']

    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }  

    const validaciones = () =>{
        let erroresObj = {}
        if(product.nombre.trim().length<3){
            erroresObj.nombre = 'El nombre del producto es obligatorio y debe tener mínimo 3 carácteres';
        } if(product.descripcion.trim().length < 10){
            erroresObj.descripcion = 'La descripción del producto es obligatoria y debe tener mínimo 10 carácteres';
        } if(!product.precio.trim()){
            erroresObj.precio = 'El precio es obligatorio';
        } if(isNaN(Number(product.precio))){
            erroresObj.precio = 'El precio debe ser un número';
        } if(!product.ubicacion.trim()){
            erroresObj.ubicacion = 'La ubicación es obligatoria';
        } if(product.imagenes.length === 0){
            erroresObj.imagenes = 'Se debe incluir al menos una imagen del producto';
        } if (product.categoria === ''){
            erroresObj.categoria = 'Se debe escoger una categoría';
        }

        setErrores(erroresObj)
        return Object.keys(erroresObj).length === 0;
    }

    const handleUploadImagenes = async(e) =>{
        if (!e.target.files || e.target.files.length === 0) return;
        const archivos = Array.from(e.target.files)

        let imagenesSubir = archivos.map((archivo) =>({
            archivo,
            nombre: archivo.name,
            status:'cargando',
            url: null
        }))
        setProduct({...product, imagenes:[...product.imagenes, ...imagenesSubir] })
        console.log(product.imagenes)
        
        const imagenesSubidas = await Promise.all(
            imagenesSubir.map(async (img) => {
                const resultado = await subirImagenAlServidor(img.archivo);
                return {
                    ...img,
                    status: resultado.success ? 'completado' : 'fallido',
                    url: resultado.success ? resultado.url : null,
                };
            })
        );
        setProduct({
            ...product,
            imagenes: [...product.imagenes.map((imagen) =>
                imagenesSubidas.find((img =>
                    img.nombre === imagen.nombre || imagen
                )))]
        });
    }

    const eliminarImagen = index =>{
        const imagenesSubir = product.imagenes.filter((_,i) => i !==index)
        setProduct({...product, imagenes: imagenesSubir})
    }

    const resetState = () =>{
        setProduct({ nombre: '', descripcion: "", precio: '', ubicacion: '', categoria: '', imagenes: [] })
    }

    const productFormatoEnvio = {
        ...product,
        precio: Number(product.precio), 
        imagenes:product.imagenes.map(img => img.url).join(','), 
    };
    
    const subirImagenAlServidor = async (archivo) => {
        const formData = new FormData();
        formData.append("imagen", archivo);
    
        try {
            const response = await axios.post("URL", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            if (response.data && response.data.url) {
                return { success: true, url: response.data.url };
            } else {
                throw new Error("No se recibió una URL válida del servidor");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            return { success: false };
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (validaciones()){
            console.log("Formulario exitoso, producto subido", productFormatoEnvio)
            //llamada a POST
            try {
                const response = await axios.post("API", productFormatoEnvio, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            
                console.log("Producto agregado:", response.data);
                resetState()
                setExito(true)
            
                setTimeout(() => {
                    setExito(false);
                }, 3000);
            } catch (error) {
                console.error("Error al enviar el producto:", error);
            }
            
        } else {
            console.log("no se puede enviar el formulario",errores)
            return;
        }
    }

    
    return (
        <Container className={styles.container}>
            <Typography variant="h4" gutterBottom className={styles.titulo}>
                Nuevo Producto
            </Typography>

            <Box component="form" className={styles.form} onSubmit={handleSubmit}>
            
                <Box className={styles.seccion}>
                    <Typography className={styles.h6} variant="h6" gutterBottom>
                        Descripción del producto
                    </Typography>

                    <TextField className={styles.textField}
                        label="Nombre"
                        name="nombre"
                        value={product.nombre}
                        onChange={handleChange}
                        error={!!errores.nombre}
                        helperText={errores.nombre}
                        fullWidth
                    />

                    <TextField className={styles.textField}
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

                    <TextField className={styles.textField}
                        label="Precio"
                        name="precio"
                        value={product.precio}
                        onChange={handleChange}
                        error={!!errores.precio}
                        helperText={errores.precio}
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            },
                        }}
                    />

                    <TextField className={styles.textField}
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
                            name="categoria"
                            labelId="categoria-label"
                            value={product.categoria}
                            displayEmpty
                            onChange={handleChange}>

                            <MenuItem value="" disabled>
                                Elige una categoría
                            </MenuItem>
                            {categorias.map((cat) => (
                                <MenuItem key={cat} value={cat} >
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box className={styles.seccion}>
                    <Typography className={styles.h6} variant="h6" gutterBottom>
                        Subir Imágenes
                    </Typography>

                    <Box >
                        <Box className={styles.subirImg}>
                            <UploadFileIcon  className={styles.iconImg} fontSize="large" />
                            <Typography variant="body2" >
                                <label htmlFor="upload">Selecciona archivo</label> o arrastra para subir
                            </Typography>
                            <Typography variant="caption">
                                SVG, PNG, JPG o GIF (max. 3MB)
                            </Typography>
                            <input id="upload" type="file" multiple hidden onChange={handleUploadImagenes} />
                        </Box>

                        {product.imagenes.length > 0 && (
                            <List className={styles.listaImg}>
                            {product.imagenes.map((img, index) => (
                                <ListItem key={index} className={styles.listaItem}
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => eliminarImagen(index)} >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    }>
                                    <ListItemText  className={styles.listaItemText} primary={img.nombre} 
                                    secondary={`${img.archivo.size}kb  •  ${img.status === 'loading' ? 'Cargando...': img.status === 'complete' ? 'Completado' : 'Fallido'}  `}  />
                                    {img.status === "loading" && <LinearProgress />}
                                </ListItem>
                            ))}
                            </List>
                        )}
                    </Box>
                </Box>

                <Box className={styles.botones}>
                    <Button className={styles.botonAgregar} type="submit" variant="contained">
                        Añadir Producto
                    </Button>

                    <Button className={styles.botonCancelar} variant="outlined" color="secondary" onClick={() => resetState()}>
                        Cancelar
                    </Button>

                    {exito && <Alert severity="success" className={styles.mensajeExito}>¡Producto agregado con éxito!</Alert>}
                </Box>
            </Box>
        </Container>
        
    );
};

export default AddProductForm;