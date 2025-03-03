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

import java.util.List;

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
    public ResponseEntity<UsuarioSalidaDTO> obtenerUsuarioPorId(@PathVariable Long id) throws ResourceNotFoundException {
        UsuarioSalidaDTO usuarioDto = authService.obtenerUsuarioPorId(id);
        return ResponseEntity.ok(usuarioDto);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioSalidaDTO>> obtenerTodosLosUsuarios() {
        List<UsuarioSalidaDTO> usuariosDto = authService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuariosDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MensajeResponseDTO> actualizarUsuario(@PathVariable Long id, @Valid @RequestBody RegistroRequestDTO registroDTO) throws ResourceNotFoundException {
        MensajeResponseDTO mensaje = authService.actualizarUsuario(id, registroDTO);
        HttpStatus status = mensaje.isExito() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(mensaje, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensajeResponseDTO> eliminarUsuario(@PathVariable Long id) throws ResourceNotFoundException {
        MensajeResponseDTO mensaje = authService.eliminarUsuario(id);
        return ResponseEntity.ok(mensaje);
    }

}