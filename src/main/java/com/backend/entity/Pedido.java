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
    @JoinColumn(name = "id_PaqueteExperiencia", nullable = false)
    private PaqueteExperiencia paqueteExperiencia;

    private boolean esRegalo;
    private double total;

    // Getters y Setters
}
