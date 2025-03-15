package com.backend.controller;

import com.backend.dto.entada.CaracteristicaEntradaDTO;
import com.backend.dto.salida.CaracteristicaSalidaDTO;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.service.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/caracteristica")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaService CaracteristicaService;

    @PostMapping
    public ResponseEntity<CaracteristicaSalidaDTO> agregarCaracteristica(@RequestBody CaracteristicaEntradaDTO CaracteristicaEntradaDto) {
        CaracteristicaSalidaDTO nuevoCaracteristica = CaracteristicaService.agregarcaracteristica(CaracteristicaEntradaDto);
        return new ResponseEntity<>(nuevoCaracteristica, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CaracteristicaSalidaDTO>> obtenerTodosLosDetallesProductos() {
        List<CaracteristicaSalidaDTO> detallesProducto = CaracteristicaService.obtenerTodosLoscaracteristicasProductos();
        return new ResponseEntity<>(detallesProducto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaracteristicaSalidaDTO> obtenerCaracteristicaPorId(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        CaracteristicaSalidaDTO Caracteristica = CaracteristicaService.obtenercaracteristicaPorId(id);
        return new ResponseEntity<>(Caracteristica, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CaracteristicaSalidaDTO> actualizarCaracteristica(@PathVariable(name = "id") Long id, @RequestBody CaracteristicaEntradaDTO CaracteristicaEntradaDto) throws ResourceNotFoundException {
        CaracteristicaSalidaDTO CaracteristicaActualizado = CaracteristicaService.actualizarcaracteristica(id, CaracteristicaEntradaDto);
        return new ResponseEntity<>(CaracteristicaActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CaracteristicaSalidaDTO> eliminarCaracteristica(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        CaracteristicaSalidaDTO CaracteristicaEliminado = CaracteristicaService.eliminarcaracteristica(id);
        return new ResponseEntity<>(CaracteristicaEliminado, HttpStatus.OK);
    }
}
