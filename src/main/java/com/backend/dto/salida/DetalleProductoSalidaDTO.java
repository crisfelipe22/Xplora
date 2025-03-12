package com.backend.dto.salida;

public class DetalleProductoSalidaDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private String logo;

    public DetalleProductoSalidaDTO() {
    }

    public DetalleProductoSalidaDTO(Long id, String nombre, String descripcion, String logo) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.logo = logo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
