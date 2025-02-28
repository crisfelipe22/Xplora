package com.backend.entity;
import jakarta.persistence.*;
import java.util.Date;
import jakarta.persistence.Entity;



@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;

    @Column(nullable = false, length = 45)
    private String nombre;

    @Column(nullable = false, length = 45, unique = true)
    private String email;

    @Column(nullable = false)
    private String contrasena;

    private int telefono;

    @Column(length = 100)
    private String direccion;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaRegistro;

    @ManyToOne
    @JoinColumn(name = "id_rol")
    private Rol rol;

    // Constructor vacío
    public Usuario() {
    }

    // Constructor con campos
    public Usuario(Long id_usuario, String nombre, String email, String contrasena, int telefono,
                   String direccion, Date fechaRegistro, Rol rol) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaRegistro = fechaRegistro;
        this.rol = rol;
    }

    // Getters y Setters
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

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
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

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    // Método para obtener las iniciales para el avatar
    public String getIniciales() {
        if (nombre == null || nombre.isEmpty()) {
            return "??";
        }
        String[] palabras = nombre.split(" ");
        StringBuilder iniciales = new StringBuilder();

        for (int i = 0; i < Math.min(2, palabras.length); i++) {
            if (!palabras[i].isEmpty()) {
                iniciales.append(palabras[i].charAt(0));
            }
        }

        return iniciales.toString().toUpperCase();
    }
}