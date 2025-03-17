package com.backend.service;

import com.backend.dto.entada.CategoriaEntradaDTO;
import com.backend.dto.salida.CategoriaSalidaDTO;
import com.backend.entity.Categoria;
import com.backend.exceptions.ConflictException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.CategoriaRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    private final ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(CategoriaService.class);

    public CategoriaService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CategoriaSalidaDTO agregarCategoria(CategoriaEntradaDTO categoriaDto) {
        try {
            if (categoriaRepository.findByNombre(categoriaDto.getNombre()).isPresent()) {  
                throw new ConflictException("La categoría ya existe.");
            }
            Categoria categoria = modelMapper.map(categoriaDto, Categoria.class);
            Categoria nuevaCategoria = categoriaRepository.save(categoria);
            return modelMapper.map(nuevaCategoria, CategoriaSalidaDTO.class);
        } catch (IllegalArgumentException e) {
            logger.error("Error al agregar categoría: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error inesperado al agregar categoría", e);
            throw new RuntimeException("Ocurrió un error al agregar la categoría.");
        }
    }

    public List<CategoriaSalidaDTO> obtenerTodasLasCategorias() {
        try {
            List<Categoria> categorias = categoriaRepository.findAll();
            return categorias.stream()
                    .map(categoria -> modelMapper.map(categoria, CategoriaSalidaDTO.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error obteniendo todas las categorías", e);
            throw new RuntimeException("Error obteniendo categorías");
        }
    }

    public CategoriaSalidaDTO obtenerCategoriaPorId(Long id) throws ResourceNotFoundException {
        logger.info("Buscando categoría con id '{}'", id);
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Categoría con id '{}' no encontrada", id);
                    return new ResourceNotFoundException("Categoría no encontrada");
                });
        return modelMapper.map(categoria, CategoriaSalidaDTO.class);
    }

    @Transactional
    public CategoriaSalidaDTO actualizarCategoria(Long id, CategoriaEntradaDTO categoriaDto) throws ResourceNotFoundException {
        logger.info("Actualizando categoría con id '{}'", id);
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Categoría con id '{}' no encontrada", id);
                    return new ResourceNotFoundException("Categoría no encontrada");
                });
        modelMapper.map(categoriaDto, categoria);
        categoria = categoriaRepository.save(categoria);
        logger.info("Categoría con id '{}' actualizada exitosamente", id);
        return modelMapper.map(categoria, CategoriaSalidaDTO.class);
    }

    @Transactional
    public CategoriaSalidaDTO eliminarCategoria(Long id) throws ResourceNotFoundException {
        logger.info("Eliminando categoría con id '{}'", id);
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Categoría con id '{}' no encontrada", id);
                    return new ResourceNotFoundException("Categoría no encontrada");
                });
        categoriaRepository.deleteById(id);
        logger.info("Categoría con id '{}' eliminada exitosamente", id);
        return modelMapper.map(categoria, CategoriaSalidaDTO.class);
    }

}
