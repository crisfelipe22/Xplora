import { useEffect, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";

const WhatsAppButton = () => {
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    axios.get("/api/whatsapp/link")
  .then((response) => {
    console.log(response.data); // Verifica la respuesta del backend
    setWhatsappUrl(response.data.whatsappUrl);
  })
  .catch((error) => console.error("Error al obtener enlace de WhatsApp:", error))
  }, []);

  return (
    <SpeedDial
      ariaLabel="Opciones"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {whatsappUrl && (
        <SpeedDialAction
          icon={<WhatsAppIcon />}
          tooltipTitle="WhatsApp"
          onClick={() => window.open(whatsappUrl, "_blank")}
        />
      )}
    </SpeedDial>
  );
};

export default WhatsAppButton;
