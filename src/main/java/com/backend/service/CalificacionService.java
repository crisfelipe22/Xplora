package com.backend.service;

import com.backend.dto.entada.CalificacionEntradaDTO;
import com.backend.dto.salida.CalificacionSalidaDTO;
import com.backend.dto.salida.MensajeResponseDTO;
import com.backend.entity.Calificacion;
import com.backend.entity.Categoria;
import com.backend.entity.PaqueteExperiencia;
import com.backend.entity.PaqueteExperienciaFavorito;
import com.backend.entity.Reserva;
import com.backend.entity.Usuario;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.CalificacionRepository;
import com.backend.repository.ReservaRepository;
import com.backend.repository.UsuarioRepository;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalificacionService {

    @Autowired
    private CalificacionRepository calificacionRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public CalificacionService(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }
    
    @Transactional
    public CalificacionSalidaDTO crearCalificacion(Long id_usuario, Long id_reserva, CalificacionEntradaDTO calificacionDTO) 
            throws ResourceNotFoundException, AccessDeniedException {
        
        logger.info("Agregando calificacion de la reserva '{}' al usuario '{}'", id_reserva, id_usuario);

        Usuario usuario = usuarioRepository.findById(id_usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Reserva reserva = reservaRepository.findById(id_reserva)
            .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada"));

        String emailActual = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuarioAutenticado = usuarioRepository.findByEmail(emailActual)
                .orElseThrow(() -> new AccessDeniedException("No se encontró el usuario autenticado"));
        
        if (!usuarioAutenticado.getEmail().equals(usuario.getEmail())) {
            throw new AccessDeniedException("No tienes permisos para modificar la calificación de este usuario.");
        }
        
        boolean existeCalificacion = calificacionRepository.findByReservaId(id_reserva)
            .isPresent();
        logger.info("existeCalificacion {}", existeCalificacion);
        if (existeCalificacion) {
            throw new IllegalArgumentException("La reserva ya está calificada.");
        }

        
        
        PaqueteExperiencia paqueteExperiencia = reserva.getPaqueteExperiencia();
        paqueteExperiencia.actualizarPuntuacion_promedio();

        Calificacion calificacion = modelMapper.map(calificacionDTO, Calificacion.class);
        calificacion.setUsuario(usuario);
        calificacion.setReserva(reserva);

        calificacion = calificacionRepository.save(calificacion);

        logger.info("Calificación agregada exitosamente con id '{}'", calificacion.getId_calificacion());
        
        CalificacionSalidaDTO calificacionSalidaDTO = modelMapper.map(calificacion, CalificacionSalidaDTO.class);
        calificacionSalidaDTO.setId_reserva(reserva.getId_reserva());
        calificacionSalidaDTO.setId_usuario(id_usuario);

        return calificacionSalidaDTO;
    }

    public CalificacionSalidaDTO obtenerCalificacionPorId(Long id_usuario, Long id_calificacion) 
            throws ResourceNotFoundException {

        Calificacion calificacion = calificacionRepository.findById(id_calificacion)
                .orElseThrow(() -> new ResourceNotFoundException("Calificación no encontrada"));

        return modelMapper.map(calificacion, CalificacionSalidaDTO.class);
    }

    public List<CalificacionSalidaDTO> obtenerTodasLasCalificaciones(Long id_usuario) {
        return calificacionRepository.findByUsuarioId(id_usuario).stream()
                .map(calificacion -> modelMapper.map(calificacion, CalificacionSalidaDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public CalificacionSalidaDTO actualizarCalificacion(Long id_usuario, Long id_calificacion, CalificacionEntradaDTO calificacionDTO) 
            throws ResourceNotFoundException, AccessDeniedException {

        logger.info("Actualizando calificación '{}' del usuario '{}'", id_calificacion, id_usuario);

        Calificacion calificacion = calificacionRepository.findById(id_calificacion)
                .orElseThrow(() -> new ResourceNotFoundException("Calificación no encontrada"));

        Usuario usuario = usuarioRepository.findById(id_usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String emailActual = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuarioAutenticado = usuarioRepository.findByEmail(emailActual)
                .orElseThrow(() -> new AccessDeniedException("No se encontró el usuario autenticado"));

        if (!usuarioAutenticado.getEmail().equals(usuario.getEmail())) {
            throw new AccessDeniedException("No tienes permisos para modificar la calificación de este usuario.");
        }

        modelMapper.map(calificacionDTO, calificacion);
        calificacion = calificacionRepository.save(calificacion);

        PaqueteExperiencia paqueteExperiencia = calificacion.getReserva().getPaqueteExperiencia();
        paqueteExperiencia.actualizarPuntuacion_promedio();

        logger.info("Calificación actualizada exitosamente con id '{}'", calificacion.getId_calificacion());

        CalificacionSalidaDTO calificacionSalidaDTO = modelMapper.map(calificacion, CalificacionSalidaDTO.class);
        calificacionSalidaDTO.setId_reserva(calificacion.getReserva().getId_reserva());
        calificacionSalidaDTO.setId_usuario(id_usuario);

        return calificacionSalidaDTO;
    }

    @Transactional
    public CalificacionSalidaDTO eliminarCalificacion(Long id_usuario, Long id_calificacion) 
            throws ResourceNotFoundException, AccessDeniedException {

        logger.info("Eliminando calificación '{}' del usuario '{}'", id_calificacion, id_usuario);

        Calificacion calificacion = calificacionRepository.findById(id_calificacion)
                .orElseThrow(() -> new ResourceNotFoundException("Calificación no encontrada"));

        Usuario usuario = usuarioRepository.findById(id_usuario)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String emailActual = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuarioAutenticado = usuarioRepository.findByEmail(emailActual)
                .orElseThrow(() -> new AccessDeniedException("No se encontró el usuario autenticado"));

        if (!usuarioAutenticado.getEmail().equals(usuario.getEmail())) {
            throw new AccessDeniedException("No tienes permisos para eliminar la calificación de este usuario.");
        }

        CalificacionSalidaDTO calificacionSalidaDTO = modelMapper.map(calificacion, CalificacionSalidaDTO.class);
        calificacionSalidaDTO.setId_reserva(calificacion.getReserva().getId_reserva());
        calificacionSalidaDTO.setId_usuario(id_usuario);

        PaqueteExperiencia paqueteExperiencia = calificacion.getReserva().getPaqueteExperiencia();

        calificacionRepository.deleteById(id_calificacion);

        paqueteExperiencia.actualizarPuntuacion_promedio();

        logger.info("Calificación eliminada exitosamente con id '{}'", id_calificacion);

        return calificacionSalidaDTO;
    }

}
