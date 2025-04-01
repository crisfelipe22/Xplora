import { useEffect, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";

const WhatsAppButton = () => {
  const [whatsappUrl, setWhatsappUrl] = useState(null);
  const [loading, setLoading] = useState(true); // Estado inicial en true

  useEffect(() => {
    axios.get("/api/whatsapp/link")
      .then((response) => {
        if (response.data && response.data.whatsappUrl) {
          setWhatsappUrl(response.data.whatsappUrl);
        } else {
          console.error("Respuesta inválida del backend:", response.data);
        }
      })
      .catch((error) => console.error("Error al obtener enlace de WhatsApp:", error))
      .finally(() => setLoading(false)); // 🟢 Asegura que loading se actualice
  }, []);

  return (
    <SpeedDial
      ariaLabel="Opciones"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {!loading && whatsappUrl ? (
        <SpeedDialAction
          icon={<WhatsAppIcon style={{ color: "green" }} />}
          tooltipTitle="WhatsApp"
          onClick={() => window.open(whatsappUrl, "_blank")}
        />
      ) : null}
    </SpeedDial>
  );
};

export default WhatsAppButton;

