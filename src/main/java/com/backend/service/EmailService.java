package com.backend.service;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ServiceConfigurationError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

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

  public void sendHtmlReservationConfirmationEmail(
      String to,
      String username,
      String nombrePaquete,
      Date startDate,
      Date endDate) {
    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
      SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
      String fechaInicio = startDate != null
          ? formatter.format(
              startDate)
          : "fecha no disponible";
      String fechaFin = endDate != null ? formatter.format(endDate)
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
          + "<p>Tu registro con la dirección de correo " + to + " se realizó correctamente</p>"
          + "<br>"
          + "<a href='" + appUrl
          + "/login'><button style='background-color: #6239E6; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer;'>Iniciar sesión</button></a>";

      helper.setText(htmlContent, true);
      mailSender.send(mimeMessage);
    } catch (MessagingException | UnsupportedEncodingException e) {
      // Handle exception
    }
  }
}