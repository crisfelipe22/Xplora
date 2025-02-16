package com.backend.controller;

import com.backend.entity.PaqueteExperiencia;
import com.backend.service.PaqueteExperienciaService;
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
    public ResponseEntity<?> agregarPaqueteExperiencia(@RequestBody PaqueteExperiencia paqueteExperiencia) {
        try {
            // Llamar al servicio para agregar el paquete de experiencia
            PaqueteExperiencia nuevoPaquete = paqueteExperienciaService.agregarPaqueteExperiencia(paqueteExperiencia);
            return new ResponseEntity<>(nuevoPaquete, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // En caso de error (por ejemplo, si el nombre ya está en uso)
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Para otros errores generales
            return new ResponseEntity<>("Ocurrió un error al agregar el paquete de experiencia", HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
