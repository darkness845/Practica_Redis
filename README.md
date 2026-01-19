# Plataforma de gestión de torneos eSports

API REST para gestionar equipos, jugadores, torneos y partidas de eSports.

## Tecnologías
- Node.js
- Express
- Supabase (PostgreSQL)
- Redis

## Arquitectura
Routes → Controllers → Services → Repositories

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
- equipo_id (FK)
- torneo_id (FK)

### partidas
- id (PK)
- torneo_id (FK)
- equipo_local_id (FK)
- equipo_visitante_id (FK)

