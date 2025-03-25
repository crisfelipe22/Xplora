package com.backend.controller;

import com.backend.dto.entada.ReservaEntradaDTO;
import com.backend.dto.salida.ReservaSalidaDTO;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.ReservaRepository;
import com.backend.service.ReservaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin
public class ReservaController {

    @Autowired
    private ReservaService reservaService;
    private final ReservaRepository reservaRepository;

    public ReservaController(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }


    @PostMapping
    public ResponseEntity<ReservaSalidaDTO> agregarReserva(@RequestBody ReservaEntradaDTO reservaEntradaDto) throws ResourceNotFoundException {
        ReservaSalidaDTO nuevaReserva = reservaService.agregarReserva(reservaEntradaDto);
        return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaSalidaDTO> obtenerReservaPorId(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        ReservaSalidaDTO reserva = reservaService.obtenerReservaPorId(id);
        return new ResponseEntity<>(reserva, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ReservaSalidaDTO>> obtenerTodasLasReservas() {
        List<ReservaSalidaDTO> reservas = reservaService.obtenerTodasLasReservas();
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }


    @GetMapping("/paquete/{idPaquete}")
    public ResponseEntity<List<ReservaSalidaDTO>> obtenerReservasPorPaquete(
            @PathVariable(name = "idPaquete") Long idPaquete) throws ResourceNotFoundException {
        List<ReservaSalidaDTO> reservas = reservaService.obtenerReservasPorPaquete(idPaquete);
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<ReservaSalidaDTO>> obtenerReservasPorUsuario(
            @PathVariable(name = "idUsuario") Long idUsuario) throws ResourceNotFoundException {
        List<ReservaSalidaDTO> reservas = reservaService.obtenerReservasPorUsuario(idUsuario);
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    @GetMapping("/usuario/{idUsuario}/paquete/{idPaquete}")
    public ResponseEntity<List<ReservaSalidaDTO>> obtenerReservasPorUsuarioYPaquete(
            @PathVariable(name = "idUsuario") Long idUsuario,
            @PathVariable(name = "idPaquete") Long idPaquete) throws ResourceNotFoundException {
        List<ReservaSalidaDTO> reservas = reservaService.obtenerReservasPorUsuarioYPaquete(idUsuario, idPaquete);
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }


    @GetMapping("/fechas-disponibles/{idPaqueteExperiencia}")
    public ResponseEntity<List<String>> obtenerFechasDisponibles(@PathVariable (name = "idPaqueteExperiencia") Long idPaqueteExperiencia) {
        List<String> fechasDisponibles = reservaRepository.findAvailableDates(idPaqueteExperiencia);
        return ResponseEntity.ok(fechasDisponibles);
    }
}

