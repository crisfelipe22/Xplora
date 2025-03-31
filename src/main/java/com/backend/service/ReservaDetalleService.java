package com.backend.service;

import com.backend.dto.entada.ReservaDetalleEntradaDTO;
import com.backend.dto.salida.ReservaDetalleSalidaDTO;
import com.backend.repository.ReservaDetalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservaDetalleService {

    private final ReservaDetalleRepository reservaDetalleRepository;

    @Autowired
    public ReservaDetalleService(ReservaDetalleRepository reservaDetalleRepository) {
        this.reservaDetalleRepository = reservaDetalleRepository;
    }

    public ReservaDetalleSalidaDTO obtenerDetalleReserva(Long id) {
        return reservaDetalleRepository.findDetalleReservaById(id);
    }
}
