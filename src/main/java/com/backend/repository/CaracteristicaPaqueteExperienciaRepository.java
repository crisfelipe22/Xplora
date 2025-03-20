package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.CaracteristicaPaqueteExperiencia;

import jakarta.transaction.Transactional;

public interface CaracteristicaPaqueteExperienciaRepository extends JpaRepository<CaracteristicaPaqueteExperiencia, Long>{

    @Transactional
    @Query(value = "SELECT * FROM caracteristica_paquete_experiencia WHERE id_paquete_experiencia = :idPaqueteExperiencia AND id_caracteristica = :idDetalleProducto", 
           nativeQuery = true)
    Optional<CaracteristicaPaqueteExperiencia> findByPaqueteExperienciaAndDetalleProductoById(
        @Param("idPaqueteExperiencia") Long idPaqueteExperiencia,
        @Param("idDetalleProducto") Long idDetalleProducto
    );

    @Transactional
    @Query(value = "SELECT * FROM caracteristica_paquete_experiencia WHERE id_paquete_experiencia = :idPaqueteExperiencia", 
           nativeQuery = true)
    List<CaracteristicaPaqueteExperiencia> findByPaqueteExperienciaById(
        @Param("idPaqueteExperiencia") Long idPaqueteExperiencia
    );

}
