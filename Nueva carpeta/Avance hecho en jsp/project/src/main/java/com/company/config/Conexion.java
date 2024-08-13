/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.company.config;

import static java.lang.System.console; // Importa la clase console del paquete System de Java

import java.sql.Connection; // Importa la clase Connection del paquete java.sql
import java.sql.DriverManager; // Importa la clase DriverManager del paquete java.sql

/**
 * Clase para establecer una conexión a la base de datos.
 * @author Propietario
 */
public class Conexion {
    Connection con; // Declara una variable de tipo Connection para almacenar la conexión
    String url = "jdbc:mysql://localhost:3306/bd_project"; // URL de conexión a la base de datos MySQL
    String user = "root"; // Nombre de usuario de la base de datos
    String pass = ""; // Contraseña de la base de datos
    
    /**
     * Método para obtener una conexión a la base de datos.
     * @return Objeto Connection que representa la conexión establecida.
     */
    public Connection getConnection(){
        try {
            Class.forName("com.mysql.jdbc.Driver"); // Carga la clase del controlador JDBC para MySQL
            con = DriverManager.getConnection(url, user, pass); // Establece la conexión utilizando la URL, usuario y contraseña proporcionados
            System.out.println("Conexion exitosa"); // Imprime un mensaje indicando que la conexión fue exitosa
        } catch (Exception e){ // Captura cualquier excepción que pueda ocurrir durante el proceso de conexión
            // Si se produce una excepción, no se realiza ninguna acción específica aquí
        }
        return con; // Devuelve el objeto Connection que representa la conexión establecida (puede ser nulo si la conexión falló)
    }
}
