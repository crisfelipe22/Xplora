
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
- **Descripción:** Permite agregar un nuevo paquete de experiencia. Las caracteristicas paquete experiencia son opcionales.
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
  "fecha_inicio": "2025-03-15T10:00:00Z",
  "fecha_fin": "2025-03-15T10:00:00Z",
  "caracteristicas_paquete_experiencia":[
      {
          "id_caracteristica": 4
      },{
          "id_caracteristica": 1
      }
  ]
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
  "fecha_inicio": "2025-03-15T10:00:00Z",
  "fecha_fin": "2025-03-15T10:00:00Z",
  "caracteristicas_paquete_experiencia": [
    {
        "id_caracteristica_paquete_experiencia": 8,
        "id_paquete_experiencia": 52,
        "id_caracteristica": 4
    },
    {
        "id_caracteristica_paquete_experiencia": 9,
        "id_paquete_experiencia": 52,
        "id_caracteristica": 1
    }
  ]
}
```

**Errores Posibles:**

- 400 Bad Request: El nombre ya existe o la categoría no es válida.
- 500 Internal Server Error: Error en el servidor.

#### Obtener Todos los Paquetes de Experiencia

- **Método:** GET
- **Endpoint:** `/paquete-experiencia`
- **Descripción:** Devuelve una lista con todos los paquetes de experiencia registrados. Las caracteristicas del paquete experiencia puede llegar con una lista vacia.

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
  "fecha_inicio": "2025-03-15T10:00:00Z",
  "fecha_fin": "2025-03-15T10:00:00Z",
  "caracteristicas_paquete_experiencia": [
      {
          "id_caracteristica_paquete_experiencia": 8,
          "id_paquete_experiencia": 52,
          "id_caracteristica": 4
      },
      {
          "id_caracteristica_paquete_experiencia": 9,
          "id_paquete_experiencia": 52,
          "id_caracteristica": 1
      }
    ]
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
    "fecha_inicio": "2025-03-15T10:00:00Z",
    "fecha_fin": "2025-03-15T10:00:00Z",
    "caracteristicas_paquete_experiencia": [
      {
          "id_caracteristica_paquete_experiencia": 8,
          "id_paquete_experiencia": 52,
          "id_caracteristica": 4
      },
      {
          "id_caracteristica_paquete_experiencia": 9,
          "id_paquete_experiencia": 52,
          "id_caracteristica": 1
      }
    ]
  }
]
```


#### Actualizar un Paquete de Experiencia

- **Método:** PUT
- **Endpoint:** `/paquete-experiencia/{id}`
- **Descripción:** Permite actualizar un nuevo de experiencia. Se debe enviar todas las caracteristicas que tiene, por lo tanto todas las del get se quitan o agregan nuevas.
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
  "fecha_experiencia": "2025-03-15T10:00:00Z",
  "fecha_inicio": "2025-03-15T10:00:00Z",
  "fecha_fin": "2025-03-15T10:00:00Z",
  "caracteristicas_paquete_experiencia": [
    {
        "id_paquete_experiencia": 52,
        "id_caracteristica": 4
    },
    {
        "id_paquete_experiencia": 52,
        "id_caracteristica": 1
    }
  ]
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
  "fecha_inicio": "2025-03-15T10:00:00Z",
  "fecha_fin": "2025-03-15T10:00:00Z",
  "caracteristicas_paquete_experiencia": [
    {
        "id_caracteristica_paquete_experiencia": 8,
        "id_paquete_experiencia": 52,
        "id_caracteristica": 4
    },
    {
        "id_caracteristica_paquete_experiencia": 9,
        "id_paquete_experiencia": 52,
        "id_caracteristica": 1
    }
  ]
}
```

#### Obtener un paquete de Experiencia por id

- **Método:** GET
- **Endpoint:** `/paquete-experiencia/{id}`
- **Descripción:** Devuelve el paquete de experiencia solicitado. Si no tiene caracteristicas, esta llega como lista vacia.


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
  "fecha_inicio": "2025-03-15T10:00:00Z",
  "fecha_fin": "2025-03-15T10:00:00Z",
  "caracteristicas_paquete_experiencia": [
    {
        "id_caracteristica_paquete_experiencia": 8,
        "id_paquete_experiencia": 52,
        "id_caracteristica": 4
    },
    {
        "id_caracteristica_paquete_experiencia": 9,
        "id_paquete_experiencia": 52,
        "id_caracteristica": 1
    }
  ],
  "id_categoria": 1
}
```

#### Eliminar un paquete de Experiencia por id

- **Método:** DELETE
- **Endpoint:** `/paquete-experiencia/{id}`
- **Descripción:** Devuelve el paquete de experiencia eliminado. Si no tiene caracteristicas asoaciadas, vuelve una lista vacia.


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
  "fecha_inicio": "2025-03-15T10:00:00Z",
  "fecha_fin": "2025-03-15T10:00:00Z",
  "caracteristicas_paquete_experiencia": [
    {
        "id_caracteristica_paquete_experiencia": 8,
        "id_paquete_experiencia": 52,
        "id_caracteristica": 4
    },
    {
        "id_caracteristica_paquete_experiencia": 9,
        "id_paquete_experiencia": 52,
        "id_caracteristica": 1
    }
  ],
  "id_categoria": 1
}
```

**Errores Posibles:**

- 404 No Found: "mensaje": "Recurso no encontrado:  Paquete de experiencia no encontrado"
- 500 Internal Server Error: Error en el servidor.

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

#### Obtener todas las Categorías

- **Método:** GET
- **Endpoint:** `/categoria`
- **Descripción:** Obtener todas las categoría para clasificar paquetes de experiencia.


**Respuesta Exitosa (200 OK):**
```lista objetos
[
    {
        "id_categoria": 1,
        "nombre": "Aventuras y deportes"
    },
    {
        "id_categoria": 3,
        "nombre": "Comida"
    },
    {
        "id_categoria": 2,
        "nombre": "Gastronomia"
    }
]
```

**Errores Posibles:**
- 500 Internal Server Error: Error en el servidor.

#### Obtener una Categoría

- **Método:** GET
- **Endpoint:** `/categoria/{id}`
- **Descripción:** Obtener una categoría para clasificar paquetes de experiencia. `Es necesario que exista la categoría para poder crear un paquete de experiencia`


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

#### Eliminar una Categoría

- **Método:** DELETE
- **Endpoint:** `/categoria/{id}`
- **Descripción:** Eliminar una categoría para clasificar paquetes de experiencia.

**Respuesta Exitosa (200 OK):**
```json
{
    "id_categoria": 2,
    "nombre": "Comida"
}
```

**Errores Posibles:**
- 404 Bad Request: La categoría no existe.
- 500 Internal Server Error: Error en el servidor.

#### Editar una Categoría

- **Método:** PUT
- **Endpoint:** `/categoria/{id}`
- **Descripción:** Editar una categoría para clasificar paquetes de experiencia.


**Respuesta Exitosa (200 OK):**
```json
{
"idCategoria": 1,
"nombre": "Comida"
}
```

### Caracteristica

#### Crear una caracteristica

- **Método:** POST
- **Endpoint:** `/caracteristica`
- **Descripción:** Crea una nueva caracteristica para agregar a los paquetes de experiencia. `Es necesario que exista la categoría para poder crear un paquete de experiencia`

- **Request Body:**

```json
  {
    "nombre": "wifi",
    "logo": 2
  }
```
**Respuesta Exitosa (200 OK):**
```json
{
  "nombre": "wifi",
  "logo": 2
}
```

**Errores Posibles:**
- 400 Bad Request: La caracteristica ya existe.
- 500 Internal Server Error: Error en el servidor.

#### Obtener todas las Caracteristicas

- **Método:** GET
- **Endpoint:** `/caracteristica`
- **Descripción:** Obtener todas las caracteristicas que tienen los paquetes de experiencia.


**Respuesta Exitosa (200 OK):**
```
[
    {
        "id": 1,
        "nombre": "wifi",
        "logo": "3"
    },
    {
        "id": 2,
        "nombre": "comida",
        "logo": "2"
    }
]
```

**Errores Posibles:**
- 500 Internal Server Error: Error en el servidor.

#### Obtener una Caracteristica

- **Método:** GET
- **Endpoint:** `/caracteristica/{id}`
- **Descripción:** Obtener una caracteristica para agregar para el paquetes de experiencia. `Es necesario que exista la categoría para poder crear un paquete de experiencia`


**Respuesta Exitosa (200 OK):**
```json
{
  "id": 6,
  "nombre": "wifi",
  "logo": "2"
}
```

**Errores Posibles:**
- 400 Bad Request: La caracteristica ya existe.
- 500 Internal Server Error: Error en el servidor.

#### Eliminar una Categoría

- **Método:** DELETE
- **Endpoint:** `/categoria/{id}`
- **Descripción:** Eliminar una caracteristica no correspondiente para el paquetes de experiencia.

**Respuesta Exitosa (200 OK):**
```json
{
    "id": 6,
    "nombre": "wifi",
    "logo": "2"
}
```

**Errores Posibles:**
- 404 Bad Request: La caractristica no existe.
- 500 Internal Server Error: Error en el servidor.

#### Editar una Caracteristica

- **Método:** PUT
- **Endpoint:** `/caracteristica/{id}`
- **Descripción:** Editar una caracteristica para agregar o eliminar en el paquetes de experiencia.

- **Request Body:**

```json
{
  "nombre": "wifi",
  "logo": 3
}
```


**Respuesta Exitosa (200 OK):**
```json
{
  "id": 6,
  "nombre": "wifi",
  "logo": "3"
}
```

### Consideraciones Generales
- Todas las fechas deben estar en formato ISO 8601 (YYYY-MM-DDTHH:MM:SSZ).
- Precio debe ser un valor numérico positivo.
- La ubicacion, imagen, duracion y descripcion son opcionales pero recomendados para una mejor experiencia del usuario.

#### Obtener Paquetes de Experiencia por Filtro

- **Método:** GET
- **Endpoint:** `/paquete-experiencia/filtro`
- **Descripción:** Devuelve una lista de paquetes de experiencia que coinciden con los filtros proporcionados. También puede ser utilizado para obtener las predicciones.


- **Parámetros de Consulta:**
  - `nombre` (opcional): Filtra los paquetes por nombre. Se puede usar una parte del nombre.
  - `fecha_inicio` (opcional): Filtra los paquetes que tienen una fecha de experiencia mayor o igual a esta fecha. Formato: `yyyy-MM-dd`.
  - `fecha_fin` (opcional): Filtra los paquetes que tienen una fecha de experiencia menor o igual a esta fecha. Formato: `yyyy-MM-dd`.


- **Respuesta Exitosa (200 OK):**

```json
[
  {
    "id_paquete_experiencia": 1,
    "nombre": "Aventura en la Montaña",
    "descripcion": "Un día completo de senderismo y escalada.",
    "precio": 150.00,
    "ubicacion": "Andes, Chile",
    "imagen": "https://example.com/imagen.jpg",
    "duracion": "8 horas",
    "fecha_experiencia": "2025-03-15T10:00:00Z",
    "id_categoria": 1
  }
]
```
**Errores Posibles:**

- 500 Internal Server Error: Error en el servidor.

# API de Autenticación

## Base URL

La URL base para la API es:
http://localhost:8080/api/auth

## Endpoints

### Usuario

#### Registrar un usuario
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


#### Inicio de Sesión
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

#### Cierre de Sesión
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

#### Editar un usuario
- **Método:** PUT
- **Endpoint:** `/auth/{id}`
- **Headers:** `Authorization: Bearer {token}` superadministrador, administrador o el mismo usuario logueado
- **Descripción:** Permite actualizar un usuario
- **Request Body:**
```json
{
  "nombre": "Nombre cliente3",
  "email": "cliente3@ejemplo.com",
  "contrasena": "Password123",
  "telefono": 587653313,
  "direccion": "Av. 2Ejemplo 1233, Ciudad",
  "id_rol": 2
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "id_usuario": 6,
  "nombre": "Nombre cliente3",
  "email": "cliente3@ejemplo.com",
  "telefono": 587653313,
  "direccion": "Av. 2Ejemplo 1233, Ciudad",
  "fechaRegistro": "2025-03-03T04:55:24.111+00:00",
  "id_rol": 2
}
```
**Errores Posibles:**

- 404 No Found: "mensaje": "Recurso no encontrado: Usuario no encontrado"
- 500 Internal Server Error: Error en el servidor.


#### Editar solo un campo de un usuario
- **Método:** PATCH
- **Endpoint:** `/auth/{id}`
- **Headers:** `Authorization: Bearer {token}` superadministrador o administrador
- **Descripción:** Permite actualizar un usuario en un campo
- **Request Body:**
```json
{
  "id_rol": 1
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "id_usuario": 6,
  "nombre": "Nombre cliente3",
  "email": "cliente3@ejemplo.com",
  "telefono": 587653313,
  "direccion": "Av. 2Ejemplo 1233, Ciudad",
  "fechaRegistro": "2025-03-03T04:55:24.111+00:00",
  "id_rol": 2
}
```

#### Eliminar un usuario
- **Método:** DELETE
- **Endpoint:** `/auth/{id}`
- **Headers:** `Authorization: Bearer {token}` superadministrador o administrador
- **Descripción:** Permite eliminar un usuario
- **Request Body:**

**Respuesta Exitosa (200 OK):**
```json
{
  "id_usuario": 6,
  "nombre": "Nombre cliente3",
  "email": "cliente3@ejemplo.com",
  "telefono": 587653313,
  "direccion": "Av. 2Ejemplo 1233, Ciudad",
  "fechaRegistro": "2025-03-03T04:55:24.111+00:00",
  "id_rol": 2
}
```
**Errores Posibles:**

- 404 No Found: "mensaje": "Recurso no encontrado: Usuario no encontrado"
- 500 Internal Server Error: Error en el servidor.

#### Obtener un usuario
- **Método:** GET
- **Endpoint:** `/auth/{id}`
- **Headers:** `Authorization: Bearer {token}` superadministradoro, administrador o el usuario autenticado
- **Descripción:** Permite obtener datos de un usuario
- **Request Body:**

**Respuesta Exitosa (200 OK):**
```json
{
  "id_usuario": 6,
  "nombre": "Nombre cliente3",
  "email": "cliente3@ejemplo.com",
  "telefono": 587653313,
  "direccion": "Av. 2Ejemplo 1233, Ciudad",
  "fechaRegistro": "2025-03-03T04:55:24.111+00:00",
  "id_rol": 2
}
```
**Errores Posibles:**

- 404 No Found: "mensaje": "Recurso no encontrado:  Usuario no encontrado"
- 500 Internal Server Error: Error en el servidor.

#### Obtener todos los usuarios
- **Método:** GET
- **Endpoint:** `/auth`
- **Headers:** `Authorization: Bearer {token}` superadministrador o administrador
- **Descripción:** Permite obtener datos de todos los usuarios
- **Request Body:**

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "id_usuario": 1,
    "nombre": "Nombre Usuario",
    "email": "usuario@ejemplo.com",
    "telefono": 987654321,
    "direccion": "Av. Ejemplo 123, Ciudad",
    "fechaRegistro": "2025-02-28T04:17:12.060+00:00",
    "id_rol": 1
  },
  {
    "id_usuario": 2,
    "nombre": "Nombre superadmin",
    "email": "superadmin@ejemplo.com",
    "telefono": 987654321,
    "direccion": "Av. Ejemplo 123, Ciudad",
    "fechaRegistro": "2025-03-03T04:25:21.860+00:00",
    "id_rol": 3
  },
  {
    "id_usuario": 6,
    "nombre": "Nombre cliente3",
    "email": "cliente3@ejemplo.com",
    "telefono": 587653313,
    "direccion": "Av. 2Ejemplo 1233, Ciudad",
    "fechaRegistro": "2025-03-03T04:55:24.111+00:00",
    "id_rol": 2
  }
]
```
**Errores Posibles:**

- 404 No Found: "mensaje": "Recurso no encontrado: Usuario no encontrado"
- 500 Internal Server Error: Error en el servidor.

#### Obtener todos los favoritos de un usuario
- **Método:** GET
- **Endpoint:** `/auth/{id_usuario}/favoritos`
- **Headers:** `Authorization: Bearer {token}` superadministrador o administrador
- **Descripción:** Permite obtener datos de todos los favoritos de un usuario
- **Request Body:**

**Respuesta Exitosa (200 OK):**
```json
[
    {
        "id_favorito": 1,
        "id_paquete_experiencia": 1,
        "id_usuario": 1
    },
    {
        "id_favorito": 4,
        "id_paquete_experiencia": 3,
        "id_usuario": 1
    }
]
```
**Errores Posibles:**

- 500 Internal Server Error: Error en el servidor.

#### Obtener el favorito de un usuario apartir del paquete de experiencia
- **Método:** GET
- **Endpoint:** `/auth/{id_usuario}/favoritos/{id_paquete_experiencia}`
- **Headers:** `Authorization: Bearer {token}` superadministrador o administrador
- **Descripción:** Permite obtener datos de todos los favoritos de un usuario

**Respuesta Exitosa (200 OK):**
```json
{
    "id_favorito": 4,
    "id_paquete_experiencia": 3,
    "id_usuario": 1
}
```
**Errores Posibles:**

- 404 No Found: "mensaje": "Recurso no encontrado:  Usuario no encontrado"
- 500 Internal Server Error: Error en el servidor.

#### Agregar un favorito
- **Método:** Post
- **Endpoint:** `/auth/{id_usuario}/favoritos/{id_paquete_experiencia}`
- **Descripción:** Permite agregar un favorito a un usuario y paquete de experiencia

**Respuesta Exitosa (201 Created):**
```json
{
    "id_favorito": 5,
    "id_paquete_experiencia": 4,
    "id_usuario": 1
}
```

**Errores Posibles:**
- 400 Bad Request: Error: El email ya está en uso. / Error: El rol es requerido
- 500 Internal Server Error: Error en el servidor.

#### Remover un favorito
- **Método:** Delete
- **Endpoint:** `/auth/{id_usuario}/favoritos/{id_paquete_experiencia}`
- **Descripción:** Permite eliminar un favorito a un usuario y paquete de experiencia

**Respuesta Exitosa (200 ok):**
```json
{
    "id_favorito": 5,
    "id_paquete_experiencia": 4,
    "id_usuario": 1
}
```

**Errores Posibles:**
- 400 Bad Request: Error: El email ya está en uso. / Error: El rol es requerido
- 500 Internal Server Error: Error en el servidor.

  **Notas:**
- El token JWT generado tiene un tiempo de expiración.
- Para acceder a recursos protegidos, se debe incluir el token en el header de autorización:
CopyAuthorization: Bearer {token}
- La seguridad está implementada mediante Spring Security y JWT.

#### Obtener todos las calificaciones de un usuario
- **Método:** GET
- **Endpoint:** `/auth/{id_usuario}/calificaciones`
- **Descripción:** Permite obtener datos de todos las calificaciones de un usuario
- **Request Body:**

**Respuesta Exitosa (200 OK):**
```json

[
    {
        "id": 1,
        "puntuacion": 5,
        "comentario": "Super experiencia",
        "fecha_calificacion": "2025-03-30T10:00:00.000+00:00",
        "id_reserva": 1,
        "id_usuario": 2
    },
    {
        "id": 2,
        "puntuacion": 5,
        "comentario": "Super experiencia",
        "fecha_calificacion": "2025-03-30T10:00:00.000+00:00",
        "id_reserva": 3,
        "id_usuario": 2
    },
    {
        "id": 3,
        "puntuacion": 5,
        "comentario": "Super experiencia",
        "fecha_calificacion": "2025-03-30T10:00:00.000+00:00",
        "id_reserva": 1,
        "id_usuario": 2
    }
]
```
**Errores Posibles:**

- 500 Internal Server Error: Error en el servidor.

#### Obtener la calificación de un usuario apartir de la calificación
- **Método:** GET
- **Endpoint:** `/auth/{id_usuario}/calificaciones/{id_calificacion}`
- **Descripción:** Permite obtener los datos de una calificación

**Respuesta Exitosa (200 OK):**
```json
{
  "id": 3,
  "puntuacion": 5,
  "comentario": "Super experiencia",
  "fecha_calificacion": "2025-03-30T10:00:00.000+00:00",
  "id_reserva": 1,
  "id_usuario": 2
}
```
**Errores Posibles:**

- 404 No Found: "mensaje": "Recurso no encontrado:  Usuario no encontrado"
- 500 Internal Server Error: Error en el servidor.

#### Agregar una calificación
- **Método:** Post
- **Endpoint:** `/auth/{id_usuario}/reservas/{id_paquete_experiencia}/calificaciones`
- **Descripción:** Permite agregar una calificación de un usuario y paquete de experiencia

- **Request Body:**

```json
{
  "puntuacion": 5,
  "comentario": "Super experiencia",
  "fecha_calificacion": "2025-04-03T10:00:00"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "id": 4,
  "puntuacion": 5,
  "comentario": "Super experiencia",
  "fecha_calificacion": "2025-03-30T10:00:00.000+00:00",
  "id_reserva": 4,
  "id_usuario": 2
}
```

**Errores Posibles:**
- 400 Bad Request: Error: El email ya está en uso. / Error: El rol es requerido
- 500 Internal Server Error: Error en el servidor.

#### Remover una calificación
- **Método:** Delete
- **Endpoint:** `/auth/{id_usuario}/calificaciones/{id_calificacion}`
- **Descripción:** Permite eliminar una calificación a un usuario y paquete de experiencia

**Respuesta Exitosa (200 ok):**
```json
{
  "id": 4,
  "puntuacion": 5,
  "comentario": "Super experiencia",
  "fecha_calificacion": "2025-03-30T10:00:00.000+00:00",
  "id_reserva": 4,
  "id_usuario": 2
}
```

**Errores Posibles:**
- 400 Bad Request: Error: El email ya está en uso. / Error: El rol es requerido
- 500 Internal Server Error: Error en el servidor.

  **Notas:**
- El token JWT generado tiene un tiempo de expiración.
- Para acceder a recursos protegidos, se debe incluir el token en el header de autorización:
CopyAuthorization: Bearer {token}
- La seguridad está implementada mediante Spring Security y JWT.



### Reserva

#### Crear una Reserva

- **Método:** POST
- **Endpoint:** `/reservas`
- **Descripción:** Permite crear una nueva reseva.
- **Request Body:**

```json
{
  "idUsuario": 2,
  "idPaqueteExperiencia": 3,
  "fecha_inicio": "2025-04-04T10:00:00",
  "fecha_fin": "2025-04-05T10:00:00"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "idReserva": 8,
  "idUsuario": 2,
  "idPaqueteExperiencia": 3,
  "fecha_inicio": "2025-04-04T10:00:00.000+00:00",
  "fecha_fin": "2025-04-05T10:00:00.000+00:00"
}
```

#### Obtener Todas las reservas 

- **Método:** GET
- **Endpoint:** `/reservas`
- **Descripción:** Devuelve todas las reservas.

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "idReserva": 1,
    "idUsuario": 2,
    "idPaqueteExperiencia": 1,
    "fecha_inicio": "2025-03-27T10:00:00.000+00:00",
    "fecha_fin": "2025-03-28T10:00:00.000+00:00"
  },
  {
    "idReserva": 2,
    "idUsuario": 3,
    "idPaqueteExperiencia": 1,
    "fecha_inicio": "2025-03-29T10:00:00.000+00:00",
    "fecha_fin": "2025-03-30T10:00:00.000+00:00"
  },
  {
    "idReserva": 3,
    "idUsuario": 3,
    "idPaqueteExperiencia": 1,
    "fecha_inicio": "2025-03-29T10:00:00.000+00:00",
    "fecha_fin": "2025-03-30T10:00:00.000+00:00"
  },
  {
    "idReserva": 4,
    "idUsuario": 2,
    "idPaqueteExperiencia": 2,
    "fecha_inicio": "2025-03-28T10:00:00.000+00:00",
    "fecha_fin": "2025-03-30T10:00:00.000+00:00"
  }
]
```

#### Obtener la reservas por id

- **Método:** GET
- **Endpoint:** `/reservas/{id}`
- **Descripción:** Devuelve la reserva con ese id.

**Respuesta Exitosa (200 OK):**
```json
{
  "idReserva": 3,
  "idUsuario": 3,
  "idPaqueteExperiencia": 1,
  "fecha_inicio": "2025-03-29T10:00:00.000+00:00",
  "fecha_fin": "2025-03-30T10:00:00.000+00:00"
}
```
#### Obtener la reservas por usuario

- **Método:** GET
- **Endpoint:** `/reservas/usuario/{usuarioId}`
- **Descripción:** Devuelve la reserva de ese usuario.

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "idReserva": 9,
    "idUsuario": 1,
    "idPaqueteExperiencia": 3,
    "fecha_inicio": "2025-04-04T10:00:00.000+00:00",
    "fecha_fin": "2025-04-05T10:00:00.000+00:00"
  },
  {
    "idReserva": 10,
    "idUsuario": 1,
    "idPaqueteExperiencia": 2,
    "fecha_inicio": "2025-04-04T10:00:00.000+00:00",
    "fecha_fin": "2025-04-05T10:00:00.000+00:00"
  }
]
```

#### Obtener la reservas por paquete 

- **Método:** GET
- **Endpoint:** `/reservas/paquete/{paqueteId}`
- **Descripción:** Devuelve la reserva de ese paquete.

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "idReserva": 4,
    "idUsuario": 2,
    "idPaqueteExperiencia": 2,
    "fecha_inicio": "2025-03-28T10:00:00.000+00:00",
    "fecha_fin": "2025-03-30T10:00:00.000+00:00"
  },
  {
    "idReserva": 10,
    "idUsuario": 1,
    "idPaqueteExperiencia": 2,
    "fecha_inicio": "2025-04-04T10:00:00.000+00:00",
    "fecha_fin": "2025-04-05T10:00:00.000+00:00"
  }
]
```

#### Obtener la disponibilidad de paquete de experiencia (Aun no funciona del todo bien)

- **Método:** GET
- **Endpoint:** `/reservas/fechas-disponibles/{paqueteId}`
- **Descripción:** Devuelve una lista de sring con las fechas disponibles.

**Respuesta Exitosa (200 OK):**
```json
[
  "2025-03-31",
  "2025-04-01"
]
```
#### Obtener los detalles de la reserva, el paquete de experiencia y el usuario

- **Método:** GET
- **Endpoint:** `/reservas/detalle/{reservaId}`
- **Descripción:** Devuelve los detalles de la reserva.

**Respuesta Exitosa (200 OK):**
```json
{
  "idReserva": 2,
  "nombreUsuario": "Xplora Superadmin",
  "nombrePaquete": "Paseo en kayak",
  "descripcionPaquete": "Navega en kayak frente a uno de los glaciares más famosos. Embárcate en una aventura inolvidable con nuestro paseo en kayak, donde la serenidad del agua se fusiona con la emoción de la exploración. Deslízate suavemente por paisajes impresionantes, ya sea un tranquilo lago rodeado de montañas, un río serpenteante a través de exuberante vegetación o la costa marina con vistas espectaculares. Siente la libertad de remar a tu propio ritmo, descubriendo rincones ocultos y conectando con la naturaleza de una manera única. Nuestros guías expertos te acompañarán, asegurando una experiencia segura y enriquecedora, mientras compartes la belleza del entorno con amigos, familiares o en solitario.",
  "duracionPaquete": "3 horas",
  "precioPaquete": 120.0,
  "ubicacionPaquete": "Buenos Aires, Argentina"
}
```

