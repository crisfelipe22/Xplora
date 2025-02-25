package com.backend;

import com.backend.dbconnection.MySQLConnection;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class XploraApplication {
    public static void main(String[] args){
        MySQLConnection.ejecutarScriptInicial();

        // Inicia la aplicación Spring Boot
        SpringApplication.run(XploraApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
