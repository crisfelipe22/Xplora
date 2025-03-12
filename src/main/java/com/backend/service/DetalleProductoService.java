package com.backend.service;

import com.backend.dto.entada.DetalleProductoEntradaDTO;
import com.backend.dto.salida.DetalleProductoSalidaDTO;
import com.backend.entity.DetalleProducto;
import com.backend.exceptions.ConflictException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.DetalleProductoRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetalleProductoService {

    @Autowired
    private DetalleProductoRepository detalleProductoRepository;

    private final ModelMapper modelMapper;
    private static final Logger logger = LoggerFactory.getLogger(DetalleProductoService.class);

    public DetalleProductoService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public DetalleProductoSalidaDTO agregarDetalleProducto(DetalleProductoEntradaDTO detalleProductoDto) {
        logger.info("Agregando nuevo detalle de producto");

        try {
            if (detalleProductoRepository.findByNombre(detalleProductoDto.getNombre()).isPresent()) {
                throw new ConflictException("El detalle producto ya existe.");
            }
            DetalleProducto detalleProducto = modelMapper.map(detalleProductoDto, DetalleProducto.class);
            DetalleProducto nuevoDetalleProducto = detalleProductoRepository.save(detalleProducto);
            return modelMapper.map(nuevoDetalleProducto, DetalleProductoSalidaDTO.class);
        } catch (IllegalArgumentException e) {
            logger.error("Error al agregar detalle producto: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error inesperado un detalle producto", e);
            throw new RuntimeException("Ocurrió un error al agregar el detalle del producto.");
        }
    }

    public List<DetalleProductoSalidaDTO> obtenerTodosLosDetallesProductos() {
        logger.info("Obteniendo todos los detalles de producto");
        List<DetalleProducto> detalles = detalleProductoRepository.findAll();
        return detalles.stream()
                .map(detalle -> modelMapper.map(detalle, DetalleProductoSalidaDTO.class))
                .collect(Collectors.toList());
    }

    public DetalleProductoSalidaDTO obtenerDetalleProductoPorId(Long id) throws ResourceNotFoundException {
        logger.info("Buscando detalle de producto con id '{}'", id);
        DetalleProducto detalle = detalleProductoRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Detalle de producto con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Detalle de producto no encontrado");
                });
        return modelMapper.map(detalle, DetalleProductoSalidaDTO.class);
    }

    @Transactional
    public DetalleProductoSalidaDTO actualizarDetalleProducto(Long id, DetalleProductoEntradaDTO detalleProductoDto) throws ResourceNotFoundException {
        logger.info("Actualizando detalle de producto con id '{}'", id);
        DetalleProducto detalle = detalleProductoRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Detalle de producto con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Detalle de producto no encontrado");
                });
        modelMapper.map(detalleProductoDto, detalle);
        detalle = detalleProductoRepository.save(detalle);
        logger.info("Detalle de producto con id '{}' actualizado exitosamente", id);
        return modelMapper.map(detalle, DetalleProductoSalidaDTO.class);
    }

    @Transactional
    public DetalleProductoSalidaDTO eliminarDetalleProducto(Long id) throws ResourceNotFoundException {
        logger.info("Eliminando detalle de producto con id '{}'", id);
        DetalleProducto detalle = detalleProductoRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Detalle de producto con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Detalle de producto no encontrado");
                });
        detalleProductoRepository.deleteById(id);
        logger.info("Detalle de producto con id '{}' eliminado exitosamente", id);
        return modelMapper.map(detalle, DetalleProductoSalidaDTO.class);
    }
}