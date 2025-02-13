/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Container, TextField, Button, Typography, Box, IconButton, List, ListItem, ListItemText, Alert} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

const AddProductForm = () => {
    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        ubicacion: '',
        imagenes: []
    })

    const [errores, setErrores] = useState({})
    const [exito, setExito] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }  

    const handleUploadImagenes = (e) =>{
        if (!e.target.files || e.target.files.length === 0) return;
        const archivos = Array.from(e.target.files)
        const imagenesSubir = archivos.map((archivo) =>({
            archivo,
            nombre: archivo.name,
            url: URL.createObjectURL(archivo)
        }))
        setProduct({...product, imagenes:[...product.imagenes, ...imagenesSubir] })
        console.log(product.imagenes)
    }

    const eliminarImagen = index =>{
        const imagenesSubir = product.imagenes.filter((_,i) => i !==index)
        setProduct({...product, imagenes: imagenesSubir})
    }

    const resetState = () =>{
        setProduct({ nombre: "", descripcion: "", precio: "", ubicacion: "", imagenes: [] })
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
        }

        setErrores(erroresObj)
        return Object.keys(erroresObj).length === 0;
    }
    

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (validaciones()){
            console.log("Formulario exitoso, producto subido", product)
            setExito(true); //(mensaje exito)
            //llamada a POST
            setTimeout(() => {
                setExito(false);
            }, 3000);
            resetState()
            console.log(exito)
        } else {
            console.log("no se puede enviar el formulario",errores)
            return;
        }
    }

    
    return (
        <Container maxWidth='sm'>
            <Typography variant="h4" gutterBottom>
                Nuevo Producto
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            
                <TextField
                    label="Nombre"
                    name="nombre"
                    value={product.nombre}
                    onChange={handleChange}
                    error={!!errores.nombre}
                    helperText={errores.nombre}
                    fullWidth
                />

                <TextField
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
                    label="Precio"
                    name="precio"
                    value={product.precio}
                    onChange={handleChange}
                    error={!!errores.precio}
                    helperText={errores.precio}
                    fullWidth
                />

                <TextField
                    label="Ubicación"
                    name="ubicacion"
                    value={product.ubicacion}
                    onChange={handleChange}
                    error={!!errores.ubicacion}
                    helperText={errores.ubicacion}
                    fullWidth
                />

                <Box sx={{ border: "1px dashed #ccc", padding: 2, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Subir Imágenes
                    </Typography>

                    <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
                        Seleccionar archivos
                        <input type="file" multiple hidden onChange={handleUploadImagenes} />
                    </Button>

                    {product.imagenes.length > 0 && (
                        <List>
                        {product.imagenes.map((img, index) => (
                            <ListItem key={index} 
                            secondaryAction={
                                <IconButton edge="end" onClick={() => eliminarImagen(index)} >
                                <DeleteIcon color="error" />
                                </IconButton>
                            }
                            >
                            <ListItemText primary={img.nombre} />
                            </ListItem>
                        ))}
                        </List>
                    )}
                </Box>

                <Button variant="outlined" color="secondary" onClick={() => resetState()}>
                    Cancelar
                </Button>

                <Button type="submit" variant="contained" color="primary">
                    Añadir Producto
                </Button>
                {exito && <Alert severity="success">¡Producto agregado con éxito!</Alert>}
            </Box>
        </Container>
        
    );
};

export default AddProductForm;