-- -----------------------------------------------------
-- Schema Xplora_bd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS Xplora_bd;
SET SCHEMA Xplora_bd;

-- -----------------------------------------------------
-- Table Categoria
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Categoria (
  id_Categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45)
);

-- -----------------------------------------------------
-- Table PaqueteExperiencia
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PaqueteExperiencia (
  id_PaqueteExperiencia INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45) NOT NULL,
  descripcion VARCHAR(45),
  precio DECIMAL,
  ubicacion VARCHAR(45),
  imagen_url TEXT,
  duracion TEXT,
  fecha_experiencia TIMESTAMP,
  PaqueteExperienciacol VARCHAR(45),
  id_Categoria INT NOT NULL,
  FOREIGN KEY (id_Categoria) REFERENCES Categoria (id_Categoria)
);

-- -----------------------------------------------------
-- Table Pedido
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Pedido (
  id_Pedido INT AUTO_INCREMENT PRIMARY KEY,
  estado VARCHAR(45),
  esRegalo BOOLEAN,
  total DECIMAL,
  id_PaqueteExperiencia INT NOT NULL,
  FOREIGN KEY (id_PaqueteExperiencia) REFERENCES PaqueteExperiencia (id_PaqueteExperiencia)
);

-- -----------------------------------------------------
-- Table MetodoPago
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS MetodoPago (
  id_MetodoPago INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45)
);

-- -----------------------------------------------------
-- Table Pago
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Pago (
  id_Pago INT AUTO_INCREMENT PRIMARY KEY,
  monto DECIMAL,
  estado VARCHAR(45),
  id_Pedido INT NOT NULL,
  id_MetodoPago INT NOT NULL,
  FOREIGN KEY (id_Pedido) REFERENCES Pedido (id_Pedido),
  FOREIGN KEY (id_MetodoPago) REFERENCES MetodoPago (id_MetodoPago)
);

-- -----------------------------------------------------
-- Table Rol
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Rol (
  id_Rol INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45)
);

-- -----------------------------------------------------
-- Table Usuario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Usuario (
  id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45),
  email VARCHAR(45),
  contrasenia VARCHAR(45),
  telefono INT,
  direccion VARCHAR(45),
  fecha_registro TIMESTAMP,
  id_Rol INT NOT NULL,
  FOREIGN KEY (id_Rol) REFERENCES Rol (id_Rol)
);

-- -----------------------------------------------------
-- Table Usuario_pedido
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Usuario_pedido (
  id_Usuario_pedido INT AUTO_INCREMENT PRIMARY KEY,
  fecha_pedido TIMESTAMP,
  id_Usuario INT NOT NULL,
  id_Pedido INT NOT NULL,
  FOREIGN KEY (id_Usuario) REFERENCES Usuario (id_Usuario),
  FOREIGN KEY (id_Pedido) REFERENCES Pedido (id_Pedido)
);

-- -----------------------------------------------------
-- Table Regalo
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Regalo (
  id_Regalo INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(45),
  mensaje TEXT,
  id_Pedido INT NOT NULL,
  FOREIGN KEY (id_Pedido) REFERENCES Pedido (id_Pedido)
);
