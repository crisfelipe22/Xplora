package com.backend.dto.salida;

import java.util.Date;

public class UsuarioSalidaDTO {

    private Long id_usuario;
    private String nombre;

    private String email;

    private int telefono;

    private String direccion;

    private Date fechaRegistro;

    private Long id_rol;

    public UsuarioSalidaDTO(Long id_usuario, String nombre, String email, int telefono, String direccion, Date fechaRegistro, Long id_rol) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaRegistro = fechaRegistro;
        this.id_rol = id_rol;
    }

    public UsuarioSalidaDTO() {
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Long getId_rol() {
        return id_rol;
    }

    public void setId_rol(Long id_rol) {
        this.id_rol = id_rol;
    }
}
