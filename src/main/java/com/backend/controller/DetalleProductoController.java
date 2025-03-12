package com.backend.controller;

import com.backend.dto.entada.DetalleProductoEntradaDTO;
import com.backend.dto.salida.DetalleProductoSalidaDTO;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.service.DetalleProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalles-producto")
public class DetalleProductoController {

    @Autowired
    private DetalleProductoService detalleProductoService;

    @PostMapping
    public ResponseEntity<DetalleProductoSalidaDTO> agregarDetalleProducto(@RequestBody DetalleProductoEntradaDTO detalleProductoEntradaDto) {
        DetalleProductoSalidaDTO nuevoDetalleProducto = detalleProductoService.agregarDetalleProducto(detalleProductoEntradaDto);
        return new ResponseEntity<>(nuevoDetalleProducto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DetalleProductoSalidaDTO>> obtenerTodosLosDetallesProductos() {
        List<DetalleProductoSalidaDTO> detallesProducto = detalleProductoService.obtenerTodosLosDetallesProductos();
        return new ResponseEntity<>(detallesProducto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleProductoSalidaDTO> obtenerDetalleProductoPorId(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        DetalleProductoSalidaDTO detalleProducto = detalleProductoService.obtenerDetalleProductoPorId(id);
        return new ResponseEntity<>(detalleProducto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalleProductoSalidaDTO> actualizarDetalleProducto(@PathVariable(name = "id") Long id, @RequestBody DetalleProductoEntradaDTO detalleProductoEntradaDto) throws ResourceNotFoundException {
        DetalleProductoSalidaDTO detalleProductoActualizado = detalleProductoService.actualizarDetalleProducto(id, detalleProductoEntradaDto);
        return new ResponseEntity<>(detalleProductoActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DetalleProductoSalidaDTO> eliminarDetalleProducto(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        DetalleProductoSalidaDTO detalleProductoEliminado = detalleProductoService.eliminarDetalleProducto(id);
        return new ResponseEntity<>(detalleProductoEliminado, HttpStatus.OK);
    }
}
