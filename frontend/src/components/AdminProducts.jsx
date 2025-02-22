/* eslint-disable no-unused-vars */
import {useState, useEffect, React} from 'react';
import axios from 'axios';
import { Button, Box, Typography, TableContainer, TableBody, TableCell, TableHead, Table, TableRow } from "@mui/material";
import SidebarAdmin from "./SidebarAdmin";
import styles from "../styles/AdminProducts.module.css";
import { Link } from 'react-router-dom';
import AdminLayout from "./AdminLayout";


const AdminProduct = () => {
    //Suponiendo el arreglo de objetos por ahora
    // const products = [
    //     {id: 1,id_paquete_experiencia: 1, nombre: 'Cena para dos'},
    //     {id: 2,id_paquete_experiencia: 2, nombre: 'Noche en el hotel Tequendama'},
    //     {id: 3,id_paquete_experiencia: 3, nombre: 'Desayuno sorpresa'}
    // ]
    //llamado GET

    const handleDelete = (event) => {
      const trElement = event.target.closest('tr');
      const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este registro?');

      if (isConfirmed) {
        trElement.remove();
      }
    }

    const handleEdit = () => {console.log("Editado")};
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/paquete-experiencia");
                setProducts(response.data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };

        fetchProducts();
    }, []);
   

    return (
        <AdminLayout>
            <Box  className={styles.container}>
            <SidebarAdmin />
            <Box className={styles.productContainer}>
                <Box className={styles.titleLista}>
                    <Typography variant="h4" className={styles.titleListaProductos}>
                        Lista de Productos
                    </Typography>
                </Box>
                <Box className={styles.titleProduct}>
                    <Typography variant="h4" className={styles.titleProducts}>
                        Productos
                    </Typography>
                </Box>
        
                <Box className={styles.contenido}>

                    <Link to= "/admin/productos/nuevo-producto">
                        <Button className={styles.botonAddProduct}
                            variant="contained"
                            color="primary"
                        >
                            AGREGAR PRODUCTO
                        </Button>
                    </Link>

                    <TableContainer className={styles.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={styles.tableHeader}>ID Producto</TableCell>
                                    <TableCell className={styles.tableHeader}>Nombre</TableCell>
                                    <TableCell className={styles.tableHeader}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id_paquete_experiencia} className={styles.tableRow}>
                                        <TableCell>{product.id_paquete_experiencia}</TableCell>
                                        <TableCell>{product.nombre}</TableCell>
                                        <TableCell>
                                            <Link to={`/detalle-producto/${product.id_paquete_experiencia}`} underline="hover">
                                              <Button variant="outlined" color="success">
                                                  Ver
                                              </Button>
                                            </Link>
                                            <Button variant="outlined" className={styles.botonEliminar} onClick={handleDelete}>
                                                Eliminar
                                            </Button>
                                            <Button variant="outlined" className={styles.botonEditar} onClick={handleEdit}>
                                                Editar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
                
            </Box>
        </Box>
        
        
        </AdminLayout>
    );
};

export default AdminProduct;