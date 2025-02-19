package com.backend.dto;
import com.backend.dto.entada.PedidoEntradaDTO;
import com.backend.dto.salida.PedidoSalidaDTO;
import com.backend.entity.Pedido;
import com.backend.entity.PaqueteExperiencia;

public class PedidoMapper {

    // Convierte una entidad Pedido a DTO de salida
    public static PedidoSalidaDTO toSalidaDTO(Pedido pedido) {
        PedidoSalidaDTO salidaDTO = new PedidoSalidaDTO();
        salidaDTO.setIdPedido(pedido.getIdPedido());
        if (pedido.getPaqueteExperiencia() != null) {
            salidaDTO.setPaqueteExperienciaId(pedido.getPaqueteExperiencia().getId_paquete_experiencia());
        }
        salidaDTO.setEsRegalo(pedido.isEsRegalo());
        salidaDTO.setTotal(pedido.getTotal());
        return salidaDTO;
    }

    // Convierte un DTO de entrada a entidad Pedido, usando el objeto PaqueteExperiencia obtenido
    public static Pedido toEntity(PedidoEntradaDTO entradaDTO, PaqueteExperiencia paqueteExperiencia) {
        Pedido pedido = new Pedido();
        pedido.setPaqueteExperiencia(paqueteExperiencia);
        pedido.setEsRegalo(entradaDTO.isEsRegalo());
        pedido.setTotal(entradaDTO.getTotal());
        return pedido;
    }
}
