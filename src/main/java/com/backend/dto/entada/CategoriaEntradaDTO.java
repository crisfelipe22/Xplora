package com.backend.dto.entada;

import com.backend.entity.PaqueteExperiencia;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public class CategoriaEntradaDTO {


    @NotBlank(message="Debe indicar el nombre de la categoria")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    public CategoriaEntradaDTO(String nombre) {
        this.nombre = nombre;
    }

    public CategoriaEntradaDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
