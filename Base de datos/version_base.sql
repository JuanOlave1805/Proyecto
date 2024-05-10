-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-05-2024 a las 23:48:36
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_accion`
--

CREATE TABLE `tb_accion` (
  `id_Accion_PK` int NOT NULL,
  `id_Reparacion_FK` int DEFAULT NULL,
  `id_pedido_FK` int DEFAULT NULL,
  `id_registro_FK` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_accion`
--

INSERT INTO `tb_accion` (`id_Accion_PK`, `id_Reparacion_FK`, `id_pedido_FK`, `id_registro_FK`) VALUES
(1, 1, NULL, 1),
(2, NULL, 1, 2),
(3, 2, NULL, 3),
(4, NULL, 3, 4),
(5, 3, NULL, 5),
(6, NULL, 2, 6),
(7, 5, NULL, 7),
(8, 4, NULL, 8),
(9, NULL, 4, 9),
(10, NULL, 5, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detalles_pedido`
--

CREATE TABLE `tb_detalles_pedido` (
  `ID_Pedido_FK` int DEFAULT NULL,
  `ID_Producto_FK` int DEFAULT NULL,
  `Cantidad` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_detalles_pedido`
--

INSERT INTO `tb_detalles_pedido` (`ID_Pedido_FK`, `ID_Producto_FK`, `Cantidad`) VALUES
(1, 1, 2),
(2, 2, 3),
(2, 4, 2),
(3, 5, 1),
(3, 7, 4),
(4, 8, 2),
(4, 6, 1),
(5, 10, 3),
(5, 9, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_empleado`
--

CREATE TABLE `tb_empleado` (
  `id_empleado` int NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `edad` int DEFAULT NULL,
  `id_rol_FK` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_empleado`
--

INSERT INTO `tb_empleado` (`id_empleado`, `nombre`, `apellido`, `edad`, `id_rol_FK`) VALUES
(1, 'Elena', 'Gómez', 28, 1),
(2, 'Ricardo', 'Martínez', 35, 2),
(3, 'Sara', 'Fernández', 22, 3),
(4, 'Luis', 'Hernández', 40, 4),
(5, 'Marta', 'López', 24, 5),
(6, 'Carlos', 'Ruiz', 32, 6),
(7, 'Ana', 'Torres', 29, 7),
(8, 'Javier', 'Díaz', 27, 8),
(9, 'Carmen', 'Vega', 33, 9),
(10, 'Alberto', 'García', 26, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_inventario`
--

CREATE TABLE `tb_inventario` (
  `ID_Inventario_PK` int NOT NULL,
  `ID_Producto_FK` int DEFAULT NULL,
  `Cantidad_Stock` int DEFAULT NULL,
  `Ubicacion_Almacen` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_inventario`
--

INSERT INTO `tb_inventario` (`ID_Inventario_PK`, `ID_Producto_FK`, `Cantidad_Stock`, `Ubicacion_Almacen`) VALUES
(1, 1, 20, 'Estantería A1'),
(2, 2, 15, 'Estantería B2'),
(3, 3, 30, 'Estantería C3'),
(4, 4, 25, 'Estantería A2'),
(5, 5, 18, 'Estantería B1'),
(6, 6, 10, 'Estantería C2'),
(7, 7, 22, 'Estantería A3'),
(8, 8, 28, 'Estantería B3'),
(9, 9, 12, 'Estantería C1'),
(10, 10, 17, 'Estantería A4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_pedidos`
--

CREATE TABLE `tb_pedidos` (
  `ID_Pedido_PK` int NOT NULL,
  `FechaPedido` date DEFAULT NULL,
  `EstadoPedido` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_pedidos`
--

INSERT INTO `tb_pedidos` (`ID_Pedido_PK`, `FechaPedido`, `EstadoPedido`) VALUES
(1, '2023-01-05', 'En proceso'),
(2, '2023-02-10', 'Entregado'),
(3, '2023-03-15', 'Entregado'),
(4, '2023-04-20', 'En proceso'),
(5, '2023-05-25', 'En proceso'),
(6, '2023-06-30', 'Entregado'),
(7, '2023-07-05', 'Entregado'),
(8, '2023-08-10', 'Entregado'),
(9, '2023-09-15', 'Entregado'),
(10, '2023-10-20', 'Entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_productos`
--

CREATE TABLE `tb_productos` (
  `ID_Producto_PK` int NOT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  `ID_Bicicleta_FK` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_productos`
--

INSERT INTO `tb_productos` (`ID_Producto_PK`, `Precio`, `ID_Bicicleta_FK`) VALUES
(1, 5000000.00, 1),
(2, 3000000.00, 2),
(3, 4500000.00, 3),
(4, 2500000.00, 4),
(5, 6000000.00, 5),
(6, 4000000.00, 6),
(7, 3000000.00, 7),
(8, 2000000.00, 8),
(9, 1000000.00, 9),
(10, 5500000.00, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_proveedores`
--

CREATE TABLE `tb_proveedores` (
  `id_proveedor_PK` int NOT NULL,
  `nombre_proveedor` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_proveedores`
--

INSERT INTO `tb_proveedores` (`id_proveedor_PK`, `nombre_proveedor`, `direccion`, `telefono`, `email`) VALUES
(1, 'BikeParts Distribuciones', 'Calle Principal 123', '555-1234', 'info@bikeparts.com'),
(2, 'TechCycle Accesorios', 'Avenida Central 456', '555-5678', 'contacto@techcycle.com'),
(3, 'FastBikes Co.', 'Plaza de la Industria 789', '555-9012', 'ventas@fastbikes.com'),
(4, 'QualityTires Supplier', 'Carrera Comercial 321', '555-3456', 'info@qualitytires.com'),
(5, 'SportyGear Manufacturer', 'Paseo Deportivo 654', '555-7890', 'sales@sportygear.com'),
(6, 'EcoCycles Solutions', 'Ruta Ecológica 987', '555-2345', 'support@ecocycles.com'),
(7, 'GlobalRide Import/Export', 'Camino Internacional 210', '555-6789', 'info@globalride.com'),
(8, 'SpeedyParts Inc.', 'Circuito Veloz 543', '555-0123', 'sales@speedyparts.com'),
(9, 'GreenPedal Eco-Bikes', 'Vía Sostenible 876', '555-4567', 'contact@greenpedal.com'),
(10, 'InnovativeCycles Ltd.', 'Avenida Innovación 109', '555-8901', 'info@innocycles.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_proveedor_inventario`
--

CREATE TABLE `tb_proveedor_inventario` (
  `id_proveedor_FK` int DEFAULT NULL,
  `id_inventario_FK` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_proveedor_inventario`
--

INSERT INTO `tb_proveedor_inventario` (`id_proveedor_FK`, `id_inventario_FK`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_registro`
--

CREATE TABLE `tb_registro` (
  `id_registro_PK` int NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `Numero_tel` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_registro`
--

INSERT INTO `tb_registro` (`id_registro_PK`, `nombre`, `apellido`, `Numero_tel`) VALUES
(1, 'Ana', 'García', 5551234),
(2, 'Juan', 'Martínez', 5555678),
(3, 'Sofía', 'Rodríguez', 5559012),
(4, 'Carlos', 'López', 5553456),
(5, 'María', 'Pérez', 5557890),
(6, 'Pablo', 'Hernández', 5552345),
(7, 'Laura', 'Díaz', 5556789),
(8, 'Alejandro', 'Torres', 5550123),
(9, 'Carmen', 'Flores', 5554567),
(10, 'Javier', 'Gómez', 1238346);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_reparaciones`
--

CREATE TABLE `tb_reparaciones` (
  `ID_Reparacion_PK` int NOT NULL,
  `ID_Cliente_FK` int DEFAULT NULL,
  `Descripcion_Reparacion` text,
  `Costo` double DEFAULT NULL,
  `Fecha_Ingreso` date DEFAULT NULL,
  `ubicacion_local` varchar(20) DEFAULT NULL,
  `Fecha_Salida` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_reparaciones`
--

INSERT INTO `tb_reparaciones` (`ID_Reparacion_PK`, `ID_Cliente_FK`, `Descripcion_Reparacion`, `Costo`, `Fecha_Ingreso`, `ubicacion_local`, `Fecha_Salida`) VALUES
(1, 2, 'Cambio de neumático', 30000, '2023-01-15', 'Taller A', NULL),
(2, 3, 'Ajuste de frenos', 25000, '2023-02-02', 'Taller B', NULL),
(3, 4, 'Reparación de cadena', 15000, '2023-03-10', 'Taller C', NULL),
(4, 5, 'Instalación de luces', 20000, '2023-04-05', 'Taller A', NULL),
(5, 6, 'Cambio de piñón', 35000, '2023-05-20', 'Taller B', NULL),
(6, 7, 'Reemplazo de asiento', 18000, '2023-06-12', 'Taller C', NULL),
(7, 8, 'Alineación de ruedas', 28000, '2023-07-08', 'Taller A', NULL),
(8, 9, 'Reparación de suspensión', 50000, '2023-08-15', 'Taller B', NULL),
(9, 10, 'Cambio de cadena y engranajes', 40000, '2023-09-22', 'Taller C', NULL),
(10, 1, 'Ajuste de cambios', 22000, '2023-10-30', 'Taller A', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_rol`
--

CREATE TABLE `tb_rol` (
  `id_rol_PK` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `salario` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_rol`
--

INSERT INTO `tb_rol` (`id_rol_PK`, `nombre`, `salario`) VALUES
(1, 'Gerente de Tienda', 600000),
(2, 'Vendedor de Bicicletas', 450000),
(3, 'Mecánico de Bicicletas', 500000),
(4, 'Especialista en Accesorios', 480000),
(5, 'Recepcionista', 400000),
(6, 'Responsable de Marketing Local', 550000),
(7, 'Encargado de Inventarios', 480000),
(8, 'Asesor de Servicio al Cliente', 420000),
(9, 'Técnico de Reparaciones', 500000),
(10, 'Limpiador y Mantenimiento', 380000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_talla_bicicleta`
--

CREATE TABLE `tb_talla_bicicleta` (
  `ID_Talla_PK` int NOT NULL,
  `Talla` varchar(10) DEFAULT NULL,
  `Descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_talla_bicicleta`
--

INSERT INTO `tb_talla_bicicleta` (`ID_Talla_PK`, `Talla`, `Descripcion`) VALUES
(1, 'S', 'Pequeña, ideal para ciclistas de estatura baja.'),
(2, 'M', 'Mediana, adecuada para la mayoría de los ciclistas.'),
(3, 'L', 'Grande, recomendada para ciclistas de estatura alta.'),
(4, 'XL', 'Extra Grande, para ciclistas muy altos.'),
(5, 'XS', 'Extra Pequeña, diseñada para ciclistas de estatura muy baja.'),
(6, 'XXL', 'Doble Extra Grande, para ciclistas extremadamente altos.'),
(7, 'M/L', 'Talla intermedia entre Mediana y Grande.'),
(8, 'S/M', 'Talla intermedia entre Pequeña y Mediana.'),
(9, 'L/XL', 'Talla intermedia entre Grande y Extra Grande.'),
(10, 'Kids', 'Talla para niños, adecuada para los más pequeños.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_talla_tipo_producto`
--

CREATE TABLE `tb_talla_tipo_producto` (
  `id_Bicicleta_PK` int NOT NULL,
  `id_talla_bicicleta_FK` int DEFAULT NULL,
  `id_tipo_bicicleta_FK` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_talla_tipo_producto`
--

INSERT INTO `tb_talla_tipo_producto` (`id_Bicicleta_PK`, `id_talla_bicicleta_FK`, `id_tipo_bicicleta_FK`) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 1, 3),
(4, 2, 4),
(5, 3, 5),
(6, 1, 6),
(7, 2, 7),
(8, 3, 8),
(9, 1, 9),
(10, 2, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tarea`
--

CREATE TABLE `tb_tarea` (
  `id_tarea_PK` int NOT NULL,
  `id_accion_FK` int DEFAULT NULL,
  `id_empleado_FK` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tarea`
--

INSERT INTO `tb_tarea` (`id_tarea_PK`, `id_accion_FK`, `id_empleado_FK`) VALUES
(1, 1, 3),
(2, 2, 2),
(3, 3, 9),
(4, 4, 1),
(5, 5, 9),
(6, 6, 2),
(7, 7, 3),
(8, 8, 9),
(9, 9, 5),
(10, 10, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_bicicleta`
--

CREATE TABLE `tb_tipo_bicicleta` (
  `ID_Tipo_PK` int NOT NULL,
  `Nombre_Tipo` varchar(100) DEFAULT NULL,
  `Descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_bicicleta`
--

INSERT INTO `tb_tipo_bicicleta` (`ID_Tipo_PK`, `Nombre_Tipo`, `Descripcion`) VALUES
(1, 'Mountain Bike', 'Bicicleta diseñada para terrenos accidentados y caminos de montaña.'),
(2, 'Bicicleta de Carreras', 'Bicicleta ligera y aerodinámica ideal para competiciones en carretera.'),
(3, 'Bicicleta Híbrida', 'Combinación de características de bicicletas de carretera y de montaña, versátil para diferentes terrenos.'),
(4, 'Bicicleta de Ciudad', 'Diseñada para desplazamientos urbanos, cómoda y práctica para el uso diario.'),
(5, 'Bicicleta Plegable', 'Bicicleta que se puede plegar para facilitar su transporte y almacenamiento.'),
(6, 'BMX', 'Bicicleta diseñada para acrobacias y trucos en pistas especializadas.'),
(7, 'Bicicleta Tándem', 'Bicicleta con asientos y pedales para dos personas, ideal para ciclistas en pareja.'),
(8, 'Bicicleta Eléctrica', 'Bicicleta con asistencia eléctrica al pedaleo, proporcionando impulso adicional.'),
(9, 'Bicicleta de Turismo', 'Diseñada para largos recorridos y viajes, con características cómodas y de resistencia.'),
(10, 'Bicicleta de Ciclocross', 'Bicicleta todoterreno diseñada para competiciones que combinan terrenos variados, incluyendo tramos de carrera y obstáculos. ');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_accion`
--
ALTER TABLE `tb_accion`
  ADD PRIMARY KEY (`id_Accion_PK`),
  ADD KEY `id_Reparacion_FK` (`id_Reparacion_FK`),
  ADD KEY `id_pedido_FK` (`id_pedido_FK`),
  ADD KEY `id_registro_FK` (`id_registro_FK`);

--
-- Indices de la tabla `tb_detalles_pedido`
--
ALTER TABLE `tb_detalles_pedido`
  ADD KEY `ID_Pedido_FK` (`ID_Pedido_FK`),
  ADD KEY `ID_Producto_FK` (`ID_Producto_FK`);

--
-- Indices de la tabla `tb_empleado`
--
ALTER TABLE `tb_empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `id_rol_FK` (`id_rol_FK`);

--
-- Indices de la tabla `tb_inventario`
--
ALTER TABLE `tb_inventario`
  ADD PRIMARY KEY (`ID_Inventario_PK`),
  ADD KEY `ID_Producto` (`ID_Producto_FK`);

--
-- Indices de la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  ADD PRIMARY KEY (`ID_Pedido_PK`);

--
-- Indices de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  ADD PRIMARY KEY (`ID_Producto_PK`),
  ADD KEY `FK_Talla_Producto` (`ID_Bicicleta_FK`);

--
-- Indices de la tabla `tb_proveedores`
--
ALTER TABLE `tb_proveedores`
  ADD PRIMARY KEY (`id_proveedor_PK`);

--
-- Indices de la tabla `tb_proveedor_inventario`
--
ALTER TABLE `tb_proveedor_inventario`
  ADD KEY `id_proveedor_FK` (`id_proveedor_FK`),
  ADD KEY `id_inventario_Fk` (`id_inventario_FK`);

--
-- Indices de la tabla `tb_registro`
--
ALTER TABLE `tb_registro`
  ADD PRIMARY KEY (`id_registro_PK`);

--
-- Indices de la tabla `tb_reparaciones`
--
ALTER TABLE `tb_reparaciones`
  ADD PRIMARY KEY (`ID_Reparacion_PK`);

--
-- Indices de la tabla `tb_rol`
--
ALTER TABLE `tb_rol`
  ADD PRIMARY KEY (`id_rol_PK`);

--
-- Indices de la tabla `tb_talla_bicicleta`
--
ALTER TABLE `tb_talla_bicicleta`
  ADD PRIMARY KEY (`ID_Talla_PK`);

--
-- Indices de la tabla `tb_talla_tipo_producto`
--
ALTER TABLE `tb_talla_tipo_producto`
  ADD PRIMARY KEY (`id_Bicicleta_PK`),
  ADD KEY `id_talla_bicicleta_FK` (`id_talla_bicicleta_FK`),
  ADD KEY `id_tipo_bicicleta_FK` (`id_tipo_bicicleta_FK`);

--
-- Indices de la tabla `tb_tarea`
--
ALTER TABLE `tb_tarea`
  ADD PRIMARY KEY (`id_tarea_PK`),
  ADD KEY `id_accion_FK` (`id_accion_FK`),
  ADD KEY `id_empleado_FK` (`id_empleado_FK`);

--
-- Indices de la tabla `tb_tipo_bicicleta`
--
ALTER TABLE `tb_tipo_bicicleta`
  ADD PRIMARY KEY (`ID_Tipo_PK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_accion`
--
ALTER TABLE `tb_accion`
  MODIFY `id_Accion_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_empleado`
--
ALTER TABLE `tb_empleado`
  MODIFY `id_empleado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_inventario`
--
ALTER TABLE `tb_inventario`
  MODIFY `ID_Inventario_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  MODIFY `ID_Pedido_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  MODIFY `ID_Producto_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_proveedores`
--
ALTER TABLE `tb_proveedores`
  MODIFY `id_proveedor_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_registro`
--
ALTER TABLE `tb_registro`
  MODIFY `id_registro_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_reparaciones`
--
ALTER TABLE `tb_reparaciones`
  MODIFY `ID_Reparacion_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_rol`
--
ALTER TABLE `tb_rol`
  MODIFY `id_rol_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_talla_bicicleta`
--
ALTER TABLE `tb_talla_bicicleta`
  MODIFY `ID_Talla_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_talla_tipo_producto`
--
ALTER TABLE `tb_talla_tipo_producto`
  MODIFY `id_Bicicleta_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_tarea`
--
ALTER TABLE `tb_tarea`
  MODIFY `id_tarea_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_bicicleta`
--
ALTER TABLE `tb_tipo_bicicleta`
  MODIFY `ID_Tipo_PK` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_accion`
--
ALTER TABLE `tb_accion`
  ADD CONSTRAINT `id_registro_FK` FOREIGN KEY (`id_registro_FK`) REFERENCES `tb_registro` (`id_registro_PK`),
  ADD CONSTRAINT `tb_accion_ibfk_1` FOREIGN KEY (`id_Reparacion_FK`) REFERENCES `tb_reparaciones` (`ID_Reparacion_PK`),
  ADD CONSTRAINT `tb_accion_ibfk_2` FOREIGN KEY (`id_pedido_FK`) REFERENCES `tb_pedidos` (`ID_Pedido_PK`);

--
-- Filtros para la tabla `tb_detalles_pedido`
--
ALTER TABLE `tb_detalles_pedido`
  ADD CONSTRAINT `tb_detalles_pedido_ibfk_1` FOREIGN KEY (`ID_Pedido_FK`) REFERENCES `tb_pedidos` (`ID_Pedido_PK`),
  ADD CONSTRAINT `tb_detalles_pedido_ibfk_2` FOREIGN KEY (`ID_Producto_FK`) REFERENCES `tb_productos` (`ID_Producto_PK`);

--
-- Filtros para la tabla `tb_empleado`
--
ALTER TABLE `tb_empleado`
  ADD CONSTRAINT `tb_empleado_ibfk_1` FOREIGN KEY (`id_rol_FK`) REFERENCES `tb_rol` (`id_rol_PK`);

--
-- Filtros para la tabla `tb_inventario`
--
ALTER TABLE `tb_inventario`
  ADD CONSTRAINT `tb_inventario_ibfk_1` FOREIGN KEY (`ID_Producto_FK`) REFERENCES `tb_productos` (`ID_Producto_PK`);

--
-- Filtros para la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  ADD CONSTRAINT `tb_productos_ibfk_1` FOREIGN KEY (`ID_Bicicleta_FK`) REFERENCES `tb_talla_tipo_producto` (`id_Bicicleta_PK`);

--
-- Filtros para la tabla `tb_proveedor_inventario`
--
ALTER TABLE `tb_proveedor_inventario`
  ADD CONSTRAINT `tb_proveedor_inventario_ibfk_1` FOREIGN KEY (`id_proveedor_FK`) REFERENCES `tb_proveedores` (`id_proveedor_PK`),
  ADD CONSTRAINT `tb_proveedor_inventario_ibfk_2` FOREIGN KEY (`id_inventario_FK`) REFERENCES `tb_inventario` (`ID_Inventario_PK`);

--
-- Filtros para la tabla `tb_talla_tipo_producto`
--
ALTER TABLE `tb_talla_tipo_producto`
  ADD CONSTRAINT `tb_talla_tipo_producto_ibfk_1` FOREIGN KEY (`id_talla_bicicleta_FK`) REFERENCES `tb_talla_bicicleta` (`ID_Talla_PK`),
  ADD CONSTRAINT `tb_talla_tipo_producto_ibfk_2` FOREIGN KEY (`id_tipo_bicicleta_FK`) REFERENCES `tb_tipo_bicicleta` (`ID_Tipo_PK`);

--
-- Filtros para la tabla `tb_tarea`
--
ALTER TABLE `tb_tarea`
  ADD CONSTRAINT `tb_tarea_ibfk_1` FOREIGN KEY (`id_accion_FK`) REFERENCES `tb_accion` (`id_Accion_PK`),
  ADD CONSTRAINT `tb_tarea_ibfk_2` FOREIGN KEY (`id_empleado_FK`) REFERENCES `tb_empleado` (`id_empleado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
