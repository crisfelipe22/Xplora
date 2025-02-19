-- -----------------------------------------------------
-- Schema Xplora_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `xplora_db` DEFAULT CHARACTER SET utf8;
USE `xplora_db`;

-- -----------------------------------------------------
-- Table `xplora_db`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `xplora_db`.`paquete_experiencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`paquete_experiencia` (
  `id_paquete_experiencia` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `precio` DECIMAL NULL,
  `ubicacion` VARCHAR(45) NULL,
  `imagen_url` TEXT NULL,
  `duracion` TEXT NULL,
  `fecha_experiencia` DATETIME NULL,
  `paquete_experiencia_col` VARCHAR(45) NULL,  -- Considera un nombre más descriptivo
  `id_categoria` INT NOT NULL,
  PRIMARY KEY (`id_paquete_experiencia`),
  INDEX `fk_paquete_experiencia_categoria_idx` (`id_categoria` ASC),
  CONSTRAINT `fk_paquete_experiencia_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `xplora_db`.`categoria` (`id_categoria`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `xplora_db`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`pedido` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NULL,
  `es_regalo` TINYINT NULL,
  `total` DECIMAL NULL,
  `id_paquete_experiencia` INT NOT NULL,
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_pedido_paquete_experiencia_idx` (`id_paquete_experiencia` ASC),
  CONSTRAINT `fk_pedido_paquete_experiencia`
    FOREIGN KEY (`id_paquete_experiencia`)
    REFERENCES `xplora_db`.`paquete_experiencia` (`id_paquete_experiencia`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `xplora_db`.`metodo_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`metodo_pago` (
  `id_metodo_pago` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id_metodo_pago`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `xplora_db`.`pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`pago` (
  `id_pago` INT NOT NULL AUTO_INCREMENT,
  `monto` DECIMAL NULL,
  `estado` VARCHAR(45) NULL,
  `id_pedido` INT NOT NULL,
  `id_metodo_pago` INT NOT NULL,
  PRIMARY KEY (`id_pago`),
  INDEX `fk_pago_pedido_idx` (`id_pedido` ASC),
  INDEX `fk_pago_metodo_pago_idx` (`id_metodo_pago` ASC),
  CONSTRAINT `fk_pago_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `xplora_db`.`pedido` (`id_pedido`),
  CONSTRAINT `fk_pago_metodo_pago`
    FOREIGN KEY (`id_metodo_pago`)
    REFERENCES `xplora_db`.`metodo_pago` (`id_metodo_pago`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `xplora_db`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `xplora_db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `contrasenia` VARCHAR(45) NULL,
  `telefono` INT NULL,
  `direccion` VARCHAR(45) NULL,
  `fecha_registro` DATETIME NULL,
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuario_rol_idx` (`id_rol` ASC),
  CONSTRAINT `fk_usuario_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `xplora_db`.`rol` (`id_rol`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `xplora_db`.`usuario_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`usuario_pedido` (
  `id_usuario_pedido` INT NOT NULL AUTO_INCREMENT,
  `fecha_pedido` DATETIME NULL,
  `id_usuario` INT NOT NULL,
  `id_pedido` INT NOT NULL,
  PRIMARY KEY (`id_usuario_pedido`),
  INDEX `fk_usuario_pedido_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_usuario_pedido_pedido_idx` (`id_pedido` ASC),
  CONSTRAINT `fk_usuario_pedido_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `xplora_db`.`usuario` (`id_usuario`),
  CONSTRAINT `fk_usuario_pedido_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `xplora_db`.`pedido` (`id_pedido`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `xplora_db`.`regalo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `xplora_db`.`regalo` (
  `id_regalo` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `mensaje` TEXT NULL,
  `id_pedido` INT NOT NULL,
  PRIMARY KEY (`id_regalo`),
  INDEX `fk_regalo_pedido_idx` (`id_pedido` ASC),
  CONSTRAINT `fk_regalo_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `xplora_db`.`pedido` (`id_pedido`)
) ENGINE = InnoDB;

SHOW TABLES;

COMMIT;
