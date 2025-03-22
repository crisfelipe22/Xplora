/* eslint-disable no-unused-vars */
import {useState, useEffect, React} from 'react';
import { Button, Box, Typography, TableContainer, TableBody, TableCell, TableHead, Table, TableRow, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, TablePagination, Select, MenuItem } from "@mui/material";
import AdminLayout from "./AdminLayout";
import SidebarAdmin from "./SidebarAdmin";
import styles from "../styles/AdminProducts.module.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; 
import usePaginacionDinamica from '../hooks/usePaginacionDinamica';

const CardAdminUsers = () =>{
  const { user } = useContext(AuthContext);
  const userRole = user.rol
    
    const [pag, setPag] = useState(0);
    const {columnPorPag, setColumnPorPag } = usePaginacionDinamica(98, 3)

    const [openDialog, setOpenDialog] = useState(false);
    const [cambioRol, setCambioRol] = useState('');
    const [usuarioSelect, setUsuarioSelect] = useState(null);

    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])

    //EL TOKEN SE OBTIENE DEL LOCAL STORAGE
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/auth", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        const obtenerRoles= async () => {
                try {
                    const response = await axios.get("/api/rol", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setRoles(response.data); 
                    console.log(response.data)
                } catch (error) {
                    console.error("Error al obtener los roles:", error);
                }
            }
        
        obtenerRoles();
        fetchUsers();
    }, [token]);

    const handleOpenDialog = (user, id_rol) => {
        setCambioRol(id_rol);
        setUsuarioSelect({...user, [id_rol]: roles})
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setUsuarioSelect(null);
    };

    const handleChangeRol = async () =>{
        if(!usuarioSelect) return;
        const idRolNumber = Number(cambioRol);
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id_usuario === usuarioSelect.id_usuario ? { ...user, id_rol:idRolNumber } : user
            )
        );
        setOpenDialog(false);

        try {
            await axios.patch(`/api/auth/${usuarioSelect.id_usuario}`, { id_rol: idRolNumber },{
                headers: {
                    Authorization: `Bearer ${token}`
                }});
            console.log(`Rol de ${usuarioSelect.nombre} actualizado a ${cambioRol}`);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id_usuario === usuarioSelect.id_usuario ? { ...user, id_rol:idRolNumber } : user
                )
            );
        } catch (error) {
            console.error("Error al actualizar el rol", error);
        }
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
                                    <TableRow key={user.id_usuario} className={styles.tableRow}>
                                        <TableCell>{user.id_usuario}</TableCell>
                                        <TableCell>{user.nombre}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Select
                                                {...(userRole === "Administrador"  && user.id_rol === 1 ? { disabled: true } : {})}
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
                        component="div"
                        count={users.length}
                        rowsPerPage={columnPorPag}
                        page={pag}
                        onPageChange={(event, newPage) => setPag(newPage)}
                        onRowsPerPageChange={(event) => setColumnPorPag(parseInt(event.target.value, 5))}
                        labelRowsPerPage="Filas por página"
                        sx={{ marginTop: "auto" }}
                        rowsPerPageOptions={Array.from({ length: 100 }, (_, i) => i + 1)}
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