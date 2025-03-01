/* eslint-disable no-unused-vars */
import {useState, useEffect, React} from 'react';
import { Button, Box, Typography, TableContainer, TableBody, TableCell, TableHead, Table, TableRow, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination, Select, MenuItem } from "@mui/material";
import AdminLayout from "./AdminLayout";
import SidebarAdmin from "./SidebarAdmin";
import styles from "../styles/AdminProducts.module.css";

const CardAdminUsers = () =>{
    const [pag, setPag] = useState(0);
    const [columnPorPag, setColumnPorPag] = useState(5);

    const [openDialog, setOpenDialog] = useState(false);
    const [cambioRol, setCambioRol] = useState('');
    const [usuarioSelect, setUsuarioSelect] = useState(null);

    const [users, setUsers] = useState([
        {id: 1,
            nombre: 'Sara Mendoza',
            correo: 'sara@xplora.com',
            rol: 'Administrador'
        },
        {id: 2,
            nombre: 'Solymar Quiaro',
            correo: 'solymar@xplora.com',
            rol: 'Usuario'
        },
        {id: 3,
            nombre: 'Sara Mendoza',
            correo: 'sara@xplora.com',
            rol: 'Administrador'
        },
        {id: 4,
            nombre: 'Solymar Quiaro',
            correo: 'solymar@xplora.com',
            rol: 'Usuario'
        },
        {id: 5,
            nombre: 'Sara Mendoza',
            correo: 'sara@xplora.com',
            rol: 'Administrador'
        },
        {id: 6,
            nombre: 'Solymar Quiaro',
            correo: 'solymar@xplora.com',
            rol: 'Usuario'
        },
    ])

    /*useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/usuarios");
                setUsers(response.data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };
        

        fetchUsers();
    }, []);*/

    const handleOpenDialog = (user, rol) => {
        setCambioRol(rol);
        setUsuarioSelect(user)
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setUsuarioSelect(null);
    };

    const handleChangeRol = async () =>{
        if(!usuarioSelect) return;

        setUsers(prevUsers =>
            prevUsers.map(user => 
                user.id === usuarioSelect.id ? { ...user, rol: cambioRol } : user
        ));

        setOpenDialog(false);

        /*try {
            await axios.put(`api/admin/${usuarioSelect.id}`, { rol: cambioRol });
            
            console.log(`Rol de ${usuarioSelect.nombre} actualizado a ${cambioRol}`);
        } catch (error) {
            console.error("Error al actualizar el rol", error);
        }*/
    }

        

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
                                            <Select
                                                value={user.rol}
                                                onChange={e => handleOpenDialog(user, e.target.value)}
                                                className={styles.selectRol}
                                            >
                                                    <MenuItem value="Administrador">Administrador</MenuItem>
                                                    <MenuItem value="Usuario">Usuario</MenuItem>
                                            </Select>
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
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>¿Deseas guardar los cambios?</DialogTitle>
                <DialogContent>
                    <p>¿Estás seguro de que deseas cambiar el rol de <strong>{usuarioSelect?.nombre}</strong> a <strong>{cambioRol}</strong>  ? </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
                    <Button onClick={handleChangeRol} color="error">Confirmar</Button>
                </DialogActions>
            </Dialog>
        
        </AdminLayout>
    )
}; 

export default CardAdminUsers;