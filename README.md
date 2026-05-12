## Script para crear la base de datos en MySQL:
```sql
CREATE DATABASE IF NOT EXISTS rappi_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE rappi_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id       BIGINT       NOT NULL AUTO_INCREMENT,
    nombre   VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS restaurantes (
    id         BIGINT       NOT NULL AUTO_INCREMENT,
    nombre     VARCHAR(255) NOT NULL,
    direccion  VARCHAR(255),
    imagen_url VARCHAR(500),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS productos (
    id             BIGINT       NOT NULL AUTO_INCREMENT,
    nombre         VARCHAR(255) NOT NULL,
    descripcion    TEXT,
    precio         DOUBLE       NOT NULL,
    imagen_url     VARCHAR(500),
    restaurante_id BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_producto_restaurante
        FOREIGN KEY (restaurante_id) REFERENCES restaurantes (id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ordenes (
    id             BIGINT   NOT NULL AUTO_INCREMENT,
    fecha          DATETIME NOT NULL,
    total          DOUBLE   NOT NULL,
    usuario_id     BIGINT,
    restaurante_id BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_orden_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_orden_restaurante
        FOREIGN KEY (restaurante_id) REFERENCES restaurantes (id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS articulos_pedido (
    id          BIGINT NOT NULL AUTO_INCREMENT,
    cantidad    INT    NOT NULL,
    producto_id BIGINT,
    orden_id    BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_articulopedido_producto
        FOREIGN KEY (producto_id) REFERENCES productos (id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_articulopedido_orden
        FOREIGN KEY (orden_id) REFERENCES ordenes (id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
