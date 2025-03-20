import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Button, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ModalCompartir = ({ nombre, imagen }) => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <IconButton onClick={handleOpen}>
          <ShareIcon sx={{ color: "black" }} />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Comparte esta Experiencia
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" alignItems="center" gap={2}>
              <img
                src={imagen}
                alt={nombre}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
              <Typography fontWeight="bold">{nombre}</Typography>
            </Box>
            <Box mt={2} display="grid" gap={1}>
              <Button variant="outlined" startIcon={<ContentCopyIcon />}>
                COPIAR ENLACE
              </Button>
              <Button variant="outlined" startIcon={<FacebookIcon />}>
                FACEBOOK
              </Button>
              <Button variant="outlined" startIcon={<TwitterIcon />}>
                TWITTER
              </Button>
              <Button variant="outlined" startIcon={<InstagramIcon />}>
                INSTAGRAM
              </Button>
              <Button variant="outlined" startIcon={<WhatsAppIcon />}>
                WHATSAPP
              </Button>
              <Button variant="outlined" startIcon={<MailOutlineIcon />}>
                CORREO ELECTRÓNICO
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
};

export default ModalCompartir;

export default ModalCompartir;