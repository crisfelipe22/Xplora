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
          SELECT DATE(fecha_inicio) AS fecha
          FROM paquete_experiencia
          WHERE id_paquete_experiencia = :idPaqueteExperiencia
          UNION ALL
          SELECT DATE_ADD(fecha, INTERVAL 1 DAY)
          FROM fechas_disponibles
          WHERE fecha < (
              SELECT DATE(fecha_fin)
              FROM paquete_experiencia
              WHERE id_paquete_experiencia = :idPaqueteExperiencia
          )
      ),
      reservas_expandidas AS (
          SELECT
              DATE(fecha_inicio) AS fecha_inicio_reserva,
              DATE(fecha_fin) AS fecha_fin_reserva
          FROM reserva
          WHERE id_paquete_experiencia = :idPaqueteExperiencia
      ),
      fechas_reservadas AS (
          SELECT fecha_inicio_reserva AS fecha
          FROM reservas_expandidas
          UNION
          SELECT fecha_fin_reserva AS fecha
          FROM reservas_expandidas
          UNION ALL
          SELECT
              DATE_ADD(r.fecha_inicio_reserva, INTERVAL t.n DAY) AS fecha
          FROM
              reservas_expandidas r
          JOIN (
              SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3
              UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
              UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11
              UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
          ) t ON t.n <= DATEDIFF(r.fecha_fin_reserva, r.fecha_inicio_reserva)
      )
      SELECT DISTINCT DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha
      FROM fechas_disponibles
      WHERE fecha NOT IN (
          SELECT fecha
          FROM fechas_reservadas
      )
      ORDER BY fecha
      """, nativeQuery = true)
  List<String> findAvailableDates(@Param("idPaqueteExperiencia") Long idPaqueteExperiencia);

  List<Reserva> findByPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia);

  List<Reserva> findByUsuario(Usuario usuario);

  List<Reserva> findByUsuarioAndPaqueteExperiencia(Usuario usuario, PaqueteExperiencia paqueteExperiencia);
}