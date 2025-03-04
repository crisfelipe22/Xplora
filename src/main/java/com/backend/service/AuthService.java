package com.backend.service;

import com.backend.dto.salida.AuthResponseDTO;
import com.backend.dto.entada.LoginRequestDTO;
import com.backend.dto.salida.MensajeResponseDTO;
import com.backend.dto.entada.RegistroRequestDTO;
import com.backend.dto.salida.UsuarioSalidaDTO;
import com.backend.entity.Rol;
import com.backend.entity.Usuario;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.repository.RolRepository;
import com.backend.repository.UsuarioRepository;
import com.backend.security.jwt.JwtUtils;
import org.modelmapper.ModelMapper;
import org.springframework.util.ReflectionUtils;
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

import java.lang.reflect.Field;
import java.nio.file.AccessDeniedException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthService {


    @Autowired
    private final UsuarioRepository usuarioRepository;

    @Autowired
    private final RolRepository rolRepository;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    private final ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService(UsuarioRepository usuarioRepository,
                       RolRepository rolRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils, ModelMapper modelMapper) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.modelMapper = modelMapper;
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

<<<<<<< HEAD
    public UsuarioSalidaDTO obtenerUsuarioPorId(Long id) throws ResourceNotFoundException {
=======
    public UsuarioSalidaDTO obtenerUsuarioPorId(Long id) throws ResourceNotFoundException, AccessDeniedException {
>>>>>>> 322df1c863b17f9aee8d8f8ee0eea9ece0f9602d
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Usuario con ID '{}' no encontrado", id);
                    return new ResourceNotFoundException("Usuario no encontrado");
                });

        String emailActual = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuarioAutenticado = usuarioRepository.findByEmail(emailActual)
                .orElseThrow(() -> new AccessDeniedException("No se encontró el usuario autenticado"));

        if (!usuario.getEmail().equals(emailActual) && !usuarioAutenticado.getRol().getNombre().equals("SuperAdministrador")) {
            throw new AccessDeniedException("No tienes permisos para modificar este usuario.");
        }

        UsuarioSalidaDTO usuarioSalidaDTO = modelMapper.map(usuario, UsuarioSalidaDTO.class);
        usuarioSalidaDTO.setId_rol(usuario.getRol().getId_rol());
        return usuarioSalidaDTO;
    }

    public List<UsuarioSalidaDTO> obtenerTodosLosUsuarios() {
        logger.info("Obteniendo los usuarios");
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream().map(usuario -> {
            UsuarioSalidaDTO usuarioDTO = modelMapper.map(usuario, UsuarioSalidaDTO.class);
            usuarioDTO.setId_rol(usuario.getRol().getId_rol());
            return usuarioDTO;
        }).collect(Collectors.toList());
    }

    @Transactional
    public UsuarioSalidaDTO actualizarUsuario(Long id, RegistroRequestDTO registroDTO) throws ResourceNotFoundException, AccessDeniedException {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Usuario con ID '{}' no encontrado", id);
                    return new ResourceNotFoundException("Usuario no encontrado");
                });

        String emailActual = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuarioAutenticado = usuarioRepository.findByEmail(emailActual)
                .orElseThrow(() -> new AccessDeniedException("No se encontró el usuario autenticado"));

        if (!usuario.getEmail().equals(emailActual) && !usuarioAutenticado.getRol().getNombre().equals("SuperAdministrador")) {
            throw new AccessDeniedException("No tienes permisos para modificar este usuario.");
        }

        modelMapper.map(registroDTO, usuario);
        usuarioRepository.save(usuario);
        logger.info("Usuario con ID '{}' actualizado exitosamente", id);

        UsuarioSalidaDTO usuarioSalidaDTO = modelMapper.map(usuario, UsuarioSalidaDTO.class);
        usuarioSalidaDTO.setId_rol(usuario.getRol().getId_rol());
        return usuarioSalidaDTO;
    }

    @Transactional
    public UsuarioSalidaDTO eliminarUsuario(Long id) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Usuario con ID '{}' no encontrado", id);
                    return new ResourceNotFoundException("Usuario no encontrado");
                });

        usuarioRepository.deleteById(id);
        logger.info("Usuario con ID '{}' eliminado exitosamente", id);

        UsuarioSalidaDTO usuarioSalidaDTO = modelMapper.map(usuario, UsuarioSalidaDTO.class);
        usuarioSalidaDTO.setId_rol(usuario.getRol().getId_rol());

        return usuarioSalidaDTO;
    }

    @Transactional
    public UsuarioSalidaDTO actualizarParcialmenteUsuario(Long id, Map<String, Object> cambios) throws ResourceNotFoundException, AccessDeniedException {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Usuario con ID '{}' no encontrado", id);
                    return new ResourceNotFoundException("Usuario no encontrado");
                });

        String emailActual = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuarioAutenticado = usuarioRepository.findByEmail(emailActual)
                .orElseThrow(() -> new AccessDeniedException("No se encontró el usuario autenticado"));

        if (!usuario.getEmail().equals(emailActual) && !usuarioAutenticado.getRol().getNombre().equals("SuperAdministrador")) {
            throw new AccessDeniedException("No tienes permisos para modificar este usuario.");
        }

        cambios.forEach((campo, valor) -> {
            Field field = ReflectionUtils.findField(Usuario.class, campo);
            if (field != null) {
                field.setAccessible(true);
                ReflectionUtils.setField(field, usuario, valor);
            }
        });

        usuarioRepository.save(usuario);
        logger.info("Usuario con ID '{}' actualizado parcialmente", id);

        UsuarioSalidaDTO usuarioSalidaDTO = modelMapper.map(usuario, UsuarioSalidaDTO.class);
        usuarioSalidaDTO.setId_rol(usuario.getRol().getId_rol());
        return usuarioSalidaDTO;
    }

}