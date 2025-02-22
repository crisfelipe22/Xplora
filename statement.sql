use xplora_db;

INSERT INTO categoria (nombre) VALUES
    ('Aventuras y deportes'),
    ('Gastronomia'),
    ('Estadias');

INSERT INTO paquete_experiencia (id_paquete_experiencia, nombre, descripcion, precio, ubicacion, imagen, duracion, fecha_experiencia, id_categoria) VALUES
    (1, 'Spa de Lujo', 'Aventura extrema en aguas rápidas', 150.00, 'Mendoza, Argentina', '/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg', '4 horas', NOW(), 1),
    (2, 'Paseo en kayak', 'Navega en kaya frente a uno de los glaciares más famosos', 120.00, 'Buenos Aires, Argentina', '/imagen_2.jpeg,/imagen_3.jpeg,/imagen_4.jpeg,/imagen_5.jpeg,/imagen_6.jpeg', '3 horas', NOW(), 2),
    (3, 'Noche en cabaña', 'Escapada romántica en la montaña', 200.00, 'Bariloche, Argentina', '/imagen_8.jpeg', '1 noche', NOW(),  3),
    (4, 'Parapente en la montaña', 'Vuela sobre los Andes y disfruta de vistas panorámicas', 150.00, 'Mendoza, Argentina', '/imagen_88.jpeg', '4 horas', NOW(), 1),
    (5, 'Tour de vinos premium', 'Cata exclusiva en viñedos históricos', 120.00, 'Buenos Aires, Argentina', '/imagen_9.jpeg', '3 horas', NOW(), 2),
    (6, 'Aventura en glamping', 'Noche de lujo en una tienda bajo las estrellas', 200.00, 'Bariloche, Argentina', '/imagen_10.jpeg', '1 noche', NOW(), 3),
    (7, 'Rafting en aguas blancas', 'Descenso extremo por rápidos clase III y IV', 150.00, 'Mendoza, Argentina', '/imagen_11.jpeg', '4 horas', NOW(), 1),
    (8, 'Experiencia gastronómica fusión', 'Menú degustación con maridaje en restaurante de autor', 120.00, 'Buenos Aires, Argentina', '/imagen_12.jpeg', '3 horas', NOW(), 2),
    (9, 'Refugio alpino exclusivo', 'Hospedaje en cabaña con chimenea y vistas al lago', 200.00, 'Bariloche, Argentina', '/imagen_13.jpeg', '1 noche', NOW(), 3),
    (10, 'Buceo en aguas cristalinas', 'Explora arrecifes y vida marina en un entorno único', 150.00, 'Mendoza, Argentina', '/imagen_14.jpeg', '4 horas', NOW(), 1),
    (11, 'Taller de cocina internacional', 'Aprende técnicas de chefs expertos en un entorno exclusivo', 120.00, 'Buenos Aires, Argentina', '/imagen_15.jpeg', '3 horas', NOW(), 2),
    (12, 'Campamento en la nieve', 'Vive la aventura de dormir en la montaña nevada', 200.00, 'Bariloche, Argentina', '/imagen_16.jpeg', '1 noche', NOW(), 3);


INSERT INTO pedido (estado, es_regalo, total, id_paquete_experiencia) VALUES
    ('Confirmado', FALSE, 150.00, 1),
    ('Pendiente', TRUE, 120.00, 2),
    ('Completado', FALSE, 200.00, 3);

INSERT INTO metodo_pago (nombre) VALUES
    ('Tarjeta de crédito'),
    ('PayPal'),
    ('Transferencia bancaria');

INSERT INTO pago (monto, estado, id_pedido, id_metodo_pago) VALUES
    (150.00, 'Aprobado', 1, 1),
    (120.00, 'Pendiente', 2, 2),
    (200.00, 'Aprobado', 3, 3);