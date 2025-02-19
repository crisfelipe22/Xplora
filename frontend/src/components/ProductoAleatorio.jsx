import { Grid2, Box} from '@mui/material';
import CardProductoAleatorio from './CardProductoAleatorio';
import styles from "../styles/ProductoAleatorio.module.css";

const ProductoAleatorio = () => {
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
        }
    ]
    
    //llamado GET productos aleatorios
    /*
    const [productosAleatorios, setProductosAleatorios] = useState([]);

    useEffect(() => {
        const obtenerProductosAleatorios = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/paquete-experiencia/aleatorios?cantidad=10");
            setProductosAleatorios(response.data);
        } catch (error) {
            console.error("Error obteniendo productos aleatorios:", error);
        }
        };

        obtenerProductosAleatorios();
    }, []);
    */

    return (
        <Box>
            
            <Grid2 container spacing={3} className={styles.gridContainer}>
                {productosAleatorios.map((product) => (
                    <Grid2 item xs={12} sm={6} key={product.idPaqueteExperiencia}>
                        <CardProductoAleatorio product={product} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>

    )
}

export default ProductoAleatorio;