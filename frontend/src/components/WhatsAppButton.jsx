import { useEffect, useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Fab from "@mui/material/Fab"
import axios from "axios";

const WhatsAppButton = () => {
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    axios.get("/api/whatsapp/link")
  .then((response) => {
    // console.log(response.data);
    setWhatsappUrl(response.data.link);
  })
  .catch((error) => console.error("Error al obtener enlace de WhatsApp:", error))
  }, []);

  return (
    <Fab
      size="medium"
      color="secondary"
      aria-label="add"
      sx={{ position: "fixed", bottom: 24, right: 24 }}
      onClick={() => window.open(whatsappUrl, "_blank")}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatsAppButton;
