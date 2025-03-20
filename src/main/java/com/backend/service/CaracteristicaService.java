package com.backend.service;

import com.backend.dto.entada.CaracteristicaEntradaDTO;
import com.backend.dto.salida.CaracteristicaSalidaDTO;
import com.backend.entity.Caracteristica;
import com.backend.exceptions.ConflictException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.CaracteristicaRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CaracteristicaService {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    private final ModelMapper modelMapper;
    private static final Logger logger = LoggerFactory.getLogger(CaracteristicaService.class);

    public CaracteristicaService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CaracteristicaSalidaDTO agregarcaracteristica(CaracteristicaEntradaDTO caracteristicaDto) {
        logger.info("Agregando nuevo caracteristica");

        try {
            if (caracteristicaRepository.findByNombre(caracteristicaDto.getNombre()).isPresent()) {
                throw new ConflictException("La caracteristica ya existe.");
            }
            Caracteristica caracteristica = modelMapper.map(caracteristicaDto, Caracteristica.class);
            Caracteristica nuevaCaracteristica = caracteristicaRepository.save(caracteristica);
            return modelMapper.map(nuevaCaracteristica, CaracteristicaSalidaDTO.class);
        } catch (IllegalArgumentException e) {
            logger.error("Error al agregar caracteristica producto: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error inesperado un caracteristica producto", e);
            throw new RuntimeException("Ocurrió un error al agregar el caracteristica del producto.");
        }
    }

    public List<CaracteristicaSalidaDTO> obtenerTodosLoscaracteristicasProductos() {
        logger.info("Obteniendo todos los caracteristicas de producto");
        List<Caracteristica> caracteristicas = caracteristicaRepository.findAll();
        return caracteristicas.stream()
                .map(caracteristica -> modelMapper.map(caracteristica, CaracteristicaSalidaDTO.class))
                .collect(Collectors.toList());
    }

    public CaracteristicaSalidaDTO obtenercaracteristicaPorId(Long id) throws ResourceNotFoundException {
        logger.info("Buscando caracteristica con id '{}'", id);
        Caracteristica caracteristica = caracteristicaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("caracteristica con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("caracteristica no encontrada");
                });
        return modelMapper.map(caracteristica, CaracteristicaSalidaDTO.class);
    }

    @Transactional
    public CaracteristicaSalidaDTO actualizarcaracteristica(Long id, CaracteristicaEntradaDTO caracteristicaDto) throws ResourceNotFoundException {
        logger.info("Actualizando caracteristica con id '{}'", id);
        Caracteristica caracteristica = caracteristicaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("caracteristica con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("caracteristica no encontrada");
                });
        modelMapper.map(caracteristicaDto, caracteristica);
        caracteristica = caracteristicaRepository.save(caracteristica);
        logger.info("caracteristica con id '{}' actualizado exitosamente", id);
        return modelMapper.map(caracteristica, CaracteristicaSalidaDTO.class);
    }

    @Transactional
    public CaracteristicaSalidaDTO eliminarcaracteristica(Long id) throws ResourceNotFoundException {
        logger.info("Eliminando caracteristica con id '{}'", id);
        Caracteristica caracteristica = caracteristicaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("caracteristica con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("caracteristica no encontrada");
                });
        caracteristicaRepository.deleteById(id);
        logger.info("caracteristica con id '{}' eliminado exitosamente", id);
        return modelMapper.map(caracteristica, CaracteristicaSalidaDTO.class);
    }
}