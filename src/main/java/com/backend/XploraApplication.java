package com.backend;

import com.backend.dbconnection.H2Connection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class XploraApplication {
    public static void main(String[] args){
        // Ejecuta el script de inicialización de la base de datos
        H2Connection.ejecutarScriptInicial();

        // Inicia la aplicación Spring Boot
        SpringApplication.run(XploraApplication.class, args);
    }
}
