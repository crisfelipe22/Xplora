/* eslint-disable no-unused-vars */
import {useState, useEffect, React} from 'react';
import { Button, Box, Typography, TableContainer, TableBody, TableCell, TableHead, Table, TableRow, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination } from "@mui/material";
import AdminLayout from "./AdminLayout";
import { Link } from 'react-router-dom';
import SidebarAdmin from "./SidebarAdmin";
import styles from "../styles/AdminProducts.module.css";

const CardAdminUsers = () =>{
    const [pag, setPag] = useState(0);
    const [columnPorPag, setColumnPorPag] = useState(5);

    const users = [
        {id: 1,
            nombre: 'Sara Mendoza',
            correo: 'sara@xplora.com',
            rol: 'admin'
        },
        {id: 2,
            nombre: 'Solymar Quiaro',
            correo: 'solymar@xplora.com',
            rol: 'user'
        }
    ]
    return(
        <AdminLayout>
            <Box  className={styles.container}>
            <SidebarAdmin />
            <Box className={styles.productContainer}>
                <Box className={styles.titleLista}>
                    <Typography variant="h4" className={styles.titleListaProductos}>
                        Usuarios
                    </Typography>
                </Box>
                <Box className={styles.titleProduct}>
                    <Typography variant="h4" className={styles.titleProducts}>
                        Usuarios
                    </Typography>
                </Box>
        
                <Box className={styles.contenido}>

                    <TableContainer className={styles.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={styles.tableHeader}>ID Usuario</TableCell>
                                    <TableCell className={styles.tableHeader}>Nombre</TableCell>
                                    <TableCell className={styles.tableHeader}>Correo</TableCell>
                                    <TableCell className={styles.tableHeader}>Permisos</TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <TableBody>
                                {users.slice(pag * columnPorPag, pag * columnPorPag + columnPorPag)                                
                                .map((user) => (
                                    <TableRow key={user.id} className={styles.tableRow}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.nombre}</TableCell>
                                        <TableCell>{user.correo}</TableCell>
                                        <TableCell>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={users.length}
                        rowsPerPage={columnPorPag}
                        page={pag}
                        onPageChange={(event, newPage) => setPag(newPage)}
                        onRowsPerPageChange={(event) => setColumnPorPag(parseInt(event.target.value, 10))}
                        labelRowsPerPage="Filas por página"
                    />

                </Box>
                
            </Box>
        </Box>
            {/*<Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>¿Eliminar producto?</DialogTitle>
                <DialogContent>
                    <p>¿Estás seguro de que deseas eliminar -- {productAEliminar?.nombre} -- ? Esta acción no se puede deshacer.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
                    <Button onClick={handleDelete} color="error">Eliminar</Button>
                </DialogActions>
            </Dialog>

            {éxito *
            <Snackbar
                open={openEliminadoExito}
                autoHideDuration={3000}
                onClose={() => setOpenEliminadoExito(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success">¡Producto eliminado con éxito!</Alert>
            </Snackbar>*/}
        
        </AdminLayout>
    )
}; 

export default CardAdminUsers;