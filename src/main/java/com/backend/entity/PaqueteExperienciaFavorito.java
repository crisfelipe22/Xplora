package com.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "paquete_experiencia_favorito")
public class PaqueteExperienciaFavorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_favorito;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_paquete_experiencia", nullable = false)
    private PaqueteExperiencia paqueteExperiencia;

    public PaqueteExperienciaFavorito() {
    }

    public PaqueteExperienciaFavorito(Usuario usuario, PaqueteExperiencia paqueteExperiencia) {
        this.usuario = usuario;
        this.paqueteExperiencia = paqueteExperiencia;
    }

    public Long getId_favorito() {
        return id_favorito;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public PaqueteExperiencia getPaqueteExperiencia() {
        return paqueteExperiencia;
    }

    public void setId_favorito(Long id_favorito) {
        this.id_favorito = id_favorito;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia) {
        this.paqueteExperiencia = paqueteExperiencia;
    }
}

