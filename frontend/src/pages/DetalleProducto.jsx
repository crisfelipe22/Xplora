/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { Typography, Chip, Container} from '@mui/material';

const DetalleProducto = () =>{
    const {idPaqueteExperiencia} = useParams()

    //Suponiendo el arreglo de objetos por ahora
    const productosAleatorios = [
        {
            idPaqueteExperiencia: 1,
            categoria: {
                idCategoria: 2,
                nombre: "Relax"
            },
            nombre: "Spa de Lujo",
            descripcion: "Un día de relajación en un spa de 5 estrellas.",
            precio: 200,
            ubicacion: "Santiago, Chile",
            imagen: "https://i.pinimg.com/736x/57/cd/f6/57cdf643394476668c968abd0cd78b55.jpg",
        },
        {
            idPaqueteExperiencia: 2,
            categoria: {
                idCategoria: 1,
                nombre: "Aventura"
            },
            nombre: "Paseo en kayak",
            descripcion: "Navega en kayak frente a uno de los Glaciares más famosos",
            precio: 500,
            ubicacion: "Santa Cruz",
            imagen: "https://i.pinimg.com/736x/71/06/3c/71063c0cdf5da435e9300c47296ebb7f.jpg, https://i.pinimg.com/736x/27/cf/d6/27cfd68857b998b2d2aea1f9b1c269ed.jpg",
        },
        {
            idPaqueteExperiencia: 3,
            categoria: {
                idCategoria: 3,
                nombre: "Gastronomía"
            },
            nombre: "El Cielo Restaurant",
            descripcion: "Exclusivo restaurante ubicado conocido por su enfoque en la ‘gastronomía molecular’ y la sorpresa adicional en cada plato. Sus menús degustación están diseñados para cautivar los sentidos. ",
            precio: 200,
            ubicacion: "Santiago, Chile",
            imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/21/5f/e3/piazza-italia-by-storia.jpg?w=600&h=-1&s=1",
        },
        {
            idPaqueteExperiencia: 2,
            categoria: {
                idCategoria: 1,
                nombre: "Aventura"
            },
            nombre: "Paseo en kayak",
            descripcion: "Navega en kayak frente a uno de los Glaciares más famosos",
            precio: 500,
            ubicacion: "Santa Cruz",
            imagen: "https://i.pinimg.com/736x/71/06/3c/71063c0cdf5da435e9300c47296ebb7f.jpg, https://i.pinimg.com/736x/27/cf/d6/27cfd68857b998b2d2aea1f9b1c269ed.jpg",
        },
        {
            idPaqueteExperiencia: 3,
            categoria: {
                idCategoria: 3,
                nombre: "Gastronomía"
            },
            nombre: "El Cielo Restaurant",
            descripcion: "Exclusivo restaurante ubicado conocido por su enfoque en la ‘gastronomía molecular’ y la sorpresa adicional en cada plato. Sus menús degustación están diseñados para cautivar los sentidos. ",
            precio: 200,
            ubicacion: "Santiago, Chile",
            imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/21/5f/e3/piazza-italia-by-storia.jpg?w=600&h=-1&s=1",
        },
        {
            idPaqueteExperiencia: 1,
            categoria: {
                idCategoria: 2,
                nombre: "Relax"
            },
            nombre: "Spa de Lujo",
            descripcion: "Un día de relajación en un spa de 5 estrellas.",
            precio: 200,
            ubicacion: "Santiago, Chile",
            imagen: "https://i.pinimg.com/736x/57/cd/f6/57cdf643394476668c968abd0cd78b55.jpg",
        },
    ]
    const producto = productosAleatorios.find(p => p.idPaqueteExperiencia === parseInt(idPaqueteExperiencia));
    if (!producto) {
        return <div>Producto no encontrado</div>;
    }

    //LLAMADO GET   
    return (
        <Container>
            <Typography variant="h4">{producto.nombre}</Typography>
            <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%' }} />
            <Typography variant="h6">{producto.descripcion}</Typography>
            <Typography variant="body1">Precio: ${producto.precio}</Typography>
            <Typography variant="body2">Ubicación: {producto.ubicacion}</Typography>
            <Chip label={producto.categoria.nombre} />
        </Container>
    )
};

export default DetalleProducto;