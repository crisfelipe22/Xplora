package com.backend.dto.entada;

import com.backend.entity.PaqueteExperiencia;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public class CategoriaEntradaDto {


    @NotBlank(message="Debe indicar el nombre de la categoria")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    @Positive(message = "El precio no puede ser nulo o menor a cero")
    private String id_categoria;

    public CategoriaEntradaDto(String nombre, String id_categoria) {
        this.nombre = nombre;
        this.id_categoria = id_categoria;
    }

    public CategoriaEntradaDto() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(String id_categoria) {
        this.id_categoria = id_categoria;
    }
}
