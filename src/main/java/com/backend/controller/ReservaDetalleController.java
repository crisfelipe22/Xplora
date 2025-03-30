package com.backend.controller;

import com.backend.dto.entada.ReservaDetalleEntradaDTO;
import com.backend.dto.salida.ReservaDetalleSalidaDTO;
import com.backend.repository.ReservaDetalleRepository;
import com.backend.service.ReservaDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/reservas/detalle")
public class ReservaDetalleController {

    private final ReservaDetalleRepository reservaDetalleRepository;

    public ReservaDetalleController(ReservaDetalleRepository reservaDetalleRepository) {
        this.reservaDetalleRepository = reservaDetalleRepository;
    }

    @GetMapping("/{idReserva}")
    public ResponseEntity<ReservaDetalleSalidaDTO> getDetalleReserva(@PathVariable(name = "idReserva") Long idReserva) {
        ReservaDetalleSalidaDTO detalleReserva = reservaDetalleRepository.findDetalleReservaById(idReserva);
        if (detalleReserva != null) {
            return ResponseEntity.ok(detalleReserva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


