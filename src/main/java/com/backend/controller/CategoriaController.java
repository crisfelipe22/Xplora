package com.backend.controller;

import com.backend.dto.entada.CategoriaEntradaDTO;
import com.backend.dto.salida.CategoriaSalidaDTO;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<CategoriaSalidaDTO> agregarCategoria(@RequestBody CategoriaEntradaDTO categoriaDto) {
        CategoriaSalidaDTO nuevaCategoriaDto = categoriaService.agregarCategoria(categoriaDto);
        return new ResponseEntity<>(nuevaCategoriaDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoriaSalidaDTO>> obtenerTodasLasCategorias() {
        List<CategoriaSalidaDTO> categoriasDto = categoriaService.obtenerTodasLasCategorias();
        return new ResponseEntity<>(categoriasDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaSalidaDTO> obtenerCategoriaPorId(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        CategoriaSalidaDTO categoriaDto = categoriaService.obtenerCategoriaPorId(id);
        return new ResponseEntity<>(categoriaDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaSalidaDTO> actualizarCategoria(@PathVariable(name = "id") Long id, @RequestBody CategoriaEntradaDTO categoriaDto) throws ResourceNotFoundException {
        CategoriaSalidaDTO categoriaActualizada = categoriaService.actualizarCategoria(id, categoriaDto);
        return new ResponseEntity<>(categoriaActualizada, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CategoriaSalidaDTO> eliminarCategoria(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        CategoriaSalidaDTO categoriaEliminada = categoriaService.eliminarCategoria(id);
        return new ResponseEntity<>(categoriaEliminada, HttpStatus.OK);
    }
}
