import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Button, Typography, Box, TextField } from "@mui/material";
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
    const productUrl = window.location.href;
    const [mensaje, setMensaje] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleShare = (platform) => {
      let url = "";
      const fullMessage = `${mensaje ? mensaje + " " : ""}${nombre} ${productUrl}`;
      switch (platform) {
        case "facebook":
          //Facebook no admite compartir enlaces locales (http://localhost) ni un mensaje persanalizado. Tenemos que tener deplegada la app
          // o crear un nuevo enlace corto en https://tinyurl.com y hardcodearlo
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
          break;
        case "twitter":
          url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(fullMessage)}`;
          break;
        case "whatsapp":
          url = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
          break;
        case "instagram":
          navigator.clipboard.writeText(fullMessage);
          alert("Enlace copiado. Ábrelo manualmente en Instagram.");
          return;
        case "email":
          url = `mailto:?subject=${encodeURIComponent("Quieres vivir esta experiencia de Xplora?")}&body=${encodeURIComponent(fullMessage)}`;
          break;
        case "copy":
          navigator.clipboard.writeText(fullMessage);
          alert("Enlace copiado al portapapeles.");
          return;
        default:
          return;
      }
      window.open(url, "_blank");
    };

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
                style={{ width: 100, height: 75, borderRadius: 8 }}
              />
              <Typography fontWeight="bold">{nombre}</Typography>
            </Box>
            <TextField
              label="Agrega un mensaje"
              fullWidth
              multiline
              minRows={2}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Box mt={2} display="grid" gap={1}>
              <Button variant="outlined" startIcon={<ContentCopyIcon />}  onClick={() => handleShare("copy")}>
                COPIAR ENLACE
              </Button>
              <Button variant="outlined" startIcon={<FacebookIcon />} onClick={() => handleShare("facebook")}>
                FACEBOOK
              </Button>
              <Button variant="outlined" startIcon={<TwitterIcon />} onClick={() => handleShare("twitter")}>
                TWITTER
              </Button>
              <Button variant="outlined" startIcon={<InstagramIcon />} onClick={() => handleShare("instagram")}>
                INSTAGRAM
              </Button>
              <Button variant="outlined" startIcon={<WhatsAppIcon />} onClick={() => handleShare("whatsapp")}>
                WHATSAPP
              </Button>
              <Button variant="outlined" startIcon={<MailOutlineIcon />} onClick={() => handleShare("email")}>
                CORREO ELECTRÓNICO
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
};

export default ModalCompartir;