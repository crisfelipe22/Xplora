use xplora_db;

INSERT INTO categoria (nombre, descripcion) VALUES
    ('Aventuras y deportes', 'Actividades emocionantes al aire libre y deportes extremos para los amantes de la adrenalina.'),
    ('Gastronomia', 'Experiencias culinarias que incluyen degustaciones, clases de cocina y cenas especiales.'),
    ('Estadias', 'Alojamientos únicos y escapadas en hoteles, cabañas o estancias rurales.'),
    ('Bienestar y relajación', 'Experiencias de spa, masajes y terapias de relajación para el descanso y el equilibrio.'),
    ('Cultura y entretenimiento', 'Eventos culturales, visitas a museos, espectáculos y experiencias artísticas.'),
    ('Naturaleza y ecoturismo', 'Actividades en entornos naturales como senderismo, avistamiento de fauna y ecoturismo.'),
    ('Experiencias urbanas', 'Recorridos, actividades y eventos exclusivos en entornos urbanos vibrantes.'),
    ('Romanticismo y arte', 'Experiencias diseñadas para parejas, incluyendo cenas románticas y actividades artísticas.');

INSERT INTO rol (id_rol, nombre) VALUES
    (1, 'SuperAdministrador'),
    (2, 'Administrador'),
    (3, 'Usuario');

INSERT  INTO usuario (id_usuario, nombre, direccion, contrasena, telefono, id_rol, email) VALUES
    (1, 'Xplora Superadmin', 'Xplora Boulevard 123', '$2a$10$svyGvq1UnKdQNMNMc8/Nwep9WbyCJjNyDHvfs2wezPJgeC6TwPMcm', 12345678,1,'superadmin@xplora.com'),
    (2, 'Xplora Admin', 'Xplora Boulevard 123', '$2a$10$d8celupi88HCw5E07LAXeu9MBYKPDBpiNtgPxCvhstDN4CyXdSWxi', 12345678,2,'admin@xplora.com'),
    (3, 'Xplora Usuario', 'Xplora Boulevard 123', '$2a$10$bixazDGCVrXkoCtSkrzkle3uCyzUCHvkC3a0aYkZWxSBN5HBlbhLa', 12345678,3,'usuario@xplora.com');

INSERT INTO paquete_experiencia (id_paquete_experiencia, nombre, descripcion, precio, ubicacion, imagen, duracion, fecha_inicio, fecha_fin, id_categoria) VALUES
    (1, 'Spa de Lujo', 'Regálate un momento de puro bienestar. Escápate del estrés y revitaliza tu cuerpo y mente con nuestra exclusiva experiencia: inicia tu viaje de relajación con una copa de espumante, seguida de un masaje de relajación profunda de 50 minutos para liberar tensiones, y sumérgete en un circuito de hidroterapia de 60 minutos con sauna seco y húmedo para eliminar toxinas, camas calientes para confortar tus músculos y jacuzzi para renovar tu energía, todo diseñado para brindarte una sensación de bienestar y relajación inigualable.', 150.00, 'Mendoza, Argentina', '/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg,/imagen_1.jpeg', '4 horas',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 10 + 1) DAY, 1),
    (2, 'Paseo en kayak', 'Navega en kayak frente a uno de los glaciares más famosos. Embárcate en una aventura inolvidable con nuestro paseo en kayak, donde la serenidad del agua se fusiona con la emoción de la exploración. Deslízate suavemente por paisajes impresionantes, ya sea un tranquilo lago rodeado de montañas, un río serpenteante a través de exuberante vegetación o la costa marina con vistas espectaculares. Siente la libertad de remar a tu propio ritmo, descubriendo rincones ocultos y conectando con la naturaleza de una manera única. Nuestros guías expertos te acompañarán, asegurando una experiencia segura y enriquecedora, mientras compartes la belleza del entorno con amigos, familiares o en solitario.', 120.00, 'Buenos Aires, Argentina', '/imagen_2.jpeg,/imagen_3.jpeg,/imagen_4.jpeg,/imagen_5.jpeg,/imagen_6.jpeg', '3 horas',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 10 + 1) DAY, 2),
    (3, 'Noche en cabaña', 'Escápate a la serenidad de las montañas y sumérgete en una experiencia de tranquilidad inigualable en una acogedora cabaña. Despierta con el aroma de los pinos y el canto de los pájaros, mientras disfrutas de vistas panorámicas que te dejarán sin aliento. Relájate junto a la chimenea, saborea una taza de chocolate caliente y desconéctate del estrés cotidiano. Explora senderos naturales, respira aire puro y déjate envolver por la magia de la naturaleza. Ya sea que busques una escapada romántica, una aventura en solitario o un tiempo de calidad con amigos y familiares, nuestra cabaña en las montañas te brindará el refugio perfecto para recargar energías y crear recuerdos inolvidables.', 200.00, 'Bariloche, Argentina', '/imagen_8.jpeg', '1 noche',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 7) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 10 + 1) DAY, 3),
    (4, 'Parapente en la montaña', 'Siente la adrenalina y la libertad de volar como un pájaro con nuestra experiencia de parapente en la montaña. Despega desde una cima impresionante y déjate llevar por las corrientes de aire, mientras contemplas paisajes espectaculares que se extienden a tus pies. Disfruta de la sensación única de planear en el cielo, sintiendo la brisa en tu rostro y la inmensidad de la naturaleza a tu alrededor. Nuestros instructores expertos te guiarán en cada paso, asegurando una experiencia segura y emocionante que te dejará recuerdos imborrables.', 150.00, 'Mendoza, Argentina', '/imagen_88.jpeg', '4 horas',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 7 + 7) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 10 + 1) DAY, 1),
    (5, 'Tour de vinos premium', 'Sumérgete en el mundo del vino con nuestro exclusivo tour en un viñedo premium, donde la elegancia y la pasión se fusionan en una experiencia inolvidable. Recorre viñedos centenarios, descubre los secretos de la elaboración del vino y degusta una selección de nuestras mejores cosechas, guiado por expertos enólogos que compartirán contigo su conocimiento y pasión. Disfruta de un ambiente sofisticado y relajado, mientras admiras paisajes espectaculares y te deleitas con maridajes exquisitos que realzarán los sabores de cada vino. Una experiencia sensorial única para los amantes del buen vino y la naturaleza.', 120.00, 'Buenos Aires, Argentina', '/imagen_9.jpeg', '3 horas',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 14 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 20 + 1) DAY, 2),
    (6, 'Aventura en glamping', 'Sumérgete en la naturaleza sin renunciar al confort con nuestra experiencia de glamping, una fusión perfecta entre aventura y lujo. Duerme bajo un manto de estrellas en una tienda elegantemente equipada, con comodidades de hotel y detalles cuidadosamente seleccionados. Despierta con el canto de los pájaros y disfruta de desayunos gourmet al aire libre, rodeado de paisajes impresionantes. Explora senderos naturales, relájate en jacuzzis privados y disfruta de fogatas bajo la luna. El glamping te ofrece la oportunidad de conectar con la naturaleza de una manera única y memorable, creando recuerdos inolvidables en un entorno mágico y exclusivo.', 200.00, 'Bariloche, Argentina', '/imagen_10.jpeg', '1 noche',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 14 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 20 + 1) DAY, 3),
    (7, 'Rafting en aguas blancas', 'Siente la descarga de adrenalina con nuestra experiencia de rafting en aguas blancas, donde la aventura y la naturaleza se fusionan en un emocionante descenso. Navega por rápidos desafiantes, siente la fuerza del agua y admira paisajes impresionantes desde una perspectiva única. Nuestros guías expertos te acompañarán en cada paso, asegurando tu seguridad y compartiendo su conocimiento sobre el río y su entorno. Ya sea que busques una experiencia llena de emoción con amigos o una aventura en solitario, el rafting en aguas blancas te brindará recuerdos inolvidables y la sensación de haber conquistado la naturaleza en su estado más salvaje.', 150.00, 'Mendoza, Argentina', '/imagen_11.jpeg', '4 horas',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 14 + 10) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 20 + 1) DAY, 1),
    (8, 'Experiencia gastronómica fusión', 'Embárcate en un viaje culinario sin fronteras con nuestra experiencia gastronómica fusión, donde los sabores del mundo se entrelazan para crear combinaciones sorprendentes y deliciosas. Descubre platos innovadores que fusionan técnicas y ingredientes de diferentes culturas, desde la sutileza de la cocina asiática hasta la intensidad de los sabores latinos, pasando por la elegancia de la gastronomía mediterránea. Nuestros chefs expertos te guiarán a través de un menú degustación cuidadosamente elaborado, donde cada bocado es una explosión de sabor y una invitación a explorar nuevos horizontes culinarios. Disfruta de un ambiente sofisticado y relajado, donde la creatividad y la pasión por la gastronomía se unen para ofrecerte una experiencia única e inolvidable.', 120.00, 'Buenos Aires, Argentina', '/imagen_12.jpeg', '3 horas',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 30 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 30 + 1) DAY, 2),
    (9, 'Refugio alpino exclusivo', 'Escápate a la cumbre de la exclusividad con nuestra experiencia en un refugio alpino de lujo, donde la elegancia se encuentra con la majestuosidad de la montaña. Disfruta de vistas panorámicas impresionantes desde la calidez de un refugio diseñado con detalles exquisitos, donde el confort y la sofisticación se fusionan en perfecta armonía. Saborea la alta gastronomía local, relájate en spas de montaña y explora paisajes nevados con actividades exclusivas. Ya sea que busques una escapada romántica, una aventura en solitario o un retiro con amigos, nuestro refugio alpino te brindará una experiencia inolvidable, donde cada detalle está cuidadosamente pensado para superar tus expectativas.', 200.00, 'Bariloche, Argentina', '/imagen_13.jpeg', '1 noche',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 30 + 20) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 30 + 1) DAY, 3),
    (10, 'Buceo en aguas cristalinas', 'Sumérgete en un mundo submarino de ensueño con nuestra experiencia de buceo en aguas cristalinas, donde la belleza y la tranquilidad se fusionan en una aventura inolvidable. Explora arrecifes de coral vibrantes, descubre la diversidad de la vida marina y siente la emoción de flotar en un entorno mágico y silencioso. Nuestros instructores expertos te guiarán en cada paso, asegurando tu seguridad y compartiendo su conocimiento sobre el ecosistema marino. Ya sea que seas un buceador experimentado o un principiante, esta experiencia te brindará la oportunidad de conectar con la naturaleza de una manera única y crear recuerdos que durarán toda la vida.', 150.00, 'Mendoza, Argentina', '/imagen_14.jpeg', '4 horas',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 45 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 45 + 1) DAY, 1),
    (11, 'Taller de cocina internacional', 'Sumérgete en un viaje culinario global con nuestro taller de cocina internacional, donde aprenderás a preparar platos auténticos de diferentes culturas, guiado por chefs expertos que compartirán sus secretos y técnicas. Descubre la riqueza de sabores y aromas de la cocina tailandesa, italiana, mexicana o cualquier otra cultura que elijas explorar. Participa en una experiencia práctica y divertida, donde cocinarás junto a otros apasionados de la gastronomía, degustarás tus creaciones y te llevarás a casa recetas y conocimientos para sorprender a tus amigos y familiares.', 120.00, 'Buenos Aires, Argentina', '/imagen_15.jpeg', '3 horas',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 45 + 10) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 10 + 1) DAY, 2),
    (12, 'Campamento en la nieve', 'Atrévete a vivir una aventura invernal inolvidable con nuestra experiencia de campamento en la nieve, donde la magia del paisaje nevado se combina con la emoción de la vida al aire libre. Sumérgete en un mundo de tranquilidad y belleza, rodeado de montañas cubiertas de nieve y cielos estrellados. Construye tu propio refugio, aprende técnicas de supervivencia en la nieve y disfruta de actividades emocionantes como caminatas con raquetas de nieve y construcción de iglús. Comparte historias alrededor de una fogata, degusta comidas calientes bajo la luna y duerme en tiendas de campaña diseñadas para resistir las bajas temperaturas. Una experiencia única para conectar con la naturaleza en su estado más puro y crear recuerdos imborrables.', 200.00, 'Bariloche, Argentina', '/imagen_16.jpeg', '1 noche',
        @fecha_inicio := NOW() + INTERVAL FLOOR(RAND() * 60 + 1) DAY, @fecha_inicio + INTERVAL FLOOR(RAND() * 7 + 1) DAY, 3);


INSERT INTO pedido (estado, es_regalo, total, id_paquete_experiencia) VALUES
    ('Confirmado', FALSE, 150.00, 1),
    ('Pendiente', TRUE, 120.00, 2),
    ('Completado', FALSE, 200.00, 3);

INSERT INTO caracteristica (id, logo, nombre) VALUES 
    (1, 1, "Kayak profesional"),
    (2, 2, "Vistas panorámicas"),
    (3, 3, "Playa privada"),
    (4, 4, "Baños Privados"),
    (5, 5, "Placeholder"),
    (6, 6, "Grupos Reducidos"),
    (7, 7, "Oferta exclusiva"),
    (8, 8, "Comodidad garantizada"),
    (9, 9, "Sabor auténtico"),
    (10, 10, "Senderismo inolvidable"),
    (11, 11, "Captura el momento"),
    (12, 12, "Conexión natural"),
    (13, 13, "Aventura acuática"),
    (14, 14, "Exploración guiada"),
    (15, 15, "Misterio nocturno"),
    (16, 16, "Brilla con el día"),
    (17, 17, "Seguridad Privada"),
    (18, 18, "Destino alcanzado"),
    (19, 19, "Rutas por GPS"),
    (20, 20, "Climatización"),
    (21, 21, "Aprovecha tu tiempo");

INSERT INTO caracteristica_paquete_experiencia (id_caracteristica_paquete_experiencia, id_caracteristica, id_paquete_experiencia) VALUES 
    (1, 1,1),
    (2, 2,1),
    (3, 3,1),
    (4, 4,1),
    (5, 5,1),
    (6, 6,1),
    (7, 7,2),
    (8, 8,2),
    (9, 9,2),
    (10, 10,2),
    (11, 11,2),
    (12, 12,2),
    (13, 13,3),
    (14, 14,3),
    (15, 15,3),
    (16, 16,3),
    (17, 17,3),
    (18, 18,3),
    (19, 19,4),
    (20, 20,4),
    (21, 21,4),
    (22, 1,4),
    (23, 2,4),
    (24, 3,4),
    (25, 4,5),
    (26, 5,5),
    (27, 6,5),
    (28, 7,5),
    (29, 8,5),
    (30, 9,5),
    (31, 10,6),
    (32, 11,6),
    (33, 12,6),
    (34, 13,6),
    (35, 14,6),
    (36, 15,6),
    (37, 16,7),
    (38, 17,7),
    (39, 18,7),
    (40, 19,7),
    (41, 20,7),
    (42, 21,7),
    (43, 1,8),
    (44, 2,8),
    (45, 3,8),
    (46, 4,8),
    (47, 5,8),
    (48, 6,8),
    (49, 7,9),
    (50, 8,9),
    (51, 9,9),
    (52, 10,9),
    (53, 11,9),
    (54, 12,9),
    (55, 13,10),
    (56, 14,10),
    (57, 15,10),
    (58, 16,10),
    (59, 17,10),
    (60, 18,10),
    (61, 19,11),
    (62, 20,11),
    (63, 21,11),
    (64, 1,11),
    (65, 2,11),
    (66, 3,11),
    (67, 4,12);
    (68, 5,12);
    (69, 6,12);
    (70, 7,12);
    (71, 8,12);
    (72, 9,12);

-- INSERT INTO metodo_pago (nombre) VALUES
--     ('Tarjeta de crédito'),
--     ('PayPal'),
--     ('Transferencia bancaria');

-- INSERT INTO pago (monto, estado, id_pedido, id_metodo_pago) VALUES
--     (150.00, 'Aprobado', 1, 1),
--     (120.00, 'Pendiente', 2, 2),
--     (200.00, 'Aprobado', 3, 3);
INSERT INTO categoria (nombre) VALUES