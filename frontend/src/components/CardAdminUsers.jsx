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
            id_rol: 1
        },
        {id: 2,
            nombre: 'Solymar Quiaro',
            correo: 'solymar@xplora.com',
            id_rol: 2
        },
        {id: 3,
            nombre: 'Sara Mendoza',
            correo: 'sara@xplora.com',
            id_rol: 2
        },
        {id: 4,
            nombre: 'Solymar Quiaro',
            correo: 'solymar@xplora.com',
            id_rol: 2
        },
        {id: 5,
            nombre: 'Sara Mendoza',
            correo: 'sara@xplora.com',
            id_rol: 2
        },
        {id: 6,
            nombre: 'Solymar Quiaro',
            correo: 'solymar@xplora.com',
            id_rol: 2
        },
    ])
    const [roles, setRoles] = useState([
        {
            id_rol: 1,
            nombre: 'Administrador'
        },
        {
            id_rol: 2,
            nombre: 'Usuario'
        }
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

        const obtenerRoles= async () => {
                try {
                    const response = await axios.get("http://localhost:8080/api/roles");
                    setRoles(response.data); 
                    console.log(response.data)
                } catch (error) {
                    console.error("Error al obtener los roles:", error);
                }
        
        obtenerRoles();
        fetchUsers();
    }, []);*/

    const handleOpenDialog = (user, id_rol) => {
        setCambioRol(id_rol);
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
                user.id === usuarioSelect.id ? { ...user, id_rol: cambioRol } : user
        ));

        setOpenDialog(false);

        /*try {
            await axios.put(`api/admin/${usuarioSelect.id}`, { id_rol: cambioRol });
            
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
                                    <TableCell className={styles.tableHeader}>Correo Electrónico</TableCell>
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
                                                labelId="rol-label"
                                                name="id_rol"
                                                value={user.id_rol}
                                                onChange={e => handleOpenDialog(user, e.target.value)}
                                                className={styles.selectRol}
                                            >
                                                {roles.map((rol) => (
                                                    <MenuItem key={rol.id_rol} value={rol.id_rol} >
                                                        {rol.nombre}
                                                    </MenuItem>
                                                ))}
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
            <Dialog open={openDialog} onClose={handleCloseDialog} >
                <DialogTitle className={styles.tituloConfirmacion}>¿Deseas guardar los cambios?</DialogTitle>
                <DialogContent>
                    <p>¿Estás seguro de que deseas cambiar el rol de <strong>{usuarioSelect?.nombre}</strong> a <strong>{roles.find(rol => rol.id_rol === cambioRol)?.nombre || "Desconocido"}</strong>  ? </p>
                </DialogContent>
                <DialogActions className={styles.botones}>
                    <Button onClick={handleCloseDialog} className={styles.botonCancelarConfirmacion}>Cancelar</Button>
                    <Button onClick={handleChangeRol} className={styles.botonAceptarConfirmacion}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        
        </AdminLayout>
    )
}; 

export default CardAdminUsers;