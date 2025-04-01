package com.backend.controller;

import org.springframework.web.bind.annotation.*; 
import org.springframework.http.ResponseEntity;  
import java.util.HashMap;  
import java.util.Map;  
import java.net.URLEncoder;  
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/whatsapp")
public class WhatsAppController {

    @GetMapping("/link")
    public ResponseEntity<Map<String, String>> getWhatsAppLink() {
        Map<String, String> response = new HashMap<>();
        response.put("link", "https://wa.me/56949745196?text=Hola,%20quiero%20mas%20información%20gracias"); // Cambia al número real
        return ResponseEntity.ok(response);
    }
}
