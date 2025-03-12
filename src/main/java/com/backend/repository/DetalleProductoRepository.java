package com.backend.repository;

import org.springframework.stereotype.Repository;

import com.backend.entity.Categoria;
import com.backend.entity.DetalleProducto;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface DetalleProductoRepository extends JpaRepository<DetalleProducto, Long> {
    Optional<Categoria> findByNombre(String nombre);
}