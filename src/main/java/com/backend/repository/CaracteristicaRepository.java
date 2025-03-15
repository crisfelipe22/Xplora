package com.backend.repository;

import org.springframework.stereotype.Repository;

import com.backend.entity.Caracteristica;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
    Optional<Caracteristica> findByNombre(String nombre);
}