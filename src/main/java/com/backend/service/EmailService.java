package com.backend.service;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.backend.dto.salida.ReservaSalidaDTO;
import com.backend.repository.PaqueteExperienciaRepository;
import com.backend.repository.UsuarioRepository;
import com.backend.entity.PaqueteExperiencia;
import com.backend.entity.Usuario;
import com.backend.exceptions.ResourceNotFoundException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ServiceConfigurationError;
import java.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private PaqueteExperienciaRepository paqueteExperienciaRepository;

  @Value("${app.url}")
  private String appUrl;

  @Value("${spring.mail.username}")
  private String fromAddress;

  private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

  public void sendRegistrationConfirmationEmail(String to, String username) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(fromAddress);
    message.setTo(to);
    message.setSubject(username + ", bienvenid@ a Xplora");
    message.setText("Hola " + username + ",\n\nTu registro fue exitoso! Ya puedes ingresar a tu cuenta en Xplora");

    mailSender.send(message);
  }

  public void sendHtmlReservationConfirmationEmail(ReservaSalidaDTO reservaSalidaDTO) {
    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
      Usuario usuario = usuarioRepository.findById(reservaSalidaDTO.getIdUsuario())
          .orElseThrow(
              () -> new ResourceNotFoundException("Usuario no encontrado con ID: " + reservaSalidaDTO.getIdUsuario()));
      PaqueteExperiencia paqueteExperiencia = paqueteExperienciaRepository
          .findById(reservaSalidaDTO.getIdPaqueteExperiencia())
          .orElseThrow(() -> new ResourceNotFoundException(
              "Paquete no encontrado con ID: " + reservaSalidaDTO.getIdPaqueteExperiencia()));
      String to = usuario.getEmail();
      String username = usuario.getNombre();
      String nombrePaquete = paqueteExperiencia.getNombre();
      SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
      String fechaFin = reservaSalidaDTO.getFecha_fin() != null ? formatter.format(reservaSalidaDTO.getFecha_fin())
          : "fecha no disponible";
      String fechaInicio = reservaSalidaDTO.getFecha_inicio() != null
          ? formatter.format(reservaSalidaDTO.getFecha_inicio())
          : "fecha no disponible";

      helper.setFrom(fromAddress, "Reservas - XPLORA");
      helper.setTo(to);
      helper.setSubject("Tu Reserva en Xplora 😎🏝");

      String htmlContent = "<h3>" + username + ",</h3>"
          + "<h2>Tu reserva fue confirmada 😁</h2>"
          + "<p>Podrás disfrutar de la experiencia '" + nombrePaquete + "' desde el " + fechaInicio + " al " + fechaFin
          + "</p>"
          + "<br>"
          + "<p>Para más información puedes visitar tu perfil Xplora, sección 'Historial de Reservas' usando este link 👇</p>"
          + "<a href='" + appUrl + "/perfil'>"
          + "<button style='background-color: #6239E6; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer;'>Ir a Mi Perfil</button></a>"
          + "<br>"
          + "<h4>Gracias por confiar en nosotros 😉</h4>";

      helper.setText(htmlContent, true);
      mailSender.send(mimeMessage);
      logger.info("Confirmation email sent successfully to {}", to);
    } catch (MessagingException e) {
      logger.error("Failed to send confirmation email: {}", e.getMessage(), e);
      throw new ServiceConfigurationError("Failed to send confirmation email: " + e.getMessage(), e);
    } catch (UnsupportedEncodingException e) {
      logger.error("Encoding error while preparing email: {}", e.getMessage(), e);
      throw new UnsupportedOperationException("Email encoding failed: " + e.getMessage(), e);
    } catch (ResourceNotFoundException e) {
      logger.error("Resource not found: {}", e.getMessage());
    }
  }

  public void sendHtmlRegistrationConfirmationEmail(String to, String username) {
      try {
          MimeMessage mimeMessage = mailSender.createMimeMessage();
          MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
          
          helper.setFrom("luis.f.cerda.p@gmail.com", "Registro - XPLORA");
          helper.setTo(to);
          helper.setSubject("Todo listo para Xplorar 😎🏝");
          
          String htmlContent = "<h3>" + username + ",</h3>"
                            + "<h2>bienvenid@ a Xplora!</h2>"
                            + "<p>Tu registro con la dirección de correo "+ to +" se realizó correctamente</p>"
                            + "<br>"
                            + "<a href='" + appUrl + "/login'><button style='background-color: #6239E6; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer;'>Iniciar sesión</button></a>";
          
          helper.setText(htmlContent, true);
          mailSender.send(mimeMessage);
      } catch (MessagingException | UnsupportedEncodingException e) {
          // Handle exception
      }
  }
}