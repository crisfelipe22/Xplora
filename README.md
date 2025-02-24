# Xplora
Xplora es un sitio web diseñado para ayudarte a encontrar el regalo perfecto para tus seres queridos, ofreciéndote una amplia variedad de opciones para sorprenderlos y demostrarles cuánto te importan.

# Levantar Xplora (1.0.0)

## Requisitos 

Todos los comandos descritos en esta guía fueron probados en una terminal de GitBash corriendo en Windows 10.
Para ejecutar esta aplicación, necesitas tener instalados los siguientes programas:

### 1. Node.js y npm

El frontend está construido con React, por lo que necesitas Node.js y npm.

Para verificar si los tienes instalados, ejecuta:

```sh
node -v
npm -v
```

Si no los tienes, descárgalos desde [aqui](https://nodejs.org/). Una vez esté lista la instalación agrega el programa a tu PATH 

### 2. MySQL

La aplicación usa MySQL como base de datos. Para comprobar si MySQL está instalado, ejecuta:

```sh
mysql --version
```

Si no está instalado, sigue las instrucciones descritas [aqui](https://dev.mysql.com/downloads/installer/). Una vez esté lista la instalación agrega el programa a tu PATH 

Asegúrate de que MySQL esté corriendo como servicio en tu equipo antes de iniciar la aplicación.

### 3. Maven

El backend está construido con Spring Boot y usa Maven para la gestión de dependencias. Para comprobar si Maven está instalado, ejecuta:

```sh
mvn -v
```

Si no lo tienes, instálalo siguiendo las instrucciones de [aqui](https://maven.apache.org/download.cgi). Una vez esté lista la instalación agrega el programa a tu PATH 

---

# Instalación y Ejecución

Sigue estos pasos para levantar la aplicación:

## 1. Configurar la base de datos

Antes de ejecutar la aplicación, configura MySQL de la siguiente manera:

1. Inicia sesión en MySQL con el usuario `root`:

   ```sh
   mysql -u root -p
   ```

2. Luego de ingresar la clave del usuario, crea una base de datos llamada `xplora_db`:

   ```sh
   CREATE DATABASE xplora_db;
   ```

3. Crea un usuario llamado `app_user` con la contraseña `root`:

   ```sh
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'root';
   ```

4. Concede todos los privilegios al usuario en la base de datos:

   ```sh
   GRANT ALL PRIVILEGES ON xplora_db.* TO 'app_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

5. Sal de mysql y desactiva `public-key-retrieval` para la base de datos xplora_db desde la consola ejecutando el siguiente comando y posteriomente ingresando la clave del usuario 'app\_user' (en este caso 'root')* :

   ```sh
   exit;
   mysql -u app_user -p -h localhost --default-auth=mysql_native_password xplora_db

   ```



---
## 2. Preparar el frontend (React)

Navega al directorio frontend del repositorio y ejecuta:

```sh
npm install  # Instalar dependencias
npm run build  # Construir la versión estática de la aplicación
rm -r ../src/main/resources/static/assets # Borrar archivos estáticos que podrían existir de builds anteriores
cp -r dist/* ../src/main/resources/static/ # Pegar los archivos estáticos generados en el directorio que usará Springboot
```

## 3. Levantar el backend (Spring Boot)

Navega al directorio Xplora y ejecuta:

```sh
mvn clean install  # Compilar y preparar la aplicación
mvn spring-boot:run  # Iniciar el backend
```

Por defecto, la aplicación se ejecutará en `http://localhost:8080`.

---


# Notas adicionales

- Si antes de seguir esta guía habías creado una base de datos 'xplora_db', o habías levantado la aplicación con versiones anteriores, es recomendable que elimines la base de datos y la vuelvas a crear siguiendo los pasos descritos en esta guía. De lo contrario, puede ser que la base de datos se quede "atrapada" en su estado previo. 

- Si pudiste ejecutar exitosamente todos los comandos y levantar la aplicación por primera vez, tendrás que detenerla y levantarla un par de veces más para que la base de datos alcance su estado deseado

- Por favor documenta cualquier problema, duda o desviación en la secuencia de pasos que se genere al seguir esta guía para poder mejorarla en el futuro

Éxito. 🚀

