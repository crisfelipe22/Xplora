package com.backend.service;

import com.backend.dto.salida.AuthResponseDTO;
import com.backend.dto.entada.LoginRequestDTO;
import com.backend.dto.salida.MensajeResponseDTO;
import com.backend.dto.entada.RegistroRequestDTO;
import com.backend.entity.Rol;
import com.backend.entity.Usuario;
import com.backend.repository.RolRepository;
import com.backend.repository.UsuarioRepository;
import com.backend.security.jwt.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UsuarioRepository usuarioRepository,
                       RolRepository rolRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public MensajeResponseDTO registrarUsuario(RegistroRequestDTO registroDTO) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            return new MensajeResponseDTO("Error: El email ya está en uso", false);
        }

        // Crear el nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(registroDTO.getNombre());
        usuario.setEmail(registroDTO.getEmail());
        usuario.setContrasena(passwordEncoder.encode(registroDTO.getContrasena()));
        usuario.setTelefono(registroDTO.getTelefono());
        usuario.setDireccion(registroDTO.getDireccion());
        usuario.setFechaRegistro(new Date());

        System.out.println("Guardando usuario: " + usuario); // 📌 Log antes de guardar

        // Buscar y asignar el rol
        Rol rol = rolRepository.findById(registroDTO.getRolId())
                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
        usuario.setRol(rol);

        // Guardar en la base de datos
        usuarioRepository.save(usuario);

        return new MensajeResponseDTO("Usuario registrado exitosamente", true);
    }

    public AuthResponseDTO autenticarUsuario(LoginRequestDTO loginDTO) {
        // Autenticar credenciales
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getContrasena()));

        // Establecer autenticación en el contexto
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generar token JWT
        String jwt = jwtUtils.generateJwtToken(authentication);

        // Obtener detalles del usuario
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Buscar usuario en la base de datos para obtener datos adicionales
        Usuario usuario = usuarioRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        // Construir respuesta
        return new AuthResponseDTO(
                jwt,
                usuario.getId_usuario(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getIniciales(),
                usuario.getRol().getNombre()
        );
    }
}