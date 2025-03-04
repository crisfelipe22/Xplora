package com.backend.controller;

import com.backend.dto.entada.RolEntradaDTO;
import com.backend.dto.salida.RolSalidaDTO;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.service.RolService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rol")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    public ResponseEntity<RolSalidaDTO> agregarRol(@Valid @RequestBody RolEntradaDTO rolDto) {
        return ResponseEntity.ok(rolService.agregarRol(rolDto));
    }

    @GetMapping
    public ResponseEntity<List<RolSalidaDTO>> obtenerTodosLosRoles() {
        return ResponseEntity.ok(rolService.obtenerTodosLosRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RolSalidaDTO> obtenerRolPorId(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(rolService.obtenerRolPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RolSalidaDTO> actualizarRol(@PathVariable(name = "id") Long id, @Valid @RequestBody RolEntradaDTO rolDto)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(rolService.actualizarRol(id, rolDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RolSalidaDTO> eliminarRol(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(rolService.eliminarRol(id));
    }
}
