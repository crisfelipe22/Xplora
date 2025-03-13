package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.DetalleProducto;
import com.backend.entity.PaqueteDetalleProducto;
import com.backend.entity.PaqueteExperiencia;

import jakarta.transaction.Transactional;

public interface PaqueteDetalleProductoRepository extends JpaRepository<PaqueteDetalleProducto, Long>{

    @Transactional
    @Query(value = "SELECT * FROM paquete_detalle_producto WHERE id_paquete_experiencia = :idPaqueteExperiencia AND id_detalle_producto = :idDetalleProducto", 
           nativeQuery = true)
    Optional<PaqueteDetalleProducto> findByPaqueteExperienciaAndDetalleProducto(
        @Param("idPaqueteExperiencia") Long idPaqueteExperiencia,
        @Param("idDetalleProducto") Long idDetalleProducto
    );

}
