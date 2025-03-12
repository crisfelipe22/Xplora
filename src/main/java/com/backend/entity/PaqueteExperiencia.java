package com.backend.entity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "paquete_experiencia")
public class PaqueteExperiencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_paquete_experiencia;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;
    @Column(nullable = false)
    private String nombre;
    private String descripcion;
    private double precio;
    private String ubicacion;
    private String imagen;
    private String duracion;
    private Date fecha_inicio;
    private Date fecha_fin;

    
    @OneToMany(mappedBy = "paqueteExperiencia", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PaqueteDetalleProducto> detallesProductos = new ArrayList<>();

    public PaqueteExperiencia() {
    }

    public PaqueteExperiencia(Long id_paquete_experiencia, Categoria categoria, String nombre, String descripcion, double precio, String ubicacion, String imagen, String duracion, Date fecha_inicio, Date fecha_fin) {
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.categoria = categoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.imagen = imagen;
        this.duracion = duracion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }

    public void agregarDetalleProducto(PaqueteDetalleProducto detalle) {
        this.detallesProductos.add(detalle);
        detalle.setPaqueteExperiencia(this);
    }

    // Getters y Setters
    public Long getId_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
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

    public List<PaqueteDetalleProducto> getDetallesProductos() {
        return detallesProductos;
    }

    public void setDetallesProductos(List<PaqueteDetalleProducto> detallesProductos) {
        this.detallesProductos = detallesProductos;
    }
}

