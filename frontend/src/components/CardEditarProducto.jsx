
/* eslint-disable no-unused-vars */
import {React, useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, IconButton, List, ListItem, ListItemText, Alert, LinearProgress, Select, MenuItem, FormControl, InputLabel, InputAdornment} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import styles from "../styles/AddProductForm.module.css"
import SidebarAdmin from "./SidebarAdmin";
import AdminLayout from "./AdminLayout";

const CardEditarProducto = () =>{

    const {id_paquete_experiencia} = useParams()
    
    const [errores, setErrores] = useState({})
    const [exito, setExito] = useState(false)

    const [product, setProduct] = useState()
    const [categorias, setCategorias] = useState([]);
    //LLAMADO GET
    useEffect(() => {
            const fetchProductoEditar = async () => {
                try {
                    const response = await fetch(`/api/paquete-experiencia/${id_paquete_experiencia}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener el producto');
                    }
                    const data = await response.json();
                    const imagenesArray = data.imagen ? data.imagen.split(",").map(url => ({ url, status: "Completado" })) : [];
                    const precioString = data.precio.toString();
                
                    setProduct({ ...data, precio: precioString, imagen: imagenesArray }) 
                } catch (error) {
                    console.error('Hubo un problema con la solicitud de la API:', error);
                }
            };

            const obtenerCategorias = async () => {
                try {
                    const response = await axios.get("http://localhost:8080/api/categoria");
                    const categoriasTransformadas = response.data.map(cat => ({
                        id_categoria: cat.idCategoria, // Cambia la propiedad
                        nombre: cat.nombre
                    }));
                    setCategorias(categoriasTransformadas); 
                    console.log(response.data)
                } catch (error) {
                    console.error("Error al obtener las categorías:", error);
                }
            };
    
            obtenerCategorias();
            fetchProductoEditar();
        }, [id_paquete_experiencia]); 

        if (!product) {
            return <div>Cargando...</div>;
        }
    

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

    const productFormatoEnvio = {
        ...product,
        precio: Number(product.precio), 
        imagen: product.imagen.filter((img) => img.status === "Completado" && img.url)
        .map((img) => img.url).join(','), 
        duracion: '30 min',
        fecha_experiencia: "2026-02-19T12:00:00",
        id_categoria: Number(product.id_categoria)
    };

    //LLAMADO PUT
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("array imagen: "+ product.imagen)
        if (validaciones()){
            console.log("Formulario exitoso, producto subido", productFormatoEnvio)

            /*
            try {
                await axios.put(`/api/paquete-experiencia/${id_paquete_experiencia}`, productFormatoEnvio);
                    alert("Producto actualizado exitosamente");
                    // Redirige a la lista de productos
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
            }*/
        } else {
            console.log("no se puede enviar el formulario",errores)
            return;
        }
    }
        

    return(
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
                            Editar Producto
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
                                        <Box className={styles.imgPrevisualizar}>
                                            {product.imagen.map((img, index) => (
                                                <Box key={index} className={styles.imgBoxEditar}>
                                                    <img src={img} alt={`Vista ${index + 1}`} className={styles.imgEditar} />
                                                    <IconButton 
                                                        className={styles.deleteIconEditar} 
                                                        onClick={() => eliminarImagen(index)}
                                                        size="small"
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            <Box className={styles.botones}>
                                <Button className={styles.botonAgregar} type="submit" variant="contained">
                                    Guardar Cambios
                                </Button>

                                <Button className={styles.botonCancelar} variant="outlined" color="secondary" >
                                    Cancelar
                                </Button>

                                {exito && <Alert severity="success" className={styles.mensajeExito}>¡Producto modificado con éxito!</Alert>}
                            </Box>
                        </Box>
                    </Container>
                </Box>

            </Box>
    </AdminLayout>  
        
    )
};

export default CardEditarProducto;