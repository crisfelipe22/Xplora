package com.backend.service;

import com.backend.entity.Categoria;
import com.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria agregarCategoria(Categoria categoria) {
        // Verificar si la categoría ya existe
        if (categoriaRepository.findByNombre(categoria.getNombre()).isPresent()) {
            throw new IllegalArgumentException("La categoría ya existe.");
        }
        // Guardar la nueva categoría
        return categoriaRepository.save(categoria);
    }
    
    public List<Categoria> obtenerTodasLasCategorias() {
        
        return categoriaRepository.findAll();
    }
}
