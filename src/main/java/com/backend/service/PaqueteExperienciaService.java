package com.backend.service;

import com.backend.entity.PaqueteExperiencia;
import com.backend.entity.Categoria;
import com.backend.repository.PaqueteExperienciaRepository;
import com.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaqueteExperienciaService {

    @Autowired
    private PaqueteExperienciaRepository paqueteExperienciaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Transactional
    public PaqueteExperiencia agregarPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia) {
        // Verificar si el nombre ya existe en la base de datos
        Optional<PaqueteExperiencia> paqueteExistente = paqueteExperienciaRepository.findByNombre(paqueteExperiencia.getNombre());
        if (paqueteExistente.isPresent()) {
            throw new IllegalArgumentException("El nombre del paquete de experiencia ya está en uso");
        }

        // Verificar si la categoría existe en la base de datos
        Optional<Categoria> categoria = categoriaRepository.findById(paqueteExperiencia.getCategoria().getIdCategoria());
        if (!categoria.isPresent()) {
            throw new IllegalArgumentException("La categoría no existe");
        }

        // Asignar la categoría al paquete de experiencia
        paqueteExperiencia.setCategoria(categoria.get());

        // Guardar el paquete de experiencia en la base de datos
        return paqueteExperienciaRepository.save(paqueteExperiencia);
    }

    public List<PaqueteExperiencia> obtenerTodosLosPaquetes() {
        return paqueteExperienciaRepository.findAll();
    }

    public List<PaqueteExperiencia> obtenerPaquetesAleatorios(int cantidad) {
        List<PaqueteExperiencia> paquetes = paqueteExperienciaRepository.findAll();

        Collections.shuffle(paquetes);

        return paquetes.stream().limit(cantidad).collect(Collectors.toList());
    }

}
