# CINEMA API

Este proyecto es un microservicio backend en Node.js que permite gestionar la cartelera de un cine. Incluye la ingesta de información desde una API externa de películas, así como la administración de funciones y boletas. Está construido utilizando Express como framework para el servidor, Sequelize como ORM para la gestión de la base de datos y JavaScript como lenguaje principal.

## Requisitos previos

Antes de levantar el proyecto, asegúrate de tener instalados los siguientes componentes:

- Node.js (versión 14 o superior)
- npm (Node Package Manager)
- Una base de datos compatible con Sequelize (por ejemplo, MySQL, PostgreSQL, SQLite, etc.)
- Docker y Docker Compose (opcional, para ejecutar con contenedores)

## Instalación

### Correr localmente

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/ingestebancorrea/cinema-api.git
    cd cinema-api
    ```

2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

3. Configura las variables de entorno:
    - Crea un archivo `.env` en la raíz del proyecto.
    - Define las variables necesarias, como las credenciales de la base de datos. Por ejemplo:
      ```
      DB_HOST=localhost
      DB_USER=tu_usuario
      DB_PASSWORD=tu_contraseña
      DB_NAME=nombre_de_la_base_de_datos
      DB_DIALECT=postgres
      PORT=3000
      ```

4. Realiza las migraciones de la base de datos:
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Inicia el servidor:
    ```bash
    npm run start
    ```

6. La API estará disponible en `http://localhost:3000` (o el puerto configurado en las variables de entorno).

### Correr con Docker

1. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

2. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/ingestebancorrea/cinema-api.git
    cd cinema-api
    ```

3. Configura las variables de entorno:
    - Crea un archivo `.env` en la raíz del proyecto.
    - Define las variables necesarias, como las credenciales de la base de datos. Por ejemplo:
      ```
      DB_HOST=db
      DB_USER=tu_usuario
      DB_PASSWORD=tu_contraseña
      DB_NAME=nombre_de_la_base_de_datos
      DB_DIALECT=postgres
      PORT=3000
      ```

4. Levanta los contenedores con Docker Compose:
    ```bash
    docker-compose up --build
    ```

5. La API estará disponible en `http://localhost:3000` (o el puerto configurado en las variables de entorno).

## Estructura del proyecto

Este proyecto sigue los principios de Diseño Orientado a Dominios (DDD, por sus siglas en inglés). La estructura está organizada de la siguiente manera:

- `src/`
    - `application/`: Contiene los casos de uso y la lógica de aplicación.
    - `domain/`: Define las entidades, agregados, repositorios del dominio.
    - `infrastructure/`: Contiene los controladores, rutas, implementaciones concretas de repositorios.
- `shared/config/`: Archivos de configuración, como la configuración de la base de datos.

Esta estructura permite una separación clara de responsabilidades y facilita la escalabilidad y el mantenimiento del proyecto.

## Scripts disponibles

- `npm run start`: Inicia el servidor en modo de desarrollo.
- `npm run dev`: Inicia el servidor en modo de desarrollo con recarga automática.
- `docker-compose up`: Levanta los contenedores Docker para el proyecto.

## Notas adicionales

- Asegúrate de que la base de datos esté en funcionamiento antes de iniciar el servidor.
- Si usas Docker, no necesitas instalar Node.js ni configurar la base de datos manualmente, ya que todo se gestiona dentro de los contenedores.

## Contribuciones

Si deseas contribuir a este proyecto, por favor crea un fork, realiza tus cambios y envía un pull request.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).