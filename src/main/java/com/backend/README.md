
# API de Paquetes de Experiencia

Este documento describe los endpoints disponibles en la API

## Base URL
La URL base para la API es:
http://localhost:8080/api

## Endpoints

### Paquete de Experiencia

#### Crear un Paquete de Experiencia

- **Método:** POST
- **Endpoint:** `/paquete-experiencia`
- **Descripción:** Permite agregar un nuevo paquete de experiencia.
- **Request Body:**

```json
{
  "id_categoria": 2,
  "nombre": "Aventura en la Montaña",
  "descripcion": "Un día completo de senderismo y escalada.",
  "precio": 150.00,
  "ubicacion": "Andes, Chile",
  "imagen": "https://example.com/imagen.jpg",
  "duracion": "8 horas",
  "fecha_experiencia": "2025-03-15T10:00:00Z"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
"id_paquete_experiencia": 5,
"categoria": {
"id_categoria": 1,
"nombre": "Aventura"
},
"nombre": "Aventura en la Montaña",
"descripcion": "Un día completo de senderismo y escalada.",
"precio": 150.00,
"ubicacion": "Andes, Chile",
"imagen": "https://example.com/imagen.jpg",
"duracion": "8 horas",
"fecha_experiencia": "2025-03-15T10:00:00Z"
}
```

**Errores Posibles:**

- 400 Bad Request: El nombre ya existe o la categoría no es válida.
- 500 Internal Server Error: Error en el servidor.

#### Obtener Todos los Paquetes de Experiencia

- **Método:** GET
- **Endpoint:** `/paquete-experiencia`
- **Descripción:** Devuelve una lista con todos los paquetes de experiencia registrados.


**Respuesta Exitosa (200 OK):**
```json

[
{
"id_paquete_experiencia": 5,
"categoria": {
"id_categoria": 1,
"nombre": "Aventura"
},
"nombre": "Aventura en la Montaña",
"descripcion": "Un día completo de senderismo y escalada.",
"precio": 150.00,
"ubicacion": "Andes, Chile",
"imagen": "https://example.com/imagen.jpg",
"duracion": "8 horas",
"fecha_experiencia": "2025-03-15T10:00:00Z"
}
]
```
#### Obtener Paquetes de Experiencia Aleatorios

**Método:** GET
- **Endpoint:** `/paquete-experiencia/aleatorios?cantidad=5`
- **Descripción:** Obtiene una lista de paquetes aleatorios según la cantidad solicitada. `byDefault obtiene 10`

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "id_paquete_experiencia": 3,
    "id_categoria": 2,
    "nombre": "Spa de Lujo",
    "descripcion": "Un día de relajación en un spa de 5 estrellas.",
    "precio": 200.00,
    "ubicacion": "Santiago, Chile",
    "imagen": "https://example.com/spa.jpg",
    "duracion": "5 horas",
    "fecha_experiencia": "2025-04-10T14:00:00Z"
  }
]
```

### Categoría

#### Crear una Categoría

- **Método:** POST
- **Endpoint:** `/categoria`
- **Descripción:** Crea una nueva categoría para clasificar paquetes de experiencia. `Es necesario que exista la categoría para poder crear un paquete de experiencia`

- **Request Body:**

```json
  {
  "nombre": "Aventura"
  }
```
**Respuesta Exitosa (200 OK):**
```json
{
"idCategoria": 1,
"nombre": "Aventura"
}
```

**Errores Posibles:**
- 400 Bad Request: La categoría ya existe.
- 500 Internal Server Error: Error en el servidor.

#### Actualizar un Paquete de Experiencia

- **Método:** PUT
- **Endpoint:** `/paquete-experiencia/{id}`
- **Descripción:** Permite actualizar un nuevo de experiencia.
- **Request Body:**

```json
{
  "id_categoria": 3,
  "nombre": "Aventura prueba",
  "descripcion": "Un día completo de senderismo y escalada 3.",
  "precio": 270.00,
  "ubicacion": "Bogotá. Colombia",
  "imagen": "https://example.com/imagen.jpg",
  "duracion": "7 dias",
  "fecha_experiencia": "2025-03-15T10:00:00Z"
}
```

**Respuesta Exitosa (202 Acepted):**
```json
{
  "id_categoria": 3,
  "nombre": "Aventura prueba",
  "descripcion": "Un día completo de senderismo y escalada 3.",
  "precio": 270.00,
  "ubicacion": "Bogotá. Colombia",
  "imagen": "https://example.com/imagen.jpg",
  "duracion": "7 dias",
  "fecha_experiencia": "2025-03-15T10:00:00Z"
}
```

#### Obtener un paquete de Experiencia por id

- **Método:** GET
- **Endpoint:** `/paquete-experiencia/{id}`
- **Descripción:** Devuelve el paquete de experiencia solicitado.


**Respuesta Exitosa (200 OK):**
```json
{
  "id_paquete_experiencia": 1,
  "nombre": "Aventura en la Montaña 2",
  "descripcion": "Un día completo de senderismo y escalada 3.",
  "precio": 150.0,
  "ubicacion": "Andes, Chile",
  "imagen": "https://example.com/imagen.jpg",
  "duracion": "8 horas",
  "fecha_experiencia": "2025-03-15T10:00:00.000+00:00",
  "id_categoria": 1
}
```

#### Eliminar un paquete de Experiencia por id

- **Método:** DELETE
- **Endpoint:** `/paquete-experiencia/{id}`
- **Descripción:** Devuelve el paquete de experiencia eliminado.


**Respuesta Exitosa (200 OK):**
```json
{
  "id_paquete_experiencia": 11,
  "nombre": "Aventura en la Montaña 2",
  "descripcion": "Un día completo de senderismo y escalada 3.",
  "precio": 150.0,
  "ubicacion": "Andes, Chile",
  "imagen": "https://example.com/imagen.jpg",
  "duracion": "8 horas",
  "fecha_experiencia": "2025-03-15T10:00:00.000+00:00",
  "id_categoria": 1
}
```

**Errores Posibles:**

- 404 No Found: "mensaje": "Recurso no encontrado:  Paquete de experiencia no encontrado"
- 500 Internal Server Error: Error en el servidor.

### Consideraciones Generales
- Todas las fechas deben estar en formato ISO 8601 (YYYY-MM-DDTHH:MM:SSZ).
- Precio debe ser un valor numérico positivo.
- La ubicacion, imagen, duracion y descripcion son opcionales pero recomendados para una mejor experiencia del usuario.


# API de Autenticación

## Base URL

La URL base para la API es:
http://localhost:8080/api/auth

## Endpoints

### Registrar un usuario
- **Método:** Post
- **Endpoint:** `/registro`
- **Descripción:** Permite crear una nueva cuenta de usuario en el sistema.
- **Request Body:**

```json
{
  "nombre": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "contrasena": "Password123",
  "telefono": 987654321,
  "direccion": "Av. Ejemplo 123, Ciudad",
  "id_rol": 1
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "exito": true
}
```

**Errores Posibles:**
- 400 Bad Request: Error: El email ya está en uso. / Error: El rol es requerido


### Inicio de Sesión
- **Método:** Post
- **Endpoint:** `/login`
- **Descripción:** Permite a un usuario autenticarse y obtener un token JWT para acceder a recursos protegidos.
- **Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "contrasena": "Password123"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlvQGVqZW1wbG8uY29tIiwiaWF0IjoxNzQwNjk4ODc5LCJleHAiOjE3NDA3ODUyNzl9.IHQTOlMxGoO-P8zFssBLVAoN42rztBUxOl5NaEdZgds",
  "tipo": "Bearer",
  "id": 2,
  "nombre": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "iniciales": "NU",
  "rol": "Admin"
}
```
**Errores Posibles:**

- 400 Bad Request: Error: El email ya está en uso. / Error: El rol es requerido
- Credenciales inválidas: Cuando authenticationManager.authenticate() falla debido a credenciales incorrectas
Spring Security normalmente lanza una BadCredentialsException
- Usuario no encontrado: Cuando usuarioRepository.findByEmail() no encuentra el usuario después de la autenticación
Tu código lanza un RuntimeException con el mensaje "Error: Usuario no encontrado."
- Errores de validación: Cuando los campos no cumplen con las restricciones @NotBlank o @Email
Spring Validation generaría errores de validación

### Cierre de Sesión
- **Método:** Post
- **Endpoint:** `/logout`
- **Headers:** `Authorization: Bearer {token}`
- **Descripción:** Permite a un usuario cerrar su sesión.
- **Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "contrasena": "Password123"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "mensaje": "Sesión cerrada correctamente",
  "exito": true
}
```
**Errores Posibles:**

- 400 Bad Request: Error: El email ya está en uso. / Error: El rol es requerido


  **Notas:**
- El token JWT generado tiene un tiempo de expiración.
- Para acceder a recursos protegidos, se debe incluir el token en el header de autorización:
CopyAuthorization: Bearer {token}
- La seguridad está implementada mediante Spring Security y JWT.
