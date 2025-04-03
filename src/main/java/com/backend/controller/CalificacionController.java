package com.backend.controller;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.entada.CalificacionEntradaDTO;
import com.backend.dto.salida.CalificacionSalidaDTO;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.service.CalificacionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/calificaciones")
@CrossOrigin
public class CalificacionController {
    
    @Autowired
    private CalificacionService calificacionService;

    @PostMapping("/reservas/{id_reserva}")
    public ResponseEntity<CalificacionSalidaDTO> crearCalificacion(
            @PathVariable(name = "id_reserva") Long id_reserva,
            @RequestBody @Valid CalificacionEntradaDTO calificacionDTO) throws ResourceNotFoundException, AccessDeniedException {
        return new ResponseEntity<>(
                calificacionService.crearCalificacion(id_reserva, calificacionDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id_usuario}/calificaciones/{id_calificacion}")
    public ResponseEntity<CalificacionSalidaDTO> obtenerCalificacionPorId(
            @PathVariable(name = "id_usuario") Long id_usuario, 
            @PathVariable(name = "id_calificacion") Long id_calificacion) throws ResourceNotFoundException {
        return ResponseEntity.ok(calificacionService.obtenerCalificacionPorId(id_usuario, id_calificacion));
    }

    @GetMapping("/usuarios/{id_usuario}")
    public ResponseEntity<List<CalificacionSalidaDTO>> obtenerTodasLasCalificaciones(
            @PathVariable(name = "id_usuario") Long id_usuario) {
        return ResponseEntity.ok(calificacionService.obtenerTodasLasCalificacionesPorUsuario(id_usuario));
    }

    @GetMapping("/usuarios/{id_paquete_experiencia}")
    public ResponseEntity<List<CalificacionSalidaDTO>> obtenerTodasLasCalificacionesPorPaqueteExperiencia(
            @PathVariable(name = "id_paquete_experiencia") Long id_paquete_experiencia) {
        return ResponseEntity.ok(calificacionService.obtenerTodasLasCalificacionesPorPaqueteExperiencia(id_paquete_experiencia));
    }

    @PutMapping("/{id_usuario}/calificaciones/{id_calificacion}")
    public ResponseEntity<CalificacionSalidaDTO> actualizarCalificacion(
            @PathVariable(name = "id_usuario") Long id_usuario,
            @PathVariable(name = "id_calificacion") Long id_calificacion,
            @RequestBody @Valid CalificacionEntradaDTO calificacionDTO) throws ResourceNotFoundException, AccessDeniedException {
        return ResponseEntity.ok(calificacionService.actualizarCalificacion(id_usuario, id_calificacion, calificacionDTO));
    }

    @DeleteMapping("/{id_usuario}/calificaciones/{id_calificacion}")
    public ResponseEntity<CalificacionSalidaDTO> eliminarCalificacion(
            @PathVariable(name = "id_usuario") Long id_usuario,
            @PathVariable(name = "id_calificacion") Long id_calificacion) throws ResourceNotFoundException, AccessDeniedException {
        return ResponseEntity.ok(calificacionService.eliminarCalificacion(id_usuario, id_calificacion));
    }
}
