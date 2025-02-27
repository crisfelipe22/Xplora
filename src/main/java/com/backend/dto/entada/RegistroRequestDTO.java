package com.backend.dto.entada;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

// DTO para solicitud de registro
public class RegistroRequestDTO {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 45, message = "El nombre debe tener entre 3 y 45 caracteres")
    private String nombre;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El formato del email no es válido")
    @Size(max = 45, message = "El email debe tener máximo 45 caracteres")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, max = 45, message = "La contraseña debe tener entre 6 y 45 caracteres")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{6,}$",
            message = "La contraseña debe contener al menos un número y una letra")
    private String contrasena;

    private int telefono;

    @Size(max = 100, message = "La dirección debe tener máximo 100 caracteres")
    private String direccion;

    private Long id_rol;
    
        // Constructor con todos los atributos
    public RegistroRequestDTO(String nombre, String email, String contrasena, int telefono, String direccion, Long id_rol) {
      this.nombre = nombre;
      this.email = email;
      this.contrasena = contrasena;
      this.telefono = telefono;
      this.direccion = direccion;
      this.id_rol = id_rol;
    }

    public RegistroRequestDTO() {
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getId_rol() {
        return id_rol;
    }

    public void setId_Rol(Long id_rol) {
        this.id_rol = id_rol;
    }
}