use xplora_db;

INSERT INTO categoria (nombre) VALUES
    ('Aventuras y deportes'),
    ('Gastronomia'),
    ('Estadias');

INSERT INTO paquete_experiencia (nombre, descripcion, precio, ubicacion, imagen, duracion, fecha_experiencia, id_categoria) VALUES
    ('Rafting en el río', 'Aventura extrema en aguas rápidas', 150.00, 'Mendoza, Argentina', 'imagen1.jpg', '4 horas', NOW(), 1),
    ('Cena gourmet', 'Experiencia culinaria exclusiva', 120.00, 'Buenos Aires, Argentina', 'imagen2.jpg', '3 horas', NOW(), 2),
    ('Noche en cabaña', 'Escapada romántica en la montaña', 200.00, 'Bariloche, Argentina', 'imagen3.jpg', '1 noche', NOW(),  3);

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