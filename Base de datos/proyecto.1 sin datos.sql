-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2024 a las 07:49:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
  `id_Pedido_FK` int(11) DEFAULT NULL,
  `correo_Usuario_FK` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detalles_pedido`
--

CREATE TABLE `tb_detalles_pedido` (
  `id_Pedido_FK` int(11) DEFAULT NULL,
  `id_Producto_FK` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_inventario`
--

CREATE TABLE `tb_inventario` (
  `id_Inventario_PK` int(11) NOT NULL,
  `id_Producto_FK` int(11) DEFAULT NULL,
  `cantidad_Stock` int(11) DEFAULT NULL,
  `ubicacion_Almacen` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_pedidos`
--

CREATE TABLE `tb_pedidos` (
  `id_Pedido_PK` int(11) NOT NULL,
  `fecha_Pedido` date DEFAULT NULL,
  `estado_Pedido` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_productos`
--

CREATE TABLE `tb_productos` (
  `id_Producto_PK` int(11) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `id_Bicicleta_FK` int(11) DEFAULT NULL,
  `id_Accesorios_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_proveedores`
--

CREATE TABLE `tb_proveedores` (
  `id_Proveedor_PK` int(11) NOT NULL,
  `nombre_Proveedor` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_proveedor_inventario`
--

CREATE TABLE `tb_proveedor_inventario` (
  `id_Proveedor_FK` int(11) DEFAULT NULL,
  `id_Inventario_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_rol`
--

CREATE TABLE `tb_rol` (
  `id_Rol_PK` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `salario` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_bicicleta`
--

CREATE TABLE `tb_tipo_bicicleta` (
  `id_Tipo_PK` int(11) NOT NULL,
  `nombre_Tipo` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_producto`
--

CREATE TABLE `tb_tipo_producto` (
  `id_Bicicleta_PK` int(11) NOT NULL,
  `id_Tipo_bicicleta_FK` int(11) DEFAULT NULL,
  `talla_Rin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `id_Rol_FK` int(11) DEFAULT NULL,
  `correo_Usuario_PK` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_accion`
--
ALTER TABLE `tb_accion`
  ADD KEY `id_pedido_FK` (`id_Pedido_FK`),
  ADD KEY `correo_usuario_FK` (`correo_Usuario_FK`);

--
-- Indices de la tabla `tb_detalles_pedido`
--
ALTER TABLE `tb_detalles_pedido`
  ADD KEY `ID_Pedido_FK` (`id_Pedido_FK`),
  ADD KEY `ID_Producto_FK` (`id_Producto_FK`);

--
-- Indices de la tabla `tb_inventario`
--
ALTER TABLE `tb_inventario`
  ADD PRIMARY KEY (`id_Inventario_PK`),
  ADD KEY `ID_Producto` (`id_Producto_FK`);

--
-- Indices de la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  ADD PRIMARY KEY (`id_Pedido_PK`);

--
-- Indices de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  ADD PRIMARY KEY (`id_Producto_PK`),
  ADD KEY `FK_Talla_Producto` (`id_Bicicleta_FK`);

--
-- Indices de la tabla `tb_proveedores`
--
ALTER TABLE `tb_proveedores`
  ADD PRIMARY KEY (`id_Proveedor_PK`);

--
-- Indices de la tabla `tb_proveedor_inventario`
--
ALTER TABLE `tb_proveedor_inventario`
  ADD KEY `id_proveedor_FK` (`id_Proveedor_FK`),
  ADD KEY `id_inventario_Fk` (`id_Inventario_FK`);

--
-- Indices de la tabla `tb_rol`
--
ALTER TABLE `tb_rol`
  ADD PRIMARY KEY (`id_Rol_PK`);

--
-- Indices de la tabla `tb_tipo_bicicleta`
--
ALTER TABLE `tb_tipo_bicicleta`
  ADD PRIMARY KEY (`id_Tipo_PK`);

--
-- Indices de la tabla `tb_tipo_producto`
--
ALTER TABLE `tb_tipo_producto`
  ADD PRIMARY KEY (`id_Bicicleta_PK`),
  ADD KEY `id_tipo_bicicleta_FK` (`id_Tipo_bicicleta_FK`);

--
-- Indices de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`correo_Usuario_PK`),
  ADD KEY `id_rol_FK` (`id_Rol_FK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_inventario`
--
ALTER TABLE `tb_inventario`
  MODIFY `id_Inventario_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  MODIFY `id_Pedido_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  MODIFY `id_Producto_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_proveedores`
--
ALTER TABLE `tb_proveedores`
  MODIFY `id_Proveedor_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_rol`
--
ALTER TABLE `tb_rol`
  MODIFY `id_Rol_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_bicicleta`
--
ALTER TABLE `tb_tipo_bicicleta`
  MODIFY `id_Tipo_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_producto`
--
ALTER TABLE `tb_tipo_producto`
  MODIFY `id_Bicicleta_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_accion`
--
ALTER TABLE `tb_accion`
  ADD CONSTRAINT `correo_usuario_FK` FOREIGN KEY (`correo_Usuario_FK`) REFERENCES `tb_usuario` (`correo_Usuario_PK`),
  ADD CONSTRAINT `tb_accion_ibfk_2` FOREIGN KEY (`id_Pedido_FK`) REFERENCES `tb_pedidos` (`id_Pedido_PK`);

--
-- Filtros para la tabla `tb_detalles_pedido`
--
ALTER TABLE `tb_detalles_pedido`
  ADD CONSTRAINT `tb_detalles_pedido_ibfk_1` FOREIGN KEY (`id_Pedido_FK`) REFERENCES `tb_pedidos` (`id_Pedido_PK`),
  ADD CONSTRAINT `tb_detalles_pedido_ibfk_2` FOREIGN KEY (`id_Producto_FK`) REFERENCES `tb_productos` (`id_Producto_PK`);

--
-- Filtros para la tabla `tb_inventario`
--
ALTER TABLE `tb_inventario`
  ADD CONSTRAINT `tb_inventario_ibfk_1` FOREIGN KEY (`id_Producto_FK`) REFERENCES `tb_productos` (`id_Producto_PK`);

--
-- Filtros para la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  ADD CONSTRAINT `tb_productos_ibfk_1` FOREIGN KEY (`id_Bicicleta_FK`) REFERENCES `tb_tipo_producto` (`id_Bicicleta_PK`);

--
-- Filtros para la tabla `tb_proveedor_inventario`
--
ALTER TABLE `tb_proveedor_inventario`
  ADD CONSTRAINT `tb_proveedor_inventario_ibfk_1` FOREIGN KEY (`id_Proveedor_FK`) REFERENCES `tb_proveedores` (`id_Proveedor_PK`),
  ADD CONSTRAINT `tb_proveedor_inventario_ibfk_2` FOREIGN KEY (`id_Inventario_FK`) REFERENCES `tb_inventario` (`id_Inventario_PK`);

--
-- Filtros para la tabla `tb_tipo_producto`
--
ALTER TABLE `tb_tipo_producto`
  ADD CONSTRAINT `tb_tipo_producto_ibfk_2` FOREIGN KEY (`id_Tipo_bicicleta_FK`) REFERENCES `tb_tipo_bicicleta` (`id_Tipo_PK`);

--
-- Filtros para la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD CONSTRAINT `tb_usuario_ibfk_1` FOREIGN KEY (`id_Rol_FK`) REFERENCES `tb_rol` (`id_Rol_PK`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
