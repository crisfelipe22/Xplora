import { Grid2, Box} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import CardProductoAleatorio from './CardProductoAleatorio';
import styles from "../styles/ProductoAleatorio.module.css";

const ProductoAleatorio = () => {
  function shuffleExceptFirstTwo(array) {
      array.sort((a, b) => a.id_paquete_experiencia - b.id_paquete_experiencia)
      if (array.length <= 2) return array; // No need to shuffle if 2 or fewer elements

      const fixedPart = array.slice(0, 2); // First two elements remain unchanged
      const shufflePart = array.slice(2); // Elements to be shuffled

      // Fisher-Yates shuffle for the remaining part
      for (let i = shufflePart.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shufflePart[i], shufflePart[j]] = [shufflePart[j], shufflePart[i]];
      }

      // console.log([...fixedPart, ...shufflePart])
      return [...fixedPart, ...shufflePart]; // Combine fixed and shuffled parts
  }

    
    const [productosAleatorios, setProductosAleatorios] = useState([]);

    useEffect(() => {
        const obtenerProductosAleatorios = async () => {
        try {
            const response = await axios.get("/api/paquete-experiencia/aleatorios?cantidad=12");
            const shuffled = shuffleExceptFirstTwo(response.data)
            setProductosAleatorios(shuffled);
        } catch (error) {
            console.error("Error obteniendo productos aleatorios:", error);
        }
        };

        obtenerProductosAleatorios();
    }, []);


    return (
        <Box className={styles.gridContainer}>
            <Grid2 container spacing={4}  columns={12}>
                {productosAleatorios.map((product) => (
                    <Grid2 item size={{ mobile: 12, tablet: 6, desktop: 4 }} key={product.id_paquete_experiencia}>
                        <CardProductoAleatorio product={product} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>

    )
}

export default ProductoAleatorio;