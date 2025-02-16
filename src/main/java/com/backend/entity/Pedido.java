package com.backend.entity;
import jakarta.persistence.*;
import jakarta.persistence.Entity;


@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pedido;

    @ManyToOne
    @JoinColumn(name = "paquete_experiencia_id")
    private PaqueteExperiencia paquete_experiencia;

    private String estado;

    private boolean es_regalo;
    private double total;

    public Pedido(Long id_pedido, PaqueteExperiencia paquete_experiencia, String estado, boolean es_regalo, double total) {
        this.id_pedido = id_pedido;
        this.paquete_experiencia = paquete_experiencia;
        this.estado = estado;
        this.es_regalo = es_regalo;
        this.total = total;
    }

    public Pedido() {
    }

    // Getters y Setters
    public Long getIdPedido() {
        return id_pedido;
    }

    public void setIdPedido(Long idPedido) {
        this.id_pedido = idPedido;
    }

    public PaqueteExperiencia getPaqueteExperiencia() {
        return paquete_experiencia;
    }

    public void setPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia) {
        this.paquete_experiencia = paqueteExperiencia;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public boolean isEsRegalo() {
        return es_regalo;
    }

    public void setEsRegalo(boolean esRegalo) {
        this.es_regalo = esRegalo;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}

