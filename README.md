# TON Service

Full-stack web application for [ton-service.by](https://ton-service.by): an Angular frontend with server-side rendering (SSR) and a Spring Boot REST API backed by MySQL.

## Project structure

| Directory        | Description                                      |
|------------------|--------------------------------------------------|
| `ton-service/`   | Angular 18 frontend (SSR via Express + PM2)      |
| `ton-service-be/`| Spring Boot 2 backend (JAR)                      |
| `docker-compose.yml` | Local development stack (MySQL + BE + FE)  |

---

## Component versions

### Frontend (`ton-service`)

| Component              | Version   |
|------------------------|-----------|
| Node.js (Docker/SSR)   | 20        |
| Angular                | 18.2.14   |
| Angular CLI            | 18.2.21   |
| Angular SSR            | 18.2.21   |
| TypeScript             | 5.4.5     |
| RxJS                   | 7.8.x     |
| Zone.js                | 0.14.10   |
| Bootstrap              | 4.5.0     |
| jQuery                 | 3.5.1     |
| Express (SSR server)   | 4.18.2    |
| ngx-quill / Quill      | 26.0.0 / 2.0.0 |
| tiny-slider            | 2.9.2     |

### Backend (`ton-service-be`)

| Component              | Version        |
|------------------------|----------------|
| Java                   | 1.8            |
| Spring Boot            | 2.0.5.RELEASE  |
| Apache Tomcat (embedded)| 9.0.12        |
| Hibernate              | 5.2.17.Final   |
| MySQL Connector/J      | 5.1.47         |
| Maven (wrapper)        | 3.5.4          |
| Log4j                  | 1.2.17         |
| JUnit Jupiter          | 5.2.0          |

### Database

| Component | Version |
|-----------|---------|
| MySQL     | 8       |

---

## Prerequisites (local development)

- **Node.js** 20.x and npm
- **Java JDK** 8
- **MySQL** 8 (or use Docker — see below)
- **Docker** and **Docker Compose** (optional, for containerized local setup)

---

## Local environment — application startup

### Option A: Docker Compose (recommended)

1. Start all services:

   ```bash
   docker-compose up --build
   ```

3. Access the application:

   | Service  | URL                          |
   |----------|------------------------------|
   | Frontend | http://localhost:8080        |
   | Backend  | http://localhost:1739        |
   | MySQL    | localhost:3306               |

   The database is initialized from `ton_service_dump.sql` on first container start.

### Option B: Run services manually

#### 1. Database

Start MySQL 8 and create the `ton_service` database. Import the schema/data from `ton_service_dump.sql` if needed.

Default connection settings (see `ton-service-be/src/main/resources/application.properties`):

- Host: `localhost:3306`
- Database: `ton_service`
- User / password: configure in `application.properties`

#### 2. Backend

```bash
cd ton-service-be
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

The API listens on **port 1739**. The `dev` profile disables SSL (`application-dev.properties`).

#### 3. Frontend

```bash
cd ton-service
npm install
npm start
```

The dev server runs on **http://localhost:4200** and proxies `/api/*` requests to `http://localhost:1739` (see `proxy.conf.json`).

#### SSR development (optional)

```bash
cd ton-service
npm run dev:ssr
```

---

## Production deployment

Production runs on a Linux server with **Apache2** (static assets), **PM2** (SSR Node process `ton-fe`), and the Spring Boot JAR.

### 1. Rebuild backend and frontend

On the build machine (or directly on the server):

**Backend**

```bash
cd ton-service-be
./mvnw clean package -DskipTests
```

Output JAR: `ton-service-be/target/ton-service-be-1.0-SNAPSHOT.jar`

**Frontend**

```bash
cd ton-service
npm ci
npm run build:ssr
```

Output directory: `ton-service/dist/ton-service/` (contains `browser/` and `server/` subfolders)

### 2. Deploy frontend static assets and SSR bundle

Copy the entire frontend build output to the web root:

```bash
rsync -av --delete ton-service/dist/ton-service/ /var/www/html/dist/ton-service/
```

Or manually copy the contents of `ton-service/dist/ton-service/` into `/var/www/html/dist/ton-service/`.

### 3. Deploy backend JAR

Copy the compiled JAR to the server backend directory:

```bash
cp ton-service-be/target/ton-service-be-1.0-SNAPSHOT.jar /TS/TS/
```

### 4. Restart Apache2

```bash
sudo systemctl restart apache2
# or
sudo service apache2 restart
```

### 5. Restart frontend SSR (PM2)

```bash
pm2 restart ton-fe
```

### 6. Start / restart backend JAR

Stop the running instance if one exists, then start the new JAR:

```bash
cd /TS/TS
java -jar ton-service-be-1.0-SNAPSHOT.jar &
```

For a persistent background process, use `nohup`, `systemd`, or a process manager:

```bash
nohup java -jar ton-service-be-1.0-SNAPSHOT.jar > app.log 2>&1 &
```

Ensure `application.properties` on the server points to the production MySQL instance and SSL certificates (Let's Encrypt keystore under `/etc/letsencrypt/`).

---

## Build commands reference

| Task                    | Command                              | Directory       |
|-------------------------|--------------------------------------|-----------------|
| Frontend dev server     | `npm start`                          | `ton-service/`  |
| Frontend production build (SSR) | `npm run build:ssr`          | `ton-service/`  |
| Frontend Docker build   | `npm run build:ssr:docker`           | `ton-service/`  |
| Backend package         | `./mvnw clean package`               | `ton-service-be/` |
| Backend run (dev)       | `./mvnw spring-boot:run -Dspring-boot.run.profiles=dev` | `ton-service-be/` |
| Full stack (Docker)     | `docker-compose up --build`          | repository root |

---

## API

The backend exposes REST endpoints under `/api/*`. The frontend dev proxy and SSR server forward `/api` requests to the backend (port **1739** in development).

Health checks are available via Spring Boot Actuator (`management.endpoints.web.exposure.include=*`).
