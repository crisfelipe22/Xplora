package com.backend.dto;

import com.backend.entity.PaqueteExperiencia;

import java.util.List;

public class CategoriaSalidaDto {
    private Long id_categoria;

    private String nombre;

    private String descripcion;

    private List<PaqueteExperiencia> paquete_experiencias;
}
