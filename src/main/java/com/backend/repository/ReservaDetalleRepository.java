package com.backend.repository;

import com.backend.dto.salida.ReservaDetalleSalidaDTO;
import com.backend.entity.PaqueteExperienciaFavorito;
import com.backend.entity.ReservaDetalle;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReservaDetalleRepository extends JpaRepository<ReservaDetalle, Long> {

    @Transactional
    @Query(value = "SELECT r.id_reserva AS idReserva, u.nombre AS nombreUsuario, " +
            "p.nombre AS nombrePaquete, p.descripcion AS descripcionPaquete, " +
            "p.duracion AS duracionPaquete, p.precio AS precioPaquete, " +
            "p.ubicacion AS ubicacionPaquete " +
            "FROM reserva r " +
            "JOIN usuario u ON r.id_usuario = u.id_usuario " +
            "JOIN paquete_experiencia p ON r.id_paquete_experiencia = p.id_paquete_experiencia " +
            "WHERE r.id_reserva = :idReserva", nativeQuery = true)
    ReservaDetalleSalidaDTO findDetalleReservaById(@Param("idReserva") Long idReserva);
}
