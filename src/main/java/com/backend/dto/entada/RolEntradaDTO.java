package com.backend.dto.entada;

import jakarta.validation.constraints.NotBlank;

public class RolEntradaDTO {

    @NotBlank(message = "El nombre del rol es obligatorio")
    private String nombre;

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public RolEntradaDTO(String nombre) {
        this.nombre = nombre;
    }

    public RolEntradaDTO() {
    }
}

