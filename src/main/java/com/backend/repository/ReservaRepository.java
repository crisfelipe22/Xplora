package com.backend.repository;

import com.backend.entity.PaqueteExperiencia;
import com.backend.entity.Reserva;
import com.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

   // List<Reserva> findByUsuarioId(Long usuarioId);
   @Query(value = """
    WITH RECURSIVE fechas_disponibles AS (
        SELECT fecha_inicio AS fecha
        FROM paquete_experiencia
        WHERE id_paquete_experiencia = :idPaqueteExperiencia
        UNION ALL
        SELECT DATE_ADD(fecha, INTERVAL 1 DAY)
        FROM fechas_disponibles
        WHERE fecha < (
            SELECT fecha_fin
            FROM paquete_experiencia
            WHERE id_paquete_experiencia = :idPaqueteExperiencia
        )
    )
    SELECT DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha
    FROM fechas_disponibles
    WHERE fecha NOT IN (
        SELECT fecha_inicio
        FROM reserva
        WHERE id_paquete_experiencia = :idPaqueteExperiencia
    )
    """, nativeQuery = true)
    List<String> findAvailableDates(@Param("idPaqueteExperiencia") Long idPaqueteExperiencia);

    List<Reserva> findByPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia);
    List<Reserva> findByUsuario(Usuario usuario);
    List<Reserva> findByUsuarioAndPaqueteExperiencia(Usuario usuario, PaqueteExperiencia paqueteExperiencia);
}