package com.backend.dbconnection;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.stream.Collectors;

public class MySQLConnection {
    private static final String SCRIPT_PATH = "statement.sql";

    public static Connection getConnection() throws ClassNotFoundException, SQLException {
      String envUrl = System.getenv("MYSQL_URL");
      String user = System.getenv("DB_USER");
      String password = System.getenv("DB_PASSWORD");

      String jdbcUrl;

      // Fallback to local development values if environment variables not found
      if (envUrl == null) {
        jdbcUrl = "jdbc:mysql://localhost:3306/xplora_db?useSSL=false&serverTimezone=UTC";
      } else {
        // Convert Railway URL format to JDBC format
        // Railway format: mysql://username:password@hostname:port/database
        // We need: jdbc:mysql://hostname:port/database

        if (envUrl.startsWith("mysql://")) {
          // Extract the part after mysql://user:pass@
          String[] parts = envUrl.split("@");
          if (parts.length > 1) {
            jdbcUrl = "jdbc:mysql://" + parts[1];
          } else {
            jdbcUrl = "jdbc:mysql://" + envUrl.substring(8); // Remove "mysql://"
          }
        } else {
          // If it doesn't start with mysql://, just add jdbc: prefix
          jdbcUrl = "jdbc:" + envUrl;
        }

        // Add parameters if they're not already in the URL
        if (!jdbcUrl.contains("?")) {
          jdbcUrl += "?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
        }
      }

      // Use the user and password from environment variables if available
      if (user == null)
        user = "app_user";
      if (password == null)
        password = "root";

      System.out.println("Connecting with URL: " + jdbcUrl + " (credentials hidden)");

      Class.forName("com.mysql.cj.jdbc.Driver");
      return DriverManager.getConnection(jdbcUrl, user, password);
    }

    public static void ejecutarScriptInicial() {
        Connection connection = null;
        Statement statement = null;
        try {
            connection = getConnection();
            statement = connection.createStatement();
            // Leer el contenido del archivo SQL
            List<String> lineas = Files.readAllLines(Paths.get(SCRIPT_PATH));

            List<String> lineasFiltradas = lineas.stream()
                    .filter(line -> !line.trim().startsWith("--"))
                    .collect(Collectors.toList());
            String scriptSQL = String.join(" ", lineasFiltradas);

            // Separar comandos SQL por ";"
            String[] comandos = scriptSQL.split(";");

            // Ejecutar cada comando individualmente
            for (String comando : comandos) {
                if (!comando.trim().isEmpty()) {
                    try {
                        statement.execute(comando);
                        System.out.println("Ejecutado: " + comando);
                    } catch (SQLException ex) {
                        System.err.println("Error en comando: " + comando);
                        ex.printStackTrace();
                    }
                }
            }


            System.out.println("Script SQL ejecutado correctamente.");

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error al ejecutar el script SQL: " + e.getMessage());

        } finally {
            try {
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (Exception ex) {
                ex.printStackTrace();
                System.err.println("Error al cerrar la conexión: " + ex.getMessage());
            }
        }
    }
}
