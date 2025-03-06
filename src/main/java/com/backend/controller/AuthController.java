package com.backend.controller;

import com.backend.dto.salida.AuthResponseDTO;
import com.backend.dto.entada.LoginRequestDTO;
import com.backend.dto.salida.MensajeResponseDTO;
import com.backend.dto.entada.RegistroRequestDTO;
import com.backend.dto.salida.UsuarioSalidaDTO;
import com.backend.service.AuthService;
import jakarta.validation.Valid;

import com.backend.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/registro") public ResponseEntity<MensajeResponseDTO> registrarUsuario(@RequestBody @Valid RegistroRequestDTO registroDTO) throws ResourceNotFoundException {
      MensajeResponseDTO mensaje = authService.registrarUsuario(registroDTO);
      HttpStatus status = mensaje.isExito() ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST;
      return new ResponseEntity<>(mensaje, status);
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

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioSalidaDTO> obtenerUsuarioPorId(@PathVariable(name = "id") Long id) throws ResourceNotFoundException, AccessDeniedException {
        UsuarioSalidaDTO usuarioDto = authService.obtenerUsuarioPorId(id);
        return ResponseEntity.ok(usuarioDto);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioSalidaDTO>> obtenerTodosLosUsuarios() {
        List<UsuarioSalidaDTO> usuariosDto = authService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuariosDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioSalidaDTO> actualizarUsuario(
            @PathVariable(name = "id") Long id,
            @Valid @RequestBody RegistroRequestDTO registroDTO) throws ResourceNotFoundException, AccessDeniedException {

        UsuarioSalidaDTO usuarioActualizado = authService.actualizarUsuario(id, registroDTO);
        return ResponseEntity.ok(usuarioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UsuarioSalidaDTO> eliminarUsuario(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        UsuarioSalidaDTO usuarioEliminado = authService.eliminarUsuario(id);
        return ResponseEntity.ok(usuarioEliminado);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UsuarioSalidaDTO> actualizarParcialmenteUsuario(
            @PathVariable(name = "id") Long id,
            @RequestBody Map<String, Object> cambios) throws ResourceNotFoundException, AccessDeniedException {

        UsuarioSalidaDTO usuarioActualizado = authService.actualizarParcialmenteUsuario(id, cambios);
        return ResponseEntity.ok(usuarioActualizado);
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, String>> validateToken(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Map<String, String> response = new HashMap<>();
        response.put("role", authentication.getAuthorities().iterator().next().getAuthority());
        response.put("username", authentication.getName());

        return ResponseEntity.ok(response);
    }


}