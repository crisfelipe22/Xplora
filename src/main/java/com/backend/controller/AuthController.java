package com.backend.controller;

import com.backend.dto.salida.AuthResponseDTO;
import com.backend.dto.entada.LoginRequestDTO;
import com.backend.dto.salida.MensajeResponseDTO;
import com.backend.dto.entada.RegistroRequestDTO;
import com.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/registro")
    public ResponseEntity<MensajeResponseDTO> registrarUsuario(@Valid @RequestBody RegistroRequestDTO registroDTO) {
        MensajeResponseDTO mensaje = authService.registrarUsuario(registroDTO);
        return ResponseEntity.ok(mensaje);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> autenticarUsuario(@Valid @RequestBody LoginRequestDTO loginDTO) {
        AuthResponseDTO authResponse = authService.autenticarUsuario(loginDTO);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<MensajeResponseDTO> cerrarSesion() {
        return ResponseEntity.ok(new MensajeResponseDTO("Sesión cerrada correctamente", true));
    }
}