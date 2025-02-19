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
    private static final String URL = "jdbc:mysql://localhost:3306/Xplora_db?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASSWORD = "root";
    private static final String SCRIPT_PATH = "statement.sql";

    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(URL, USER, PASSWORD);
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
