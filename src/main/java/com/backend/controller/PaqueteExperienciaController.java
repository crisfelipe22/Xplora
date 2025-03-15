package com.backend.controller;

import com.backend.dto.entada.PaqueteExperienciaEntradaDTO;
import com.backend.dto.salida.PaqueteExperienciaSalidaDTO;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.service.PaqueteExperienciaService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/paquete-experiencia")
@CrossOrigin
public class PaqueteExperienciaController {

    @Autowired
    private PaqueteExperienciaService paqueteExperienciaService;

    @PostMapping
    // @CrossOrigin
    public ResponseEntity<PaqueteExperienciaSalidaDTO> agregarPaqueteExperiencia(@RequestBody @Valid PaqueteExperienciaEntradaDTO paqueteExperienciaEntradaDto) throws BadRequestException {
        PaqueteExperienciaSalidaDTO nuevoPaquete = paqueteExperienciaService.agregarPaqueteExperiencia(paqueteExperienciaEntradaDto);
        return new ResponseEntity<>(nuevoPaquete, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDTO> obtenerPaqueteExperienciaPorId(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        PaqueteExperienciaSalidaDTO paqueteExperienciaSalidaDto = paqueteExperienciaService.obtenerPaqueteExperienciaPorId(id);
        return new ResponseEntity<>(paqueteExperienciaSalidaDto, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDTO> eliminarPaqueteExperiencia(@PathVariable(name = "id") Long id) throws ResourceNotFoundException, BadRequestException {
        PaqueteExperienciaSalidaDTO paqueteEliminado =paqueteExperienciaService.eliminarPaqueteExperiencia(id);
        return new ResponseEntity<>(paqueteEliminado, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDTO> actualizarPaqueteExperiencia(
            @PathVariable(name = "id") Long id,
            @RequestBody @Valid PaqueteExperienciaEntradaDTO paqueteExperienciaEntradaDto) throws ResourceNotFoundException, BadRequestException {
        PaqueteExperienciaSalidaDTO paqueteActualizado = paqueteExperienciaService.actualizarPaqueteExperiencia(id, paqueteExperienciaEntradaDto);
        return new ResponseEntity<>(paqueteActualizado, HttpStatus.ACCEPTED);
    }


    @GetMapping
    public ResponseEntity<List<PaqueteExperienciaSalidaDTO>> obtenerTodosLosPaquetes() {
        List<PaqueteExperienciaSalidaDTO> paquetesDto = paqueteExperienciaService.obtenerTodosLosPaquetes();
        return new ResponseEntity<>(paquetesDto, HttpStatus.OK);
    }
    @GetMapping("/aleatorios")
    public ResponseEntity<List<PaqueteExperienciaSalidaDTO>> obtenerPaquetesAleatorios(
            @RequestParam(name = "cantidad", defaultValue = "10", required = false) int cantidad) {
        List<PaqueteExperienciaSalidaDTO> paquetesDto = paqueteExperienciaService.obtenerPaquetesAleatorios(cantidad);
        return new ResponseEntity<>(paquetesDto, HttpStatus.OK);
    }

    @GetMapping("/filtro")
public ResponseEntity<List<PaqueteExperienciaSalidaDTO>> obtenerPaqueteExperienciaPorFiltro(
        @RequestParam(name = "nombre", required = false) String nombre,
        @RequestParam(name = "fecha_inicio", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha_inicio,
        @RequestParam(name = "fecha_fin", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha_fin,
        @RequestParam(name = "categoriaId", required = false) Long categoriaId  
) {
    List<PaqueteExperienciaSalidaDTO> paquetesDto = paqueteExperienciaService.obtenerPaqueteExperienciaPorFiltro(nombre, fecha_inicio, fecha_fin, categoriaId);
    return new ResponseEntity<>(paquetesDto, HttpStatus.OK);
}

}
