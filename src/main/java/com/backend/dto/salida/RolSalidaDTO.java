package com.backend.dto.salida;

public class RolSalidaDTO {

    private Long id_rol;
    private String nombre;

    public RolSalidaDTO(Long id_rol, String nombre) {
        this.id_rol = id_rol;
        this.nombre = nombre;
    }

    public RolSalidaDTO() {
    }

    // Getters y Setters
    public Long getId_rol() {
        return id_rol;
    }

    public void setId_rol(Long id_rol) {
        this.id_rol = id_rol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
