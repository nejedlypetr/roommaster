# RoomMaster

Room reservation system for booking rooms, tracking equipment, and reporting faults.

Your space, your time, your control.

## Stack

- Backend: Java 17, Spring Boot 3, PostgreSQL, JWT
- Frontend: React, TypeScript, Vite

## Run locally

Prerequisites: Docker, Java 17, Maven, and Node.js 18 or newer.

### Database

From the repository root:

```bash
docker compose up -d
```

Postgres listens on `localhost:5432`. The database name, user, and password are `roommaster`. The schema and demo data load on the first start. To load them again, remove the volume with `docker compose down -v` and start the database once more.

Override the connection with `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` when you are not using this local database.

### Backend

```bash
mvn -f backend/pom.xml spring-boot:run
```

The API is at [http://localhost:8080](http://localhost:8080). Swagger UI is at [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html).

`JWT_SECRET` has a local default. Set it to a random value of at least 32 bytes before sharing a deployment. `JWT_EXPIRATION_MS` defaults to one day.

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The UI is at [http://localhost:5173](http://localhost:5173). `VITE_BE_URL` defaults to `http://localhost:8080/v1`.

## Demo accounts

Every seeded account uses the password `password123`.

- `john.doe@example.com` — maintainer
- `jane.smith@example.com` — user

Anonymous registration always creates a user. Only a signed-in maintainer can assign the maintainer role.

## API tests

```bash
cp testing/.env.example testing/.env
cd testing
npm install
npm run test:api
```
