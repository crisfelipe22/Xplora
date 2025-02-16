package com.backend.controller;

import com.backend.dto.entada.Categoria.CategoriaEntradaDto;
import com.backend.dto.salida.Categoria.CategoriaSalidaDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {

    private ICategoriaService categoriaService;

    @PostMapping("/registrar")
    public ResponseEntity<CategoriaSalidaDto> registrarCategoria(@RequestBody @Valid CategoriaEntradaDto categoriaEntradaDto){
        CategoriaSalidaDto categoriaSalidaDto = categoriaService.registrarCategoria(categoriaEntradaDto);
        return new ResponseEntity<>(categoriaSalidaDto, HttpStatus.CREATED);
    }

}
