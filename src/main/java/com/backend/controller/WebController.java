package com.backend.controller;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController implements ErrorController {
    
    // Redirige todas las rutas que no tienen extensión de archivo al index
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }
    
    // Maneja las rutas de error redirigiendo al index
    @RequestMapping(value = "/error")
    public String handleError() {
        return "forward:/index.html";
    }
}