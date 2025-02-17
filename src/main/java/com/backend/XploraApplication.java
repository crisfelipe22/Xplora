package com.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.backend.dbconnection.H2Connection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class XploraApplication {
    public static void main(String[] args){
        H2Connection.ejecutarScriptInicial();

        // Inicia la aplicación Spring Boot
        SpringApplication.run(XploraApplication.class, args);
    }
}
