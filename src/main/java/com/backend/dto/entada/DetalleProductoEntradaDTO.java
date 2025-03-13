package com.backend.dto.entada;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class DetalleProductoEntradaDTO {

    @NotBlank(message = "Debe indicar el nombre del detalle del producto")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    @NotBlank(message = "Debe indicar la descripción del detalle del producto")
    @Size(min = 3, max = 255, message = "La descripción debe tener entre 3 y 255 caracteres")
    private String descripcion;

    @NotBlank(message = "Debe indicar el logo del detalle del producto")
    private String logo;

    public DetalleProductoEntradaDTO() {
    }

    public DetalleProductoEntradaDTO(String nombre, String descripcion, String logo) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.logo = logo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
