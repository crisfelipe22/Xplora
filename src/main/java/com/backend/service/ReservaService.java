package com.backend.service;

import com.backend.dto.entada.ReservaEntradaDTO;
import com.backend.dto.salida.ReservaSalidaDTO;
import com.backend.entity.Reserva;
import com.backend.entity.Usuario;
import com.backend.entity.PaqueteExperiencia;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.ReservaRepository;
import com.backend.repository.UsuarioRepository;
import com.backend.repository.PaqueteExperienciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PaqueteExperienciaRepository paqueteExperienciaRepository;



    public ReservaSalidaDTO agregarReserva(ReservaEntradaDTO reservaEntradaDto) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(reservaEntradaDto.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + reservaEntradaDto.getIdUsuario()));

        PaqueteExperiencia paqueteExperiencia = paqueteExperienciaRepository.findById(reservaEntradaDto.getIdPaqueteExperiencia())
                .orElseThrow(() -> new ResourceNotFoundException("Paquete de experiencia no encontrado con ID: " + reservaEntradaDto.getIdPaqueteExperiencia()));


        Reserva reserva = new Reserva(usuario, paqueteExperiencia, reservaEntradaDto.getFecha_inicio(), reservaEntradaDto.getFecha_fin());
        Reserva nuevaReserva = reservaRepository.save(reserva);

        return convertirAReservaSalidaDTO(nuevaReserva);
    }

    public ReservaSalidaDTO obtenerReservaPorId(Long id) throws ResourceNotFoundException {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con ID: " + id));

        return convertirAReservaSalidaDTO(reserva);
    }

    public List<ReservaSalidaDTO> obtenerTodasLasReservas() {
        return reservaRepository.findAll()
                .stream()
                .map(this::convertirAReservaSalidaDTO)
                .collect(Collectors.toList());
    }

    public List<ReservaSalidaDTO> obtenerReservasPorPaquete(Long idPaquete) throws ResourceNotFoundException {
        PaqueteExperiencia paqueteExperiencia = paqueteExperienciaRepository.findById(idPaquete)
                .orElseThrow(() -> new ResourceNotFoundException("Paquete de experiencia no encontrado con ID: " + idPaquete));

        List<Reserva> reservas = reservaRepository.findByPaqueteExperiencia(paqueteExperiencia);

        return reservas.stream()
                .map(this::convertirAReservaSalidaDTO)
                .collect(Collectors.toList());
    }

    public List<ReservaSalidaDTO> obtenerReservasPorUsuario(Long idUsuario) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + idUsuario));

        List<Reserva> reservas = reservaRepository.findByUsuario(usuario);

        return reservas.stream()
                .map(this::convertirAReservaSalidaDTO)
                .collect(Collectors.toList());
    }
    public List<ReservaSalidaDTO> obtenerReservasPorUsuarioYPaquete(Long idUsuario, Long idPaquete) throws ResourceNotFoundException {
        // Buscar usuario y paquete de experiencia
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + idUsuario));

        PaqueteExperiencia paqueteExperiencia = paqueteExperienciaRepository.findById(idPaquete)
                .orElseThrow(() -> new ResourceNotFoundException("Paquete de experiencia no encontrado con ID: " + idPaquete));

        // Obtener las reservas que coinciden con el usuario y el paquete de experiencia
        List<Reserva> reservas = reservaRepository.findByUsuarioAndPaqueteExperiencia(usuario, paqueteExperiencia);

        // Convertir las reservas encontradas a DTO
        return reservas.stream()
                .map(this::convertirAReservaSalidaDTO)
                .collect(Collectors.toList());
    }

    private ReservaSalidaDTO convertirAReservaSalidaDTO(Reserva reserva) {
        ReservaSalidaDTO dto = new ReservaSalidaDTO();
        dto.setIdReserva(reserva.getId_reserva());
        dto.setIdUsuario(reserva.getUsuario().getId_usuario());
        dto.setIdPaqueteExperiencia(reserva.getPaqueteExperiencia().getId_paquete_experiencia());
        dto.setFecha_inicio(reserva.getFecha_inicio());
        dto.setFecha_fin(reserva.getFecha_fin());
        return dto;
    }
}
