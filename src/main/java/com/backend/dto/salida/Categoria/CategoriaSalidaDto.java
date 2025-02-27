package com.backend.dto.salida.Categoria;

import com.backend.entity.PaqueteExperiencia;

import java.util.List;

public class CategoriaSalidaDto {
    private Long idCategoria;

    private String nombre;

    private String descripcion;

    private List<PaqueteExperiencia> paqueteExperiencias;
}
