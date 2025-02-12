/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { TextField, Button, Typography, Box } from "@mui/material";

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
        <h1>HOLA</h1>
    );
};