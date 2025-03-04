package com.backend.exceptions;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private boolean isApiRequest(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/api/");
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> manejarResourceNotFoundException(ResourceNotFoundException resourceNotFoundException){
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje", "Recurso no encontrado:  " + resourceNotFoundException.getMessage());
        return mensaje;
    }


    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> manejarValidationException(MethodArgumentNotValidException methodArgumentNotValidException) {

        Map<String, String> mensaje = new HashMap<>();

        methodArgumentNotValidException.getBindingResult().getAllErrors().forEach(exeption -> {
            String nombreCampo = ((FieldError) exeption).getField();
            String mensajeError = exeption.getDefaultMessage();
            mensaje.put(nombreCampo, mensajeError);
        });

        return mensaje;
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> manejarHttpMessageNotReadableException(HttpMessageNotReadableException httpMessageNotReadableException) {

        Map<String, String> mensaje = new HashMap<>();

        mensaje.put("Mensaje: ", "Error al serializar la información: " + httpMessageNotReadableException.getLocalizedMessage());

        return mensaje;
    }

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> manejarBadRequestException(BadRequestException badRequestException){
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje: ", "El recurso: " + badRequestException.getMessage() + " no fue encontrado.");
        return mensaje;
    }

    @ExceptionHandler({ConflictException.class})
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> manejarConflictException(ConflictException conflictException) {
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje: ", conflictException.getMessage());
        return mensaje;
    }

    @ExceptionHandler({EntityNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> manejarEntityNotFoundException(EntityNotFoundException entityNotFoundException) {
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje: ", entityNotFoundException.getMessage());
        return mensaje;
    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, String> manejarAccessDeniedException(AccessDeniedException ex) {
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje", "No tienes permisos para realizar esta acción.");
        return mensaje;
    }

    @ExceptionHandler({Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<?> manejarGeneralException(Exception exception, HttpServletRequest request) {
        if (isApiRequest(request)) {
            Map<String, String> mensaje = new HashMap<>();
            mensaje.put("mensaje", "Ha ocurrido un error inesperado: " + exception.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", "/error").build();
    }

}