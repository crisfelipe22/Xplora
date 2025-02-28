package com.backend.service;

import com.backend.dto.salida.AuthResponseDTO;
import com.backend.dto.entada.LoginRequestDTO;
import com.backend.dto.salida.MensajeResponseDTO;
import com.backend.dto.entada.RegistroRequestDTO;
import com.backend.entity.Rol;
import com.backend.entity.Usuario;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.RolRepository;
import com.backend.repository.UsuarioRepository;
import com.backend.security.jwt.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Date;

@Service
public class AuthService {


    @Autowired
    private final UsuarioRepository usuarioRepository;

    @Autowired
    private final RolRepository rolRepository;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

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

    @Transactional
    public MensajeResponseDTO registrarUsuario(RegistroRequestDTO registroDTO) throws ResourceNotFoundException {
      // Validar que el rol_id no sea nulo
        if (registroDTO.getId_rol() == null) {
          logger.error("El id_Rol es nulo en la solicitud");
          return new MensajeResponseDTO("Error: El rol es requerido", false);
        }
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

        System.out.println("Guardando usuario: " + usuario.getNombre()); 
        System.out.println("El rol_id es: " + registroDTO.getId_rol()); 
        
        
        Rol rol = rolRepository.findById(registroDTO.getId_rol())
                .orElseThrow(() -> {
                    logger.error("Rol con ID {} no encontrado", registroDTO.getId_rol());
                    return new ResourceNotFoundException("El Rol con ID " + registroDTO.getId_rol() + " no existe");
                });

        usuario.setRol(rol);
                      
        System.out.println("Guardando usuario: " + usuario.getNombre()); 

        // Guardar en la base de datos
        try {
          usuarioRepository.save(usuario);
        } catch (Exception e) {
          logger.error("Error inesperado al guardar el paquete de experiencia '{}': {}",
              usuario.getNombre(), e.getMessage(), e);
        }

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