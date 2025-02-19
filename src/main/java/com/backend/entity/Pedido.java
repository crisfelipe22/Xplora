package com.backend.entity;
import jakarta.persistence.*;
import jakarta.persistence.Entity;


@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedido;

    @ManyToOne
    @JoinColumn(name = "paquete_experiencia_id")
    private PaqueteExperiencia paqueteExperiencia;

    private boolean esRegalo;
    private double total;

    public Pedido() {
    }

    // Getters y Setters
    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public PaqueteExperiencia getPaqueteExperiencia() {
        return paqueteExperiencia;
    }

    public void setPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia) {
        this.paqueteExperiencia = paqueteExperiencia;
    }

    public boolean isEsRegalo() {
        return esRegalo;
    }

    public void setEsRegalo(boolean esRegalo) {
        this.esRegalo = esRegalo;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}

