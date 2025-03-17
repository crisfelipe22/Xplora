package com.backend.service;

import com.backend.dto.entada.CaracteristicaPaqueteExperienciaEntradaDTO;
import com.backend.dto.entada.PaqueteExperienciaEntradaDTO;
import com.backend.dto.salida.CaracteristicaPaqueteExperienciaSalidaDTO;
import com.backend.dto.salida.PaqueteExperienciaSalidaDTO;
import com.backend.entity.PaqueteExperiencia;
import com.backend.entity.Categoria;
import com.backend.entity.Caracteristica;
import com.backend.entity.CaracteristicaPaqueteExperiencia;
import com.backend.exceptions.ConflictException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.PaqueteExperienciaRepository;
import com.backend.repository.CategoriaRepository;
import com.backend.repository.CaracteristicaRepository;
import com.backend.repository.CaracteristicaPaqueteExperienciaRepository;

import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

@Service
public class PaqueteExperienciaService {

    @Autowired
    private PaqueteExperienciaRepository paqueteExperienciaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CaracteristicaPaqueteExperienciaRepository paqueteDetalleProductoRepository;

    @Autowired
    private CaracteristicaRepository detalleProductoRepository;

    private final ModelMapper modelMapper;

    public PaqueteExperienciaService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    private static final Logger logger = LoggerFactory.getLogger(PaqueteExperienciaService.class);

    @Transactional(rollbackFor = Exception.class)
    public PaqueteExperienciaSalidaDTO agregarPaqueteExperiencia(@Valid PaqueteExperienciaEntradaDTO paqueteExperienciaEntradaDTO) throws BadRequestException {
            logger.info("Iniciando proceso para agregar un nuevo Paquete de Experiencia: {}", paqueteExperienciaEntradaDTO.getNombre());
        
            // Verificar si el nombre ya existe en la base de datos
            if (paqueteExperienciaRepository.findByNombre(paqueteExperienciaEntradaDTO.getNombre()).isPresent()) {
                logger.warn("El nombre '{}' ya está en uso", paqueteExperienciaEntradaDTO.getNombre());
                throw new ConflictException("El nombre del paquete de experiencia ya está en uso");
            }
        
            // Obtener la categoría y lanzar una excepción si no existe
            Categoria categoria = categoriaRepository.findById(paqueteExperienciaEntradaDTO.getId_categoria())
                    .orElseThrow(() -> {
                        logger.error("Categoría con ID {} no encontrada", paqueteExperienciaEntradaDTO.getId_categoria());
                        return new RuntimeException("La categoría no existe");
                    });
        
            // Mapear DTO a entidad y asegurarse de que no tenga ID para evitar problemas de persistencia
            PaqueteExperiencia paqueteExperiencia = modelMapper.map(paqueteExperienciaEntradaDTO, PaqueteExperiencia.class);
            paqueteExperiencia.setId_paquete_experiencia(null);
            paqueteExperiencia.setCategoria(categoria);
        
            // Guardar el paquete en la base de datos
            PaqueteExperiencia nuevoPaquete = paqueteExperienciaRepository.save(paqueteExperiencia);
            logger.info("Paquete de experiencia '{}' agregado exitosamente con ID {}", nuevoPaquete.getNombre(), nuevoPaquete.getId_paquete_experiencia());
        
            PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = modelMapper.map(nuevoPaquete, PaqueteExperienciaSalidaDTO.class);
            paqueteExperienciaSalidaDto.setId_categoria(nuevoPaquete.getCategoria().getId_categoria());
        
            List<CaracteristicaPaqueteExperiencia> paquetesDetallesProductos = new ArrayList<>();
            logger.info("Los detalles de productos son: {}", paqueteExperienciaEntradaDTO.getCaracteristicas_paquete_experiencia());
        
            if (paqueteExperienciaEntradaDTO.getCaracteristicas_paquete_experiencia() != null && !paqueteExperienciaEntradaDTO.getCaracteristicas_paquete_experiencia().isEmpty()) {
                logger.info("Estoy agregando los detalles del paquete de la experiencia");
        
                for (CaracteristicaPaqueteExperienciaEntradaDTO caracteristicaDTO : paqueteExperienciaEntradaDTO.getCaracteristicas_paquete_experiencia()) {
                    
                    Caracteristica detalleProducto = detalleProductoRepository.findById(caracteristicaDTO.getId_caracteristica())
                            .orElseThrow(() -> new RuntimeException("Caracteristica con ID " + caracteristicaDTO.getId_caracteristica() + " no encontrado"));
                    
                    boolean existe = paqueteDetalleProductoRepository
                        .findByPaqueteExperienciaAndDetalleProductoById(
                            caracteristicaDTO.getId_paquete_experiencia(), 
                            caracteristicaDTO.getId_caracteristica()
                        ).isPresent();
        
                    if (existe) {
                        throw new RuntimeException("El detalle de producto con ID " + caracteristicaDTO.getId_caracteristica() 
                            + " ya se encuentra en el paquete de experiencia con ID " + caracteristicaDTO.getId_paquete_experiencia());
                    }
        
                    // Crear objeto PaqueteDetalleProducto
                    CaracteristicaPaqueteExperiencia paqueteDetalleProducto = new CaracteristicaPaqueteExperiencia();
                    paqueteDetalleProducto.setPaquete_experiencia(nuevoPaquete);
                    paqueteDetalleProducto.setCaracteristica(detalleProducto);
                    paquetesDetallesProductos.add(paqueteDetalleProducto);
                }
                logger.info("Se van a agregar los siguientes detalles del paquete de experiencia {}", paquetesDetallesProductos);
            }
        
            if (!paquetesDetallesProductos.isEmpty()) {
                paquetesDetallesProductos.forEach(detalle -> detalle.setPaquete_experiencia(nuevoPaquete));
                paqueteDetalleProductoRepository.saveAll(paquetesDetallesProductos);
                logger.info("Detalle del producto con el paquete de experiencia '{}' agregados exitosamente", nuevoPaquete.getNombre());
            }
        
            List<CaracteristicaPaqueteExperienciaSalidaDTO> detallesSalida = paquetesDetallesProductos.stream()
                .map(detalle -> new CaracteristicaPaqueteExperienciaSalidaDTO(detalle))
                .collect(Collectors.toList());
        
            paqueteExperienciaSalidaDto.setCaracteristicas_paquete_experiencia(detallesSalida);
            return paqueteExperienciaSalidaDto;
    }

    public List<PaqueteExperienciaSalidaDTO> obtenerTodosLosPaquetes() {
        try {
            logger.info("Obteniendo todos los paquetes de experiencia");
            List<PaqueteExperiencia> paquetes = paqueteExperienciaRepository.findAll();
            return paquetes.stream()
                    .map(paquete -> {
                        PaqueteExperienciaSalidaDTO dto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
                        dto.setId_categoria(paquete.getCategoria().getId_categoria());
                        List<CaracteristicaPaqueteExperienciaSalidaDTO> detallesSalida = obtenerDetallesSalida(paquete.getId_paquete_experiencia());

                        dto.setCaracteristicas_paquete_experiencia(detallesSalida);
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error obteniendo todos los paquetes", e);
            throw new RuntimeException("Error obteniendo paquetes de experiencia");
        }
    }

    public List<PaqueteExperienciaSalidaDTO> obtenerPaquetesAleatorios(int cantidad) {
        try {
            logger.info("Obteniendo {} paquetes de experiencia aleatorios", cantidad);
            List<PaqueteExperiencia> paquetes = paqueteExperienciaRepository.findAll();
            Collections.shuffle(paquetes);
            return paquetes.stream()
                    .limit(cantidad)
                    .map(paquete -> {
                        PaqueteExperienciaSalidaDTO dto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
                        dto.setId_categoria(paquete.getCategoria().getId_categoria());

                        List<CaracteristicaPaqueteExperienciaSalidaDTO> detallesSalida = obtenerDetallesSalida(paquete.getId_paquete_experiencia());

                        dto.setCaracteristicas_paquete_experiencia(detallesSalida);
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error obteniendo paquetes aleatorios", e);
            throw new RuntimeException("Error obteniendo paquetes aleatorios");
        }
    }


    public PaqueteExperienciaSalidaDTO obtenerPaqueteExperienciaPorId(Long id) throws ResourceNotFoundException {
        logger.info("Obteniendo datos del paquete con id '{}'", id);
        PaqueteExperiencia paquete = paqueteExperienciaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Paquete con id '{}' no encontrado", id);
                    return new ResourceNotFoundException("Paquete de experiencia no encontrado");
                });
        PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
        paqueteExperienciaSalidaDto.setId_categoria(paquete.getCategoria().getId_categoria());

        List<CaracteristicaPaqueteExperienciaSalidaDTO> detallesSalida = obtenerDetallesSalida(paquete.getId_paquete_experiencia());

        paqueteExperienciaSalidaDto.setCaracteristicas_paquete_experiencia(detallesSalida);
        return paqueteExperienciaSalidaDto;
    }

    public List<PaqueteExperienciaSalidaDTO> obtenerPaqueteExperienciaPorFiltro(String nombre, Date fecha_inicio, Date fecha_fin) {
        try {
            logger.info("Obteniendo datos del paquete por filtro: nombre={}, fecha_inicio={}, fecha_fin={}", nombre, fecha_inicio, fecha_fin);

            List<PaqueteExperiencia> paquetes = paqueteExperienciaRepository.findByFilter(nombre, fecha_inicio, fecha_fin);
            return paquetes.stream()
                .map(paquete -> {
                    PaqueteExperienciaSalidaDTO dto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
                    dto.setId_categoria(paquete.getCategoria().getId_categoria());

                    List<CaracteristicaPaqueteExperienciaSalidaDTO> detallesSalida = obtenerDetallesSalida(paquete.getId_paquete_experiencia());

                    dto.setCaracteristicas_paquete_experiencia(detallesSalida);

                    return dto;
                })
                .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error obteniendo paquetes por filtro", e);
            throw new RuntimeException("Error obteniendo paquetes por filtro");
        }
    }

    @Transactional
    public PaqueteExperienciaSalidaDTO eliminarPaqueteExperiencia(Long id) throws ResourceNotFoundException, BadRequestException {
        logger.info("Eliminando el paquete de experiencia con el id '{}'", id);
        PaqueteExperiencia paquete = paqueteExperienciaRepository.findById(id).orElse(null);
        if (paquete == null) {
            logger.error("Paquete con id '{}' no encontrado", id);
            throw new ResourceNotFoundException("Paquete de experiencia con ID " + id + " no encontrado");
        }
        try {
            List<CaracteristicaPaqueteExperienciaSalidaDTO> detallesSalida = obtenerDetallesSalida(id);
            paqueteExperienciaRepository.deleteById(id);
            logger.info("Paquete con ID '{}' eliminado exitosamente", id);
            PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
            paqueteExperienciaSalidaDto.setId_categoria(paquete.getCategoria().getId_categoria());

            paqueteExperienciaSalidaDto.setCaracteristicas_paquete_experiencia(detallesSalida);
            return paqueteExperienciaSalidaDto;
        } catch (Exception e) {
            logger.error("Error inesperado al eliminar el paquete con ID '{}': {}", id, e.getMessage(), e);
            throw new BadRequestException("Error al eliminar el paquete de experiencia, por favor intente nuevamente.");
        }
    }

    @Transactional(rollbackFor = Exception.class) 
    public PaqueteExperienciaSalidaDTO actualizarPaqueteExperiencia(Long id, PaqueteExperienciaEntradaDTO paqueteExperienciaEntradaDto) throws ResourceNotFoundException, BadRequestException {
        logger.info("Actualizando el paquete con el ID '{}'", id);

        PaqueteExperiencia paquete = paqueteExperienciaRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Paquete de experiencia con ID '{}' no encontrado", id);
                    return new ResourceNotFoundException("Paquete de experiencia con ID " + id + " no encontrado");
                });

        Categoria categoria = categoriaRepository.findById(paqueteExperienciaEntradaDto.getId_categoria())
                .orElseThrow(() -> {
                    logger.error("La categoría con ID '{}' no existe", paqueteExperienciaEntradaDto.getId_categoria());
                    return new ResourceNotFoundException("La categoría con ID " + paqueteExperienciaEntradaDto.getId_categoria() + " no existe");
                });

        modelMapper.map(paqueteExperienciaEntradaDto, paquete);
        paquete.setCategoria(categoria);

        paquete = paqueteExperienciaRepository.save(paquete);
        logger.info("Paquete con ID '{}' actualizado exitosamente", id);

        if (paqueteExperienciaEntradaDto.getCaracteristicas_paquete_experiencia() != null) {
            logger.info("Actualizando los detalles del paquete de experiencia");

            List<CaracteristicaPaqueteExperiencia> detallesActuales = paqueteDetalleProductoRepository.findByPaqueteExperienciaById(paquete.getId_paquete_experiencia());

            Set<Long> nuevosIds = paqueteExperienciaEntradaDto.getCaracteristicas_paquete_experiencia().stream()
                .map(CaracteristicaPaqueteExperienciaEntradaDTO::getId_caracteristica)
                .collect(Collectors.toSet());

            List<CaracteristicaPaqueteExperiencia> detallesAEliminar = detallesActuales.stream()
                .filter(detalle -> !nuevosIds.contains(detalle.getCaracteristica().getId()))
                .collect(Collectors.toList());

            if (!detallesAEliminar.isEmpty()) {
                paqueteDetalleProductoRepository.deleteAll(detallesAEliminar);
                logger.info("Detalles eliminados: {}", detallesAEliminar.stream()
                    .map((CaracteristicaPaqueteExperiencia d) -> d.getCaracteristica().getId())
                    .collect(Collectors.toList()));
            }

            Set<Long> idsActuales = detallesActuales.stream()
                .map(detalle -> detalle.getCaracteristica().getId())
                .collect(Collectors.toSet());

            List<CaracteristicaPaqueteExperiencia> caracteristicasNuevas = new ArrayList<>();
            for (CaracteristicaPaqueteExperienciaEntradaDTO caracteristicaDTO : paqueteExperienciaEntradaDto.getCaracteristicas_paquete_experiencia()) {
                if (!idsActuales.contains(caracteristicaDTO.getId_caracteristica())) {
                    Caracteristica detalleProducto = detalleProductoRepository.findById(caracteristicaDTO.getId_caracteristica())
                            .orElseThrow(() -> new RuntimeException("Caracteristica con ID " + caracteristicaDTO.getId_caracteristica() + " no encontrado"));

                    CaracteristicaPaqueteExperiencia nuevoDetalle = new CaracteristicaPaqueteExperiencia();
                    nuevoDetalle.setPaquete_experiencia(paquete);
                    nuevoDetalle.setCaracteristica(detalleProducto);
                    caracteristicasNuevas.add(nuevoDetalle);
                }
            }

            if (!caracteristicasNuevas.isEmpty()) {
                paqueteDetalleProductoRepository.saveAll(caracteristicasNuevas);
                logger.info("Detalles agregados: {}", caracteristicasNuevas.stream()
                        .map(d -> d.getCaracteristica().getId()).collect(Collectors.toList()));
            }
        }

        PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class);
        paqueteExperienciaSalidaDto.setId_categoria(paquete.getCategoria().getId_categoria());

        List<CaracteristicaPaqueteExperienciaSalidaDTO> detallesSalida = paqueteDetalleProductoRepository.findByPaqueteExperienciaById(paquete.getId_paquete_experiencia()).stream()
            .map(CaracteristicaPaqueteExperienciaSalidaDTO::new)
            .collect(Collectors.toList());

        paqueteExperienciaSalidaDto.setCaracteristicas_paquete_experiencia(detallesSalida);

        return paqueteExperienciaSalidaDto;
    }

    private List<CaracteristicaPaqueteExperienciaSalidaDTO> obtenerDetallesSalida(Long idPaqueteExperiencia) {
        List<CaracteristicaPaqueteExperiencia> caracteristicasPaqueteExperiencia =
            paqueteDetalleProductoRepository.findByPaqueteExperienciaById(idPaqueteExperiencia);
    
        return caracteristicasPaqueteExperiencia.stream()
            .map(CaracteristicaPaqueteExperienciaSalidaDTO::new)
            .collect(Collectors.toList());
    }
   public List<PaqueteExperienciaSalidaDTO> obtenerPaquetesPorCategoria(String nombreCategoria) {
    try {
        Categoria categoria = categoriaRepository.findByNombre(nombreCategoria)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        List<PaqueteExperiencia> paquetes = paqueteExperienciaRepository.findByCategoria(categoria);
        return paquetes.stream()
                .map(paquete -> modelMapper.map(paquete, PaqueteExperienciaSalidaDTO.class))
                .collect(Collectors.toList());
    } catch (Exception e) {
        logger.error("Error al filtrar paquetes por categoría", e);
        throw new RuntimeException("Error al obtener paquetes de la categoría");
    }
}
}

