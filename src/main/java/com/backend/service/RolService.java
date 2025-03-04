package com.backend.service;

import com.backend.dto.entada.RolEntradaDTO;
import com.backend.dto.salida.RolSalidaDTO;
import com.backend.entity.Rol;
import com.backend.exceptions.ConflictException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.RolRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    private final ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(RolService.class);

    public RolService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public RolSalidaDTO agregarRol(RolEntradaDTO rolDto) {
        if (rolRepository.findByNombre(rolDto.getNombre()).isPresent()) {
            throw new ConflictException("El rol ya existe.");
        }
        Rol rol = modelMapper.map(rolDto, Rol.class);
        Rol nuevoRol = rolRepository.save(rol);
        return modelMapper.map(nuevoRol, RolSalidaDTO.class);
    }

    public List<RolSalidaDTO> obtenerTodosLosRoles() {
        List<Rol> roles = rolRepository.findAll();
        return roles.stream()
                .map(rol -> modelMapper.map(rol, RolSalidaDTO.class))
                .collect(Collectors.toList());
    }

    public RolSalidaDTO obtenerRolPorId(Long id) throws ResourceNotFoundException {
        logger.info("Buscando rol con id '{}'", id);
        Rol rol = rolRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Rol con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Rol no encontrado");
                });
        return modelMapper.map(rol, RolSalidaDTO.class);
    }

    @Transactional
    public RolSalidaDTO actualizarRol(Long id, RolEntradaDTO rolDto) throws ResourceNotFoundException {
        logger.info("Actualizando rol con id '{}'", id);
        Rol rol = rolRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Rol con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Rol no encontrado");
                });
        modelMapper.map(rolDto, rol);
        rol = rolRepository.save(rol);
        logger.info("Rol con id '{}' actualizado exitosamente", id);
        return modelMapper.map(rol, RolSalidaDTO.class);
    }

    @Transactional
    public RolSalidaDTO eliminarRol(Long id) throws ResourceNotFoundException {
        logger.info("Eliminando rol con id '{}'", id);
        Rol rol = rolRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Rol con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Rol no encontrado");
                });
        rolRepository.deleteById(id);
        logger.info("Rol con id '{}' eliminado exitosamente", id);
        return modelMapper.map(rol, RolSalidaDTO.class);
    }
}
