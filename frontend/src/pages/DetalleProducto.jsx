/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import CardDetalleProducto from '../components/CardDetalleProducto'


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
            imagen: "https://i.pinimg.com/736x/71/06/3c/71063c0cdf5da435e9300c47296ebb7f.jpg, https://i.pinimg.com/736x/27/cf/d6/27cfd68857b998b2d2aea1f9b1c269ed.jpg, https://i.pinimg.com/736x/39/39/c7/3939c7985d3e82dbbf8d8ba1653738b4.jpg, https://i.pinimg.com/736x/7c/ba/65/7cba65ba429b0a26ef2d0f7b48351334.jpg, https://i.pinimg.com/736x/f8/2c/ca/f82ccaa39c89a8e69c183e65d31a07d1.jpg, https://i.pinimg.com/736x/01/c8/ab/01c8abcb984ce58006db79bf577097a6.jpg, https://i.pinimg.com/736x/66/e5/53/66e553b10a3decb2fb163f4dd1ec4bca.jpg, https://i.pinimg.com/736x/7d/a6/05/7da605ecc3ce578b87405d7f8494e755.jpg"
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
    const product = productosAleatorios.find(p => p.idPaqueteExperiencia === parseInt(idPaqueteExperiencia));
    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    //LLAMADO GET  
    /* 
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductoDetalle = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/paquete-experiencia/${idPaqueteExperiencia}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }
                const data = await response.json();
                setProduct(data); 
            } catch (error) {
                console.error('Hubo un problema con la solicitud de la API:', error);
            }
        };
        fetchProductoDetalle();
    }, [idPaqueteExperiencia]); 

    if (!product) {
        return <div>Cargando...</div>;
    }
    */

    return (
        <CardDetalleProducto product={product} />
    )
};

export default DetalleProducto;