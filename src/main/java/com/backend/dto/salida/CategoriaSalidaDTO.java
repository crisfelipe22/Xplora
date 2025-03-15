package com.backend.dto.salida;

public class CategoriaSalidaDTO {

    private Long idCategoria;
    private String nombre;
    private String descripcion;
    private String imagen;
    public CategoriaSalidaDTO() {
    }

    public CategoriaSalidaDTO(Long idCategoria, String nombre, String descripcion, String imagen) {
        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
    
    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
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
