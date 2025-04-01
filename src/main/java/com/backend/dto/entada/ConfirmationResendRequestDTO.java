package com.backend.dto.entada;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// DTO para solicitud de registro
public class ConfirmationResendRequestDTO {

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El formato del email no es válido")
    @Size(max = 45, message = "El email debe tener máximo 45 caracteres")
    private String email;

        // Constructor con todos los atributos
    public ConfirmationResendRequestDTO(String email) {
      this.email = email;
    }

    public ConfirmationResendRequestDTO() {
    }

    // Getters y Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}