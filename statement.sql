use xplora_db;

INSERT INTO categoria (nombre) VALUES
    ('Aventuras y deportes'),
    ('Gastronomia'),
    ('Estadias'),
    ('Bienestar y relajación'),
    ('Cultura y entretenimiento'),
    ('Naturaleza y ecoturismo'),
    ('Experiencias urbanas'),
    ('Romanticismo y arte');

INSERT INTO rol (id_rol, nombre) VALUES
    (1, 'SuperAdministrador'),
    (2, 'Administrador'),
    (3, 'Usuario');

INSERT INTO usuario (id_usuario, nombre, direccion, contrasena, telefono, id_rol, email) VALUES
    (1, 'Xplora Superadmin', 'Xplora Boulevard 123', '$2a$10$svyGvq1UnKdQNMNMc8/Nwep9WbyCJjNyDHvfs2wezPJgeC6TwPMcm', 12345678,1,'superadmin@xplora.com'),
    (2, 'Xplora Admin', 'Xplora Boulevard 123', '$2a$10$d8celupi88HCw5E07LAXeu9MBYKPDBpiNtgPxCvhstDN4CyXdSWxi', 12345678,2,'admin@xplora.com'),
    (3, 'Xplora Usuario', 'Xplora Boulevard 123', '$2a$10$bixazDGCVrXkoCtSkrzkle3uCyzUCHvkC3a0aYkZWxSBN5HBlbhLa', 12345678,3,'usuario@xplora.com');

INSERT INTO paquete_experiencia (id_paquete_experiencia, nombre, descripcion, precio, ubicacion, imagen, duracion, fecha_inicio, fecha_fin, id_categoria) VALUES
    (1, 'Spa de lujo', 'Regálate un momento de puro bienestar. Escápate del estrés y revitaliza tu cuerpo y mente con nuestra exclusiva experiencia.', 150.00, 'Mendoza, Argentina', '/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg', '4 horas', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 1),
    (2, 'Paseo en kayak', 'Navega en kayak frente a uno de los glaciares más famosos. Embárcate en una aventura inolvidable con nuestro paseo en kayak.', 120.00, 'Buenos Aires, Argentina', '/imagen_2.jpeg,/imagen_3.jpeg,/imagen_4.jpeg,/imagen_5.jpeg,/imagen_6.jpeg', '3 horas', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 2),
    (3, 'Noche en cabaña', 'Escapada romántica en la montaña. Escápate a la serenidad de las montañas y sumérgete en una experiencia de tranquilidad inigualable.', 200.00, 'Bariloche, Argentina', '/imagen_8.jpeg', '1 noche', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 3),
    (4, 'Parapente en la montaña', 'Vuela sobre los Andes y disfruta de vistas panorámicas. Siente la adrenalina y la libertad de volar como un pájaro.', 150.00, 'Mendoza, Argentina', '/imagen_88.jpeg', '4 horas', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 1),
    (5, 'Tour de vinos premium', 'Cata exclusiva en viñedos históricos. Sumérgete en el mundo del vino con nuestro exclusivo tour en un viñedo premium.', 120.00, 'Buenos Aires, Argentina', '/imagen_9.jpeg', '3 horas', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 2),
    (6, 'Aventura en glamping', 'Noche de lujo en una tienda bajo las estrellas. Sumérgete en la naturaleza sin renunciar al confort con nuestra experiencia.', 200.00, 'Bariloche, Argentina', '/imagen_10.jpeg', '1 noche', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 3),
    (7, 'Rafting en aguas blancas', 'Descenso extremo por rápidos clase III y IV. Siente la descarga de adrenalina con nuestra experiencia de rafting.', 150.00, 'Mendoza, Argentina', '/imagen_11.jpeg', '4 horas', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 1),
    (8, 'Experiencia gastronómica fusión', 'Menú degustación con maridaje en restaurante de autor. Embárcate en un viaje culinario sin fronteras.', 120.00, 'Buenos Aires, Argentina', '/imagen_12.jpeg', '3 horas', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 2),
    (9, 'Refugio alpino exclusivo', 'Hospedaje en cabaña con chimenea y vistas al lago. Escápate a la cumbre de la exclusividad.', 200.00, 'Bariloche, Argentina', '/imagen_13.jpeg', '1 noche', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 3),
    (10, 'Buceo en aguas cristalinas', 'Explora arrecifes y vida marina en un entorno único. Sumérgete en un mundo submarino de ensueño.', 150.00, 'Mendoza, Argentina', '/imagen_14.jpeg', '4 horas', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 1),
    (11, 'Taller de cocina internacional', 'Aprende técnicas de chefs expertos en un entorno exclusivo. Sumérgete en un viaje culinario global.', 120.00, 'Buenos Aires, Argentina', '/imagen_15.jpeg', '3 horas', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 2),
    (12, 'Campamento en la nieve', 'Vive la aventura de dormir en la montaña nevada. Atrévete a vivir una aventura invernal inolvidable.', 200.00, 'Bariloche, Argentina', '/imagen_16.jpeg', '1 noche', @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 3);


INSERT INTO pedido (estado, es_regalo, total, id_paquete_experiencia) VALUES
    ('Confirmado', FALSE, 150.00, 1),
    ('Pendiente', TRUE, 120.00, 2),
    ('Completado', FALSE, 200.00, 3);

-- INSERT INTO metodo_pago (nombre) VALUES
--     ('Tarjeta de crédito'),
--     ('PayPal'),
--     ('Transferencia bancaria');

-- INSERT INTO pago (monto, estado, id_pedido, id_metodo_pago) VALUES
--     (150.00, 'Aprobado', 1, 1),
--     (120.00, 'Pendiente', 2, 2),
--     (200.00, 'Aprobado', 3, 3);