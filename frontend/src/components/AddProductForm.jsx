/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Container, TextField, Button, Typography, Box } from "@mui/material";

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
        const archivos = Array.from(e.target.files)
        setProduct({...product, imagenes: archivos})
    }

    const validaciones = () =>{
        let errores = {}
        if(product.nombre.trim().length<3){
            errores.nombre = 'El nombre del producto es obligatorio y debe tener mínimo 3 carácteres';
        } if(product.descripcion.trim().length < 10){
            errores.descripcion = 'La descripción del producto es obligatoria y debe tener mínimo 10 carácteres';
        } if(!product.precio.trim()){
            errores.precio = 'El precio es obligatorio';
        } if(isNaN(Number(product.precio))){
            errores.precio = 'El precio debe ser un número';
        } if(!product.ubicacion.trim()){
            errores.ubicacion = 'La ubicación es obligatoria';
        } if(product.imagenes.length === 0){
            errores.imagenes = 'Se debe incluir al menos una imagen del producto';
        }

        setErrores(errores)
        //return Object.keys(errores).length > 0
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        //if (validaciones) return;
        //sino llamada a POST
        //setExito true (mensaje exito)
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

                <Button variant="contained" component="label">
                    Subir Imágenes
                    <input type="file" multiple hidden onChange={handleUploadImagenes} />
                </Button>

                <Button type="submit" variant="contained" color="primary">
                    Añadir Producto
                </Button>
            </Box>
        </Container>
        
    );
};

export default AddProductForm;