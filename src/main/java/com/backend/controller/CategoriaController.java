package com.backend.controller;

import com.backend.dto.entada.CategoriaEntradaDto;
import com.backend.dto.salida.CategoriaSalidaDto;
import com.backend.entity.Categoria;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<CategoriaSalidaDto> agregarCategoria(@RequestBody CategoriaEntradaDto categoriaDto) {
        CategoriaSalidaDto nuevaCategoriaDto = categoriaService.agregarCategoria(categoriaDto);
        return new ResponseEntity<>(nuevaCategoriaDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoriaSalidaDto>> obtenerTodasLasCategorias() {
        List<CategoriaSalidaDto> categoriasDto = categoriaService.obtenerTodasLasCategorias();
        return new ResponseEntity<>(categoriasDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaSalidaDto> obtenerCategoriaPorId(@PathVariable Long id) throws ResourceNotFoundException {
        CategoriaSalidaDto categoriaDto = categoriaService.obtenerCategoriaPorId(id);
        return new ResponseEntity<>(categoriaDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaSalidaDto> actualizarCategoria(@PathVariable Long id, @RequestBody CategoriaEntradaDto categoriaDto) throws ResourceNotFoundException {
        CategoriaSalidaDto categoriaActualizada = categoriaService.actualizarCategoria(id, categoriaDto);
        return new ResponseEntity<>(categoriaActualizada, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CategoriaSalidaDto> eliminarCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        CategoriaSalidaDto categoriaEliminada = categoriaService.eliminarCategoria(id);
        return new ResponseEntity<>(categoriaEliminada, HttpStatus.OK);
    }
}
