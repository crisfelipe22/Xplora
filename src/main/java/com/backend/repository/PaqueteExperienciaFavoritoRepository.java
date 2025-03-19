package com.backend.repository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.PaqueteExperienciaFavorito;

import jakarta.transaction.Transactional;


@Repository
public interface PaqueteExperienciaFavoritoRepository extends JpaRepository<PaqueteExperienciaFavorito, Long> {

    @Transactional
    @Query(value = "SELECT * FROM paquete_experiencia_favorito WHERE id_usuario = :id_usuario AND id_paquete_experiencia = :id_paquete_experiencia", 
        nativeQuery = true)
    Optional<PaqueteExperienciaFavorito> findByUsuarioAndPaqueteExperienciaById(
        @Param("id_usuario") Long id_usuario,
        @Param("id_paquete_experiencia") Long id_paquete_experiencia
    );
    
}
