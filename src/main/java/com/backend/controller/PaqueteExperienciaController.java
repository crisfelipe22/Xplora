package com.backend.controller;

import com.backend.dto.entada.Categoria.CategoriaEntradaDto;
import com.backend.dto.entada.Categoria.PaqueteExperienciaEntradaDto;
import com.backend.dto.salida.Categoria.CategoriaSalidaDto;
import com.backend.dto.salida.Categoria.PaqueteExperienciaSalidaDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categoria-experiencia")
public class PaqueteExperienciaController {

    private IPaqueteExperiencia paqueteExperiencia;

    @PostMapping("/registrar")
    public ResponseEntity<PaqueteExperienciaSalidaDto> registrarPaqueteExperiencia(@RequestBody @Valid PaqueteExperienciaEntradaDto paqueteExperienciaEntradaDto) {
        PaqueteExperienciaSalidaDto paqueteExperienciaSalidaDto = paqueteExperiencia.registrarPaqueteExperiencia(paqueteExperienciaEntradaDto);
        return new ResponseEntity<>(paqueteExperienciaSalidaDto, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDto> buscarPaqueteExperienciaPorId(@PathVariable Long id) {
        PaqueteExperienciaSalidaDto paqueteExperienciaSalidaDto = paqueteExperiencia.buscarPaqueteExperiencia(id);
        return new ResponseEntity<>(paqueteExperienciaSalidaDto, HttpStatus.OK);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDto> actualizarPaqueteExperienciaPorId(@RequestBody @Valid PaqueteExperienciaEntradaDto paqueteExperienciaEntradaDto, @PathVariable Long id){
        PaqueteExperienciaSalidaDto paqueteExperienciaSalidaDto = paqueteExperiencia.actualizarPaqueteExperiencia(paqueteExperienciaEntradaDto, id);
        return new ResponseEntity<>(paqueteExperienciaSalidaDto, HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<PaqueteExperienciaSalidaDto> eliminarPaqueteExperienciaPorId(@PathVariable Long id){
        PaqueteExperienciaSalidaDto paqueteExperienciaSalidaDto = paqueteExperiencia.eliminarPaqueteExperiencia(id);
        return new ResponseEntity<>(paqueteExperienciaSalidaDto, HttpStatus.OK);
    }

}
