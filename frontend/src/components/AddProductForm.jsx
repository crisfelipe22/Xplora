
import { useState } from "react"
import { Container, TextField, Button, Typography, Box, IconButton, List, ListItem, ListItemText, Alert, LinearProgress, Select, MenuItem, FormControl, InputLabel, InputAdornment} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import styles from "../styles/AddProductForm.module.css"
import SidebarAdmin from "./SidebarAdmin";
import AdminLayout from "./AdminLayout";

const AddProductForm = () => {
    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        ubicacion: '',
        id_categoria: '',
        imagen: []
    })

    const [errores, setErrores] = useState({})
    const [exito, setExito] = useState(false)

    const categorias = [{
        "id_categoria": 1,
        "nombre": "Aventura y deporte"
        }, 
        {"id_categoria": 2,
        "nombre": 'Bienestar y relajación' }  ]
    //HABRÍA QUE RECIBIR LAS CATEGORÍAS CON UN ENDPOINT
    /*
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/categorias");
                setCategorias(response.data); 
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        obtenerCategorias();
    }, []);
    */

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
        } if (!product.precio.trim()) {
            erroresObj.precio = 'El precio es obligatorio';
        } else if (isNaN(Number(product.precio))) {
            erroresObj.precio = 'El precio debe ser un número';
        } else if (Number(product.precio) < 0) { 
            erroresObj.precio = 'El precio no puede ser negativo';
        } if(isNaN(Number(product.precio))){
            erroresObj.precio = 'El precio debe ser un número ';
        } if(!product.ubicacion.trim()){
            erroresObj.ubicacion = 'La ubicación es obligatoria';
        } if(product.imagen.length === 0){
            erroresObj.imagen = 'Se debe incluir al menos una imagen del producto';
        } if (product.id_categoria === ''){
            erroresObj.id_categoria = 'Se debe escoger una categoría';
        }

        setErrores(erroresObj)
        return Object.keys(erroresObj).length === 0;
    }

    const handleUploadImagenes = async(e) =>{
        if (!e.target.files || e.target.files.length === 0) return;
        const archivos = Array.from(e.target.files)

        const imagenesSubir = archivos.map((archivo) =>({
            archivo,
            nombre: archivo.name,
            status:'Cargando',
            url: null
        }))
        setProduct({...product, imagen:[...product.imagen, ...imagenesSubir] })
        console.log(product.imagen)
        
        const imagenesSubidas = await Promise.all(
            imagenesSubir.map(async (img) => {
                const resultado = await subirImagenAlServidor(img.archivo);
                return {
                    ...img,
                    status: resultado.success ? 'Completado' : 'Fallido',
                    url: resultado.success ? resultado.url : null,
                };
            })
        );
        setProduct((prev) => ({
            ...prev,
            imagen: prev.imagen.map((imagen) =>
                imagenesSubidas.find((img) => img.nombre === imagen.nombre) || imagen
            ),
        }));
    }

    const eliminarImagen = index =>{
        const imagenesSubir = product.imagen.filter((_,i) => i !==index)
        setProduct({...product, imagen: imagenesSubir})
    }

    const resetState = () =>{
        setProduct({ nombre: '', descripcion: "", precio: '', ubicacion: '', id_categoria: '', imagen: [] })
    }

    const productFormatoEnvio = {
        ...product,
        precio: Number(product.precio), 
        imagen: product.imagen.filter((img) => img.status === "Completado" && img.url)
        .map((img) => img.url).join(','), 
    };
    
    const subirImagenAlServidor = async (archivo) => {
        const formData = new FormData();
        formData.append("image", archivo);
        //para la API, la respuesta es response.data.data.url (no response.data.url)
        try {
            const response = await axios.post("https://api.imgbb.com/1/upload?key=3a27a2eb2845f0a6d1f2712d0f5b0ca2", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
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

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (validaciones()){
            console.log("Formulario exitoso, producto subido", productFormatoEnvio)
            //Borrar esto cuando se tenga endpoint bbdd
            resetState()
            setExito(true)
            setTimeout(() => {
                setExito(false);
            }, 3000);
            //borrar hasta aquí

            //llamada a POST
            try {
                const response = await axios.post('http://localhost:8080/api/paquete-experiencia', productFormatoEnvio, {
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
    <AdminLayout>
        <Box className={styles.contenedorPrincipal}> 
            <SidebarAdmin/>
            
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
                                    name="id_categoria"
                                    labelId="categoria-label"
                                    value={product.id_categoria}
                                    displayEmpty
                                    onChange={handleChange}>

                                    <MenuItem value="" disabled>
                                        Elige una categoría
                                    </MenuItem>
                                    {categorias.map((cat) => (
                                        <MenuItem key={cat.id_categoria} value={cat.id_categoria} >
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

                            <Box >
                                <Box className={styles.subirImg}>
                                    <UploadFileIcon  className={styles.iconImg} fontSize="small" />
                                    <Typography variant="body2" >
                                        <label htmlFor="upload">Selecciona archivo</label> o arrastra para subir
                                    </Typography>
                                    <Typography variant="caption">
                                        SVG, PNG, JPG o GIF (max. 3MB)
                                    </Typography>
                                    <input id="upload" type="file" multiple hidden onChange={handleUploadImagenes} />
                                </Box>

                                {product.imagen.length > 0 && (
                                    <List className={styles.listaImg}>
                                    {product.imagen.map((img, index) => (
                                        <ListItem key={index} className={styles.listaItem}
                                            secondaryAction={
                                                <IconButton edge="end" onClick={() => eliminarImagen(index)} >
                                                    <DeleteIcon  fontSize="small"/>
                                                </IconButton>
                                            }>
                                            <UploadFileIcon className={styles.iconUpload} fontSize="small" />

                                            <ListItemText  className={styles.listaItemText} primary={img.nombre} 
                                                secondary={
                                                    <span className={styles.imgText}>
                                                        <span >{Math.round(img.archivo.size / 1024)}kb • </span>
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
            </Box>

        </Box>
    </AdminLayout>  
    );
};

export default AddProductForm;