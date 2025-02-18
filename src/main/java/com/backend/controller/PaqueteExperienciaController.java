package com.backend.controller;

import com.backend.dto.entada.Categoria.PaqueteExperienciaEntradaDto;
import com.backend.dto.salida.Categoria.PaqueteExperienciaSalidaDto;
import com.backend.entity.PaqueteExperiencia;
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
