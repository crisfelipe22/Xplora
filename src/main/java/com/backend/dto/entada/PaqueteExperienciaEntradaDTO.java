package com.backend.dto.entada;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.util.Date;
import java.util.List;

public class PaqueteExperienciaEntradaDTO {

    @NotBlank(message="Debe indicar el nombre del paquete de experiencia")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    @NotBlank(message="Debe indicar la descripción del paquete de experiencia")
    @Size(min = 3, max = 800, message = "La descripción debe tener entre 3 y 800 caracteres")
    private String descripcion;

    @Positive(message = "El precio no puede ser nulo o menor a cero")
    private double precio;

    @NotBlank(message="Debe indicar la ubicación del paquete de experiencia")
    @Size(min = 3, max = 50, message = "La ubicación debe tener entre 3 y 50 caracteres")
    private String ubicacion;

    @NotBlank(message="Debe indicar de la imagen del paquete de experiencia")
    private String imagen;

    @FutureOrPresent(message = "La fecha no puede ser anterior al día de hoy")
    @NotNull(message = "Debe especificarse la fecha de experiencia")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "Formato valido: yyyy-MM-dd'T'HH:mm:ss")
    private Date fecha_inicio;

    @FutureOrPresent(message = "La fecha no puede ser anterior al día de hoy")
    @NotNull(message = "Debe especificarse la fecha de experiencia")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "Formato valido: yyyy-MM-dd'T'HH:mm:ss")
    private Date fecha_fin;

    @NotBlank(message = "Debe indicar la duración de la experiencia")
    @Pattern(regexp = "^[0-9]+\\s?(min|hora|horas|dia|dias)$", message = "La duración debe estar en un formato válido, por ejemplo: '30 min', '2 horas', '1 dia'")
    private String duracion;

    @Positive(message = "La categoria no puede ser nulo o menor a cero")
    private Long id_categoria;

    private List<CaracteristicaPaqueteExperienciaEntradaDTO> caracteristicas_paquete_experiencia;

    public PaqueteExperienciaEntradaDTO(String nombre, String descripcion, double precio, String ubicacion, String imagen, Date fecha_inicio, Date fecha_fin, String duracion, Long id_categoria, List<CaracteristicaPaqueteExperienciaEntradaDTO> caracteristicas_paquete_experiencia) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.imagen = imagen;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.duracion = duracion;
        this.id_categoria = id_categoria;
        this.caracteristicas_paquete_experiencia = caracteristicas_paquete_experiencia;
    }

    public PaqueteExperienciaEntradaDTO() {
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

    public double getPrecio() {
        return precio;
    }

    public Long getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public Date getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(Date fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public List<CaracteristicaPaqueteExperienciaEntradaDTO> getCaracteristicas_paquete_experiencia() {
        return caracteristicas_paquete_experiencia;
    }

    public void setCaracteristicas_paquete_experiencia(List<CaracteristicaPaqueteExperienciaEntradaDTO> caracteristicas_paquete_experiencia) {
        this.caracteristicas_paquete_experiencia = caracteristicas_paquete_experiencia;
    }
}
