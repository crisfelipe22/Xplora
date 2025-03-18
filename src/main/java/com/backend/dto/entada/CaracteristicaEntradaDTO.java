package com.backend.dto.entada;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class CaracteristicaEntradaDTO {

    @NotBlank(message = "Debe indicar el nombre de la caracteristica")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    @NotBlank(message = "Debe indicar el logo de la caracteristica")
    private String logo;

    public CaracteristicaEntradaDTO() {
    }

    public CaracteristicaEntradaDTO(String nombre, String logo) {
        this.nombre = nombre;
        this.logo = logo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
