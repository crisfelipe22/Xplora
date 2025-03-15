package com.backend.service;

import com.backend.dto.entada.PaqueteExperienciaEntradaDTO;
import com.backend.dto.salida.PaqueteExperienciaSalidaDTO;
import com.backend.entity.PaqueteExperiencia;
import com.backend.entity.Categoria;
import com.backend.exceptions.ConflictException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.PaqueteExperienciaRepository;
import com.backend.repository.CategoriaRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
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
    public PaqueteExperienciaSalidaDTO agregarPaqueteExperiencia(@Valid PaqueteExperienciaEntradaDTO paqueteExperienciaEntradaDto) throws BadRequestException {
        logger.info("Iniciando proceso para agregar un nuevo Paquete de Experiencia: {}", paqueteExperienciaEntradaDto.getNombre());

        PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto;

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
            // Guardar el paquete en la base de datos
            PaqueteExperiencia nuevoPaquete = paqueteExperienciaRepository.save(paqueteExperiencia);
            logger.info("Paquete de experiencia '{}' agregado exitosamente con ID {}", nuevoPaquete.getNombre(), nuevoPaquete.getId_paquete_experiencia());
            paqueteExperienciaSalidaDto = modelMapper.map(nuevoPaquete, PaqueteExperienciaSalidaDTO.class);
            paqueteExperienciaSalidaDto.setId_categoria(nuevoPaquete.getCategoria().getId_categoria());
            return paqueteExperienciaSalidaDto;
        } catch (Exception e) {
            logger.error("Error inesperado al guardar el paquete de experiencia '{}': {}", paqueteExperienciaEntradaDto.getNombre(), e.getMessage(), e);
            throw new BadRequestException("Error al guardar el paquete de experiencia, por favor intente nuevamente.");
        }
    }

    public List<PaqueteExperienciaSalidaDTO> obtenerTodosLosPaquetes() {
        try {
            logger.info("Obteniendo todos los paquetes de experiencia");
            List<PaqueteExperiencia> paquetes = paqueteExperienciaRepository.findAll();
            return paquetes.stream()
                    .map(paquete -> {
                        PaqueteExperienciaSalidaDTO dto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
                        dto.setId_categoria(paquete.getCategoria().getId_categoria());
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error obteniendo todos los paquetes", e);
            throw new RuntimeException("Error obteniendo paquetes de experiencia");
        }
    }

    public List<PaqueteExperienciaSalidaDTO> obtenerPaquetesAleatorios(int cantidad) {
        try {
            logger.info("Obteniendo {} paquetes de experiencia aleatorios", cantidad);
            List<PaqueteExperiencia> paquetes = paqueteExperienciaRepository.findAll();
            Collections.shuffle(paquetes);
            return paquetes.stream()
                    .limit(cantidad)
                    .map(paquete -> {
                        PaqueteExperienciaSalidaDTO dto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
                        dto.setId_categoria(paquete.getCategoria().getId_categoria());
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error obteniendo paquetes aleatorios", e);
            throw new RuntimeException("Error obteniendo paquetes aleatorios");
        }
    }


    public PaqueteExperienciaSalidaDTO obtenerPaqueteExperienciaPorId(Long id) throws ResourceNotFoundException {
        logger.info("Obteniendo datos del paquete con id '{}'", id);
        PaqueteExperiencia paquete = paqueteExperienciaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Paquete con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Paquete de experiencia no encontrado");
                });
        PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
        paqueteExperienciaSalidaDto.setId_categoria(paquete.getCategoria().getId_categoria());
        return paqueteExperienciaSalidaDto;
    }

    public List<PaqueteExperienciaSalidaDTO> obtenerPaqueteExperienciaPorFiltro(String nombre, Date fecha_inicio, Date fecha_fin) {
        try {
            logger.info("Obteniendo datos del paquete por filtro: nombre={}, fecha_inicio={}, fecha_fin={}", nombre, fecha_inicio, fecha_fin);

            List<PaqueteExperiencia> paquetes = paqueteExperienciaRepository.findByFilter(nombre, fecha_inicio, fecha_fin);
            return paquetes.stream()
                    .map(paquete -> {
                        PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
                        paqueteExperienciaSalidaDto.setId_categoria(paquete.getCategoria().getId_categoria());
                        return paqueteExperienciaSalidaDto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error obteniendo paquetes por filtro", e);
            throw new RuntimeException("Error obteniendo paquetes por filtro");
        }
    }

    @Transactional
    public PaqueteExperienciaSalidaDTO eliminarPaqueteExperiencia(Long id) throws ResourceNotFoundException, BadRequestException {
        logger.info("Eliminando el paquete de experiencia con el id '{}'", id);
        PaqueteExperiencia paquete = paqueteExperienciaRepository.findById(id).orElse(null);
        if (paquete == null) {
            logger.error("Paquete con id '{}' no encontrado", id);
            throw new ResourceNotFoundException("Paquete de experiencia con ID " + id + " no encontrado");
        }
        try {
            paqueteExperienciaRepository.deleteById(id);
            logger.info("Paquete con ID '{}' eliminado exitosamente", id);
            PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
            paqueteExperienciaSalidaDto.setId_categoria(paquete.getCategoria().getId_categoria());
            return paqueteExperienciaSalidaDto;
        } catch (Exception e) {
            logger.error("Error inesperado al eliminar el paquete con ID '{}': {}", id, e.getMessage(), e);
            throw new BadRequestException("Error al eliminar el paquete de experiencia, por favor intente nuevamente.");
        }
    }

    @Transactional
    public PaqueteExperienciaSalidaDTO actualizarPaqueteExperiencia(Long id, PaqueteExperienciaEntradaDTO paqueteExperienciaEntradaDto) throws ResourceNotFoundException, BadRequestException {
        logger.info("Actualizando el paquete con el id '{}'", id);
        PaqueteExperiencia paquete = paqueteExperienciaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Paquete de experiencia con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Paquete de experiencia con ID " + id + " no encontrado");
                });

        Categoria categoria = categoriaRepository.findById(paqueteExperienciaEntradaDto.getId_categoria())
                .orElseThrow(() -> {
                    logger.error("La categoría con ID " + paqueteExperienciaEntradaDto.getId_categoria() + " no existe");
                    return new ResourceNotFoundException(
                            "La categoría con ID " + paqueteExperienciaEntradaDto.getId_categoria() + " no existe");
                });

        modelMapper.map(paqueteExperienciaEntradaDto, paquete);
        paquete.setCategoria(categoria);
        try {
            paquete = paqueteExperienciaRepository.save(paquete);
            logger.info("Paquete con ID '{}' actualizado exitosamente", id);
            PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
            paqueteExperienciaSalidaDto.setId_categoria(paqueteExperienciaEntradaDto.getId_categoria());
            return paqueteExperienciaSalidaDto;
        } catch (Exception e) {
            logger.error("Error inesperado al guardar el paquete con ID '{}': {}", id, e.getMessage(), e);
            throw new BadRequestException("Error al guardar el paquete de experiencia, por favor intente nuevamente.");
        }
    }
}