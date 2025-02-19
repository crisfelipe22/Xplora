package com.backend.dbconnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class H2Connection {
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("org.h2.Driver");
        return DriverManager.getConnection("jdbc:h2:~/xplora", "sa", "sa");
    }

    public static void ejecutarScriptInicial() {
        Connection connection = null;
        try {
            Class.forName("org.h2.Driver");
            connection = DriverManager.getConnection("jdbc:h2:~/xplora;INIT=RUNSCRIPT FROM 'statement.sql'", "sa", "sa");
            System.out.println("Conexión establecida correctamente");

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error general: " + e.getMessage());

        } finally {
            try {
                connection.close();
            } catch (Exception ex) {
                ex.printStackTrace();
                System.err.println("Error general: " + ex.getMessage());

            }
        }

    }
}
