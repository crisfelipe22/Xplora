/* eslint-disable no-unused-vars */
import {useState, useEffect, React} from 'react';
import axios from 'axios';
import { Button, Box, Typography, TableContainer, TableBody, TableCell, TableHead, Table, TableRow, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination } from "@mui/material";
import SidebarAdmin from "./SidebarAdmin";
import styles from "../styles/AdminProducts.module.css";
import { Link } from 'react-router-dom';
import AdminLayout from "./AdminLayout";


const AdminProduct = () => {
    const [pag, setPag] = useState(0);
    const [columnPorPag, setColumnPorPag] = useState(5);

    //llamado GET
    const [openDialog, setOpenDialog] = useState(false);
    const [productAEliminar, setProductAEliminar] = useState(null);
    const [openEliminadoExito, setOpenEliminadoExito] = useState(false);
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

    const handleOpenDialog = (product) => {
        setProductAEliminar(product);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async () => {
        if (!productAEliminar) return;

        try {
            await axios.delete(`/api/paquete-experiencia/${productAEliminar.id_paquete_experiencia}`);
            setProducts(products.filter(p => p.id_paquete_experiencia !== productAEliminar.id_paquete_experiencia));
            setOpenEliminadoExito(true);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }

        setOpenDialog(false);
    };

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
                                {products.slice(pag * columnPorPag, pag * columnPorPag + columnPorPag)                                
                                .map((product) => (
                                    <TableRow key={product.id_paquete_experiencia} className={styles.tableRow}>
                                        <TableCell>{product.id_paquete_experiencia}</TableCell>
                                        <TableCell>{product.nombre}</TableCell>
                                        <TableCell>
                                            <Link to={`/detalle-producto/${product.id_paquete_experiencia}`} underline="hover">
                                                <Button variant="outlined" color="success">
                                                    Ver
                                                </Button>
                                            </Link>
                                            <Button variant="outlined" className={styles.botonEliminar} onClick={() => handleOpenDialog(product)}>
                                                Eliminar
                                            </Button>
                                            <Link to={`/admin/productos/editar/${product.id_paquete_experiencia}`}  style={{ textDecoration: 'none' }}>
                                                <Button variant="outlined" className={styles.botonEditar}>
                                                    Editar
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={products.length}
                        rowsPerPage={columnPorPag}
                        page={pag}
                        onPageChange={(event, newPage) => setPag(newPage)}
                        onRowsPerPageChange={(event) => setColumnPorPag(parseInt(event.target.value, 5))}
                        labelRowsPerPage="Filas por página"
                    />

                </Box>
                
            </Box>
        </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>¿Eliminar producto?</DialogTitle>
                <DialogContent>
                    <p>¿Estás seguro de que deseas eliminar -- {productAEliminar?.nombre} -- ? Esta acción no se puede deshacer.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
                    <Button onClick={handleDelete} color="error">Eliminar</Button>
                </DialogActions>
            </Dialog>

            {/* éxito */}
            <Snackbar
                open={openEliminadoExito}
                autoHideDuration={3000}
                onClose={() => setOpenEliminadoExito(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success">¡Producto eliminado con éxito!</Alert>
            </Snackbar>
        
        </AdminLayout>
    );
};

export default AdminProduct;