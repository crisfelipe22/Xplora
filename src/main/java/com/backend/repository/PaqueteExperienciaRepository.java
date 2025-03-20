package com.backend.repository;

import com.backend.entity.PaqueteExperiencia;
import com.backend.entity.Categoria;
import com.backend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaqueteExperienciaRepository extends JpaRepository<PaqueteExperiencia, Long> {

    // Método para encontrar un paquete por su nombre
    Optional<PaqueteExperiencia> findByNombre(String nombre);

    @Query("SELECT p FROM PaqueteExperiencia p " +
            "WHERE (:nombre IS NULL OR lower(p.nombre) LIKE CONCAT('%', lower(:nombre), '%')) " +
            "AND ((:fecha_inicio IS NULL OR :fecha_fin IS NULL) OR p.fecha_experiencia BETWEEN :fecha_inicio AND :fecha_fin) " +
            "AND (:categoriaId IS NULL OR p.categoria.id = :categoriaId)")
    List<PaqueteExperiencia> findByFilter(
            @Param("nombre") String nombre, 
            @Param("fecha_inicio") Date fecha_inicio, 
            @Param("fecha_fin") Date fecha_fin, 
            @Param("categoriaId") Long categoriaId);
}

