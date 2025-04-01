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
    String phoneNumber = "56949745196";
    String message = "Hola, quiero más información"; // Mensaje opcional
    String encodedMessage = URLEncoder.encode(message, StandardCharsets.UTF_8);

    Map<String, String> response = new HashMap<>();
    response.put("whatsappUrl", "https://wa.me/" + phoneNumber + "?text=" + encodedMessage);

    return ResponseEntity.ok(response);
}
}
