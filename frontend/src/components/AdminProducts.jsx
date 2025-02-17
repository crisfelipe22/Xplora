/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Box, Typography, TableContainer, TableBody, TableCell, TableHead, Table, TableRow } from "@mui/material";
import SidebarAdmin from "./SidebarAdmin";
import styles from "../styles/AdminProducts.module.css";
import { Link } from 'react-router-dom';


const AdminProduct = () => {
    //Suponiendo el arreglo de objetos por ahora
    const products = [
        {id: 1, nombre: 'Cena para dos'},
        {id: 2, nombre: 'Noche en el hotel Tequendama'},
        {id: 3, nombre: 'Desayuno sorpresa'}
    ]
    
    return (
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
                                    <TableRow key={product.id} className={styles.tableRow}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.nombre}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" className={styles.botonEliminar}>
                                                Eliminar
                                            </Button>
                                            <Button variant="outlined" className={styles.botonEditar}>
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
        
        
    );
};

export default AdminProduct;