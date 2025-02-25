package com.backend.controller;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController implements ErrorController {
    
    // Redirige todas las rutas que no tienen extensión de archivo al index
    @RequestMapping({"/{path:[^\\.]*}", "/error", "/admin/**", "/error", "detalle-producto/**"})
    public String redirect() {
        return "forward:/index.html";
    }
}