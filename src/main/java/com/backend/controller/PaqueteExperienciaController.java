package com.backend.controller;

import com.backend.dto.entada.Categoria.PaqueteExperienciaEntradaDto;
import com.backend.dto.salida.Categoria.PaqueteExperienciaSalidaDto;
import com.backend.entity.PaqueteExperiencia;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.service.PaqueteExperienciaService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paquete-experiencia")
public class PaqueteExperienciaController {

    @Autowired
    private PaqueteExperienciaService paqueteExperienciaService;

    @PostMapping
    public ResponseEntity<PaqueteExperienciaSalidaDto> agregarPaqueteExperiencia(@RequestBody @Valid PaqueteExperienciaEntradaDto paqueteExperienciaEntradaDto) throws BadRequestException {
        PaqueteExperienciaSalidaDto nuevoPaquete = paqueteExperienciaService.agregarPaqueteExperiencia(paqueteExperienciaEntradaDto);
        return new ResponseEntity<>(nuevoPaquete, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDto> obtenerPaqueteExperienciaPorId(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        PaqueteExperienciaSalidaDto paqueteExperienciaSalidaDto = paqueteExperienciaService.obtenerPaqueteExperienciaPorId(id);
        return new ResponseEntity<>(paqueteExperienciaSalidaDto, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDto> eliminarPaqueteExperiencia(@PathVariable(name = "id") Long id) throws ResourceNotFoundException, BadRequestException {
        PaqueteExperienciaSalidaDto paqueteEliminado =paqueteExperienciaService.eliminarPaqueteExperiencia(id);
        return new ResponseEntity<>(paqueteEliminado, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDto> actualizarPaqueteExperiencia(
            @PathVariable(name = "id") Long id,
            @RequestBody @Valid PaqueteExperienciaEntradaDto paqueteExperienciaEntradaDto) throws ResourceNotFoundException, BadRequestException {
        PaqueteExperienciaSalidaDto paqueteActualizado = paqueteExperienciaService.actualizarPaqueteExperiencia(id, paqueteExperienciaEntradaDto);
        return new ResponseEntity<>(paqueteActualizado, HttpStatus.ACCEPTED);
    }


    @GetMapping
    public ResponseEntity<List<PaqueteExperiencia>> obtenerTodosLosPaquetes() {
        try {
            List<PaqueteExperiencia> paquetes = paqueteExperienciaService.obtenerTodosLosPaquetes();
            return new ResponseEntity<>(paquetes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/aleatorios")
    public ResponseEntity<List<PaqueteExperiencia>> obtenerPaquetesAleatorios(
            @RequestParam(name = "cantidad", defaultValue = "10", required = false) int cantidad) {
        try {
            List<PaqueteExperiencia> paquetes = paqueteExperienciaService.obtenerPaquetesAleatorios(cantidad);
            return new ResponseEntity<>(paquetes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
