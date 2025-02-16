package com.backend.repository;

import com.backend.entity.PaqueteExperiencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaqueteExperienciaRepository extends JpaRepository<PaqueteExperiencia, Long> {

    // Método para encontrar un paquete por su nombre
    Optional<PaqueteExperiencia> findByNombre(String nombre);
}
