# Plataforma de Gestión de Torneos eSports

API REST para la gestión de **equipos**, **jugadores**, **torneos** y **partidas** de eSports, desarrollada con una arquitectura en capas y optimizada mediante **caché con Redis** para mejorar el rendimiento de consultas frecuentes y costosas.

---

## Características

- CRUD completo de equipos, jugadores, torneos y partidas
- Asignación de equipos a torneos
- Registro de resultados de partidas
- Rankings y estadísticas
- Caché de respuestas HTTP con Redis
- Invalidación automática de caché en operaciones de escritura
- Arquitectura limpia y escalable

---

## Tecnologías

- **Node.js**
- **Express**
- **Supabase** (PostgreSQL)
- **Redis**

---

## Arquitectura

El proyecto sigue una arquitectura en capas clara y mantenible:

```
Routes → Controllers → Services → Repositories
```

- **Routes**: Definen los endpoints y middlewares
- **Controllers**: Manejan la lógica HTTP
- **Services**: Contienen la lógica de negocio
- **Repositories**: Acceso a datos (Supabase)
- **Middlewares**: Autenticación, caché, etc.

---

## Estructura del Proyecto

```
src/
├── config/          # Configuración (Redis, Supabase)
├── controllers/     # Controladores HTTP
├── middlewares/     # Middlewares (auth, cache)
├── models/          # Modelos de dominio
├── repositories/    # Acceso a base de datos
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── sql/             # Scripts SQL
├── app.js
├── server.js
```

---

## Esquema de Base de Datos

### equipos
- id (PK)
- nombre
- juego

### jugadores
- id (PK)
- nickname
- email
- equipo_id (FK → equipos.id)

### torneos
- id (PK)
- nombre
- juego
- fecha_inicio
- fecha_fin

### equipos_torneos
- id (PK)
- equipo_id (FK → equipos.id)
- torneo_id (FK → torneos.id)

### partidas
- id (PK)
- torneo_id (FK → torneos.id)
- equipo_local_id (FK → equipos.id)
- equipo_visitante_id (FK → equipos.id)

---

## Caché con Redis

La API utiliza Redis para cachear respuestas de endpoints **GET** mediante un middleware.

### Funcionamiento

1. Se genera una clave basada en la ruta (`baseUrl + path`)
2. Se consulta Redis antes de acceder a la base de datos
3. Si existe caché → se devuelve directamente
4. Si no existe → se consulta la DB y se guarda en Redis
5. Las operaciones **POST / PUT / DELETE** invalidan las claves relacionadas

### TTL

- Tiempo de vida por defecto: **60 segundos**
- Evita datos obsoletos y reduce carga en la base de datos

---

## Autenticación

- Middleware de **API Key** para proteger los endpoints
- Middleware de **rol administrador** para operaciones sensibles

---

## Configuración

Crear un archivo `.env` basado en `.env.ejemplo`:

- Variables de conexión a Supabase
- Configuración de Redis
- API Key

---

## Ejecución

Instalar dependencias:

```
npm install
```

Levantar Redis (ejemplo local):

```
redis-server
```

Iniciar el servidor:

```
npm run dev
```

---

## 🧪 Testing Manual

Se recomienda usar **Thunder Client**, **Postman** o similar.

Comportamiento esperado:

- Primera request GET → Base de datos
- Requests siguientes → Redis
- Operaciones de escritura → invalidan caché

---

## 📈 Mejoras Futuras

- TTL dinámico por endpoint
- Invalidación por patrones (`SCAN`)
- Cache por usuario
- Métricas y logs de Redis
- Tests automatizados

---

## 📄 Licencia

Proyecto educativo / académico.

