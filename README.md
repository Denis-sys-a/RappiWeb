Backend desarrollado con **Spring Boot** y Frontend con **Shadcn + React**

### Antes de ejecutar el proyecto es crear la base de datos en el MySQL Workbench

```sql
CREATE DATABASE rappi_db;
```

### Credenciales en `Backend/BackendRappi/src/main/resources/application.properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/rappi_db
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

# Backend:

### Dependencias en la descarga:

> -Spring Data JPA
> -Spring Web
> -Lombok
> -MySQL Driver

### Ejecutar Backend

```bash
cd Backend/BackendRappi
./mvnw spring-boot:run
```

---

# Frontend:

### Instalar todas las dependencias del proyecto

npm install

### Componentes de shadcn usados

npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add skeleton
npx shadcn@latest add sidebar-08
npx shadcn@latest add login-02

### Par los iconos

npm install lucide-react

### Ejecutar Frontend

```bash
cd Frontend/frontendrappi
npm run dev
```

---

# Endpoints

### Usuarios

| Método   | Endpoint          | Descripción                     |
| -------- | ----------------- | ------------------------------- |
| `GET`    | `/usuarios`       | Listar usuarios                 |
| `GET`    | `/usuarios/{id}`  | Obtener por ID                  |
| `POST`   | `/usuarios`       | Crear usuario                   |
| `PUT`    | `/usuarios/{id}`  | Actualizar un usuario existente |
| `DELETE` | `/usuarios/{id}`  | Eliminar un usuario             |
| `POST`   | `/usuarios/login` | Login                           |

#### Body — POST/PUT `/usuarios`

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456"
}
```

#### Body — Login `/usuarios/login`

```json
{
  "email": "juan@email.com",
  "password": "123456"
}
```

---

### Restaurante

| Método   | Endpoint             | Descripcion                   |
| -------- | -------------------- | ----------------------------- |
| `GET`    | `/restaurantes`      | Listar todos los restaurantes |
| `GET`    | `/restaurantes/{id}` | Obtener restaurante por ID    |
| `POST`   | `/restaurantes`      | Crear restaurante             |
| `PUT`    | `/restaurantes/{id}` | Actualizar restaurante        |
| `DELETE` | `/restaurantes/{id}` | Eliminar un restaurante       |

#### Body — POST/PUT `/restaurantes`

```json
{
  "nombre": "La Picantería",
  "direccion": "Av. Lima 123",
  "imagenUrl": "https://res.cloudinary.com/the-infatuation/image/upload/q_auto,f_auto/images/PR_IMG_0762_lavqam"
}
```

---

### Productos

| Método   | Endpoint          | Descripcion                |
| -------- | ----------------- | -------------------------- |
| `GET`    | `/productos`      | Listar todos los productos |
| `GET`    | `/productos/{id}` | Obtener producto por ID    |
| `POST`   | `/productos`      | Crear producto             |
| `PUT`    | `/productos/{id}` | Actualizar producto        |
| `DELETE` | `/productos/{id}` | Eliminar un producto       |

#### Body — POST/PUT (requiere restaurante existente)

```json
{
  "nombre": "Lomo Saltado",
  "descripcion": "Clásico peruano",
  "precio": 25.5,
  "imagenUrl": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Lomo-saltado-perudelights.jpg",
  "restaurante": { "id": 1 }
}
```

---

### Ordenes

| Método   | Endpoint        | Descripcion              |
| -------- | --------------- | ------------------------ |
| `GET`    | `/ordenes`      | Listar todos las ordenes |
| `GET`    | `/ordenes/{id}` | Obtener orden por ID     |
| `POST`   | `/ordenes`      | Crear orden              |
| `PUT`    | `/ordenes/{id}` | Actualizar orden         |
| `DELETE` | `/ordenes/{id}` | Eliminar orden           |

#### Body — POST/PUT (requiere usuario y restaurante existente)

```json
{
  "fecha": "2026-05-12T12:00:00",
  "total": 51.0,
  "usuario": { "id": 1 },
  "restaurante": { "id": 1 }
}
```

---

### Artículos de Pedido

| Método   | Endpoint                 | Descripcion         |
| -------- | ------------------------ | ------------------- |
| `GET`    | `/articulos-pedido`      | Listar todos        |
| `GET`    | `/articulos-pedido/{id}` | Obtener por ID      |
| `POST`   | `/articulos-pedido`      | Crear articulo      |
| `PUT`    | `/articulos-pedido/{id}` | Actualizar articulo |
| `DELETE` | `/articulos-pedido/{id}` | Eliminar articulo   |

#### Body — POST/PUT (requiere producto y orden existentes)

```json
{
  "cantidad": 2,
  "producto": { "id": 1 },
  "orden": { "id": 1 }
}
```

---

# Script de la base de datos en MySQL:

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
