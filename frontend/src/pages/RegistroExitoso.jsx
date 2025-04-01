import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";

const RESEND_COOLDOWN = 30; // Cooldown in seconds

const RegistroExitoso = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResendEmail = async () => {
    if (cooldown > 0) return;
    setLoading(true);
    setMessage("");
    try {
      await axios.post("/api/auth/resend-confirmation", { email });
      setMessage("Correo de confirmación reenviado correctamente.");
      setCooldown(RESEND_COOLDOWN); // Reset cooldown
    } catch (error) {
      setMessage(
        "Hubo un error al reenviar el correo. Intenta nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        ¡Registro Exitoso!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Te hemos enviado un correo de confirmación a {email}. Por favor revisa
        tu bandeja de entrada.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleResendEmail}
        disabled={loading || cooldown > 0}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : cooldown > 0 ? (
          `Si no recibiste el correo, podemos reenviártelo dentro de ${cooldown} segundos`
        ) : (
          "Reenviar Correo de Confirmación"
        )}
      </Button>
      {message && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
      <Button variant="text" sx={{ mt: 2 }} onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default RegistroExitoso;
