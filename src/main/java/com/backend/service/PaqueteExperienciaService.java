package com.backend.service;

import com.backend.dto.entada.Categoria.PaqueteExperienciaEntradaDto;
import com.backend.dto.salida.Categoria.PaqueteExperienciaSalidaDto;
import com.backend.entity.PaqueteExperiencia;
import com.backend.entity.Categoria;
import com.backend.exceptions.ConflictException;
import com.backend.repository.PaqueteExperienciaRepository;
import com.backend.repository.CategoriaRepository;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

@Service
public class PaqueteExperienciaService {

    @Autowired
    private PaqueteExperienciaRepository paqueteExperienciaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    private final ModelMapper modelMapper;

    public PaqueteExperienciaService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    private static final Logger logger = LoggerFactory.getLogger(PaqueteExperienciaService.class);

    @Transactional
    public PaqueteExperienciaSalidaDto agregarPaqueteExperiencia(PaqueteExperienciaEntradaDto paqueteExperienciaEntradaDto) throws BadRequestException {
        logger.info("Iniciando proceso para agregar un nuevo Paquete de Experiencia: {}", paqueteExperienciaEntradaDto.getNombre());

        PaqueteExperienciaSalidaDto paqueteExperienciaSalidaDto;

        // Verificar si el nombre ya existe en la base de datos
        if (paqueteExperienciaRepository.findByNombre(paqueteExperienciaEntradaDto.getNombre()).isPresent()) {
            logger.warn("El nombre '{}' ya está en uso", paqueteExperienciaEntradaDto.getNombre());
            throw new ConflictException("El nombre del paquete de experiencia ya está en uso");
        }

        // Obtener la categoría y lanzar una excepción si no existe
        Categoria categoria = categoriaRepository.findById(paqueteExperienciaEntradaDto.getId_categoria())
                .orElseThrow(() -> {
                    logger.error("Categoría con ID {} no encontrada", paqueteExperienciaEntradaDto.getId_categoria());
                    return new RuntimeException("La categoría no existe");
                });

        // Mapear DTO a entidad y asegurarse de que no tenga ID para evitar problemas de persistencia
        PaqueteExperiencia paqueteExperiencia = modelMapper.map(paqueteExperienciaEntradaDto, PaqueteExperiencia.class);
        paqueteExperiencia.setId_paquete_experiencia(null);
        paqueteExperiencia.setCategoria(categoria);

        try {
            // Intentar guardar el paquete en la base de datos
            PaqueteExperiencia nuevoPaquete = paqueteExperienciaRepository.save(paqueteExperiencia);
            logger.info("Paquete de experiencia '{}' agregado exitosamente con ID {}", nuevoPaquete.getNombre(), nuevoPaquete.getId_paquete_experiencia());
            paqueteExperienciaSalidaDto = modelMapper.map(nuevoPaquete, PaqueteExperienciaSalidaDto.class);
            return paqueteExperienciaSalidaDto;
        } catch (Exception e) {
            logger.error("Error inesperado al guardar el paquete de experiencia '{}': {}", paqueteExperienciaEntradaDto.getNombre(), e.getMessage(), e);
            throw new BadRequestException("Error al guardar el paquete de experiencia, por favor intente nuevamente.");
        }
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
