package com.backend.controller;

import com.backend.entity.PaqueteExperiencia;
import com.backend.service.PaqueteExperienciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paquete-experiencia")
public class PaqueteExperienciaController {

    @Autowired
    private PaqueteExperienciaService paqueteExperienciaService;

    /**
     * Endpoint para agregar un nuevo paquete de experiencia
     *
     * @param paqueteExperiencia Paquete de experiencia a agregar
     * @return ResponseEntity con el paquete agregado o un mensaje de error
     */
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
}
