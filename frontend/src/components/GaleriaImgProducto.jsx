import styles from "../styles/GaleriaImgProducto.module.css";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { useState } from "react";

const GaleriaImgProducto = () => {

    //ESTAS FUNCIONES DEBEN ESTAR EN DETAIL Y PASARSE POR PARAMETRO OPENGALLERY Y HANDLECLOSEGALLERY
    const [openGallery, setOpenGallery] = useState(true);
    //const handleOpenGallery = () => setOpenGallery(true);
    const handleCloseGallery = () => setOpenGallery(false);

    //simulando las imagenes por ahora
    const imagen = "https://i.pinimg.com/736x/d6/c9/42/d6c94291ddccad51cc91da0f0ebc7b53.jpg, https://i.pinimg.com/736x/0b/7b/20/0b7b20a4891cfdce18cabe2b22236e0c.jpg, https://i.pinimg.com/736x/77/fc/72/77fc72bd2d4c422f649db61b59d4e509.jpg, https://i.pinimg.com/736x/1e/1a/3a/1e1a3a3f20f5acbd2022bf0fc62880e9.jpg, https://i.pinimg.com/736x/95/9b/0b/959b0b3115c3b804a42c64f9ea7148e8.jpg, https://i.pinimg.com/736x/4a/a1/1c/4aa11c37114ca51952c01370b28d19aa.jpg, https://i.pinimg.com/736x/b6/23/62/b6236212dbae1d18701e5a1debb5a4db.jpg"

    const imagenArray = imagen ? imagen.split(',').map(url => url.trim()) : [];

    //las imagenes pasan por parámetro desde detail
    console.log(imagenArray)
    console.log("tipo:" + typeof imagenArray)
    console.log(imagenArray[0])

    return (
        <Dialog open={openGallery} onClose={handleCloseGallery}>
            <DialogContent>
                <div className={styles.galeria}>
                    {imagenArray.map((img, index) =>(
                        <div key={index} className={styles.contenedorImagen}>
                            <img src={img} className={styles.imagen} />
                        </div>
                    ))}
                </div>
            </DialogContent>

            <DialogActions>
                <Button color="primary" onClick={handleCloseGallery}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default GaleriaImgProducto;