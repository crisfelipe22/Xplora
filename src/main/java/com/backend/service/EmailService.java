package com.backend.service;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendRegistrationConfirmationEmail(String to, String username) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("luis.f.cerda.p@gmail.com");
    message.setTo(to);
    message.setSubject(username + ", bienvenid@ a Xplora");
    message.setText("Hola " + username + ",\n\nTu registro fue exitoso! Ya puedes ingresar a tu cuenta en Xplora");

    mailSender.send(message);
  }

  @Value("${app.url}")
  private String appUrl;
  
  public void sendHtmlRegistrationConfirmationEmail(String to, String username) {
      try {
          MimeMessage mimeMessage = mailSender.createMimeMessage();
          MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
          
          helper.setFrom("luis.f.cerda.p@gmail.com", "XPLORA - Registro");
          helper.setTo(to);
          helper.setSubject("Todo listo para Xplorar 😎🏝");
          
          String htmlContent = "<h3>" + username + ",<h3>"
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