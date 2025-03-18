package com.backend.dto.entada; 

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class CategoriaEntradaDTO {

    @NotBlank(message = "Debe indicar el nombre de la categoría")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    @Size(max = 255, message = "La descripción no debe superar los 255 caracteres")
    private String descripcion;

    private String imagen;

    public CategoriaEntradaDTO() {
    }

    public CategoriaEntradaDTO(String nombre, String descripcion, String imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
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

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}
