package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.Calificacion;

import jakarta.transaction.Transactional;

public interface CalificacionRepository extends JpaRepository<Calificacion, Long>{
    @Transactional
    @Query(value = "SELECT * FROM calificacion WHERE id_usuario = :id_usuario AND id_reserva = :id_reserva", 
        nativeQuery = true)
    Optional<Calificacion> findByUsuarioAndReservaId(
        @Param("id_usuario") Long id_usuario,
        @Param("id_reserva") Long id_reserva
    );    

    @Transactional
    @Query(value = "SELECT * FROM calificacion WHERE id_usuario = :id_usuario", 
        nativeQuery = true)
    List<Calificacion> findByUsuarioId(@Param("id_usuario") Long id_usuario);

    @Transactional
    @Query(value = "SELECT * FROM calificacion WHERE id_reserva = :id_reserva", 
        nativeQuery = true)
    Optional<Calificacion> findByReservaId(@Param("id_reserva") Long id_reserva);

}
