-- Esquema de Base de Datos - eSports

-- DROP TABLE IF EXISTS partidas CASCADE;
-- DROP TABLE IF EXISTS equipos_torneos CASCADE;
-- DROP TABLE IF EXISTS jugadores CASCADE;
-- DROP TABLE IF EXISTS torneos CASCADE;
-- DROP TABLE IF EXISTS equipos CASCADE;

-- Tabla equipos
CREATE TABLE IF NOT EXISTS equipos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  juego VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla jugadores
CREATE TABLE IF NOT EXISTS jugadores (
  id SERIAL PRIMARY KEY,
  nickname VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  equipo_id INT REFERENCES equipos(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla torneos
CREATE TABLE IF NOT EXISTS torneos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  juego VARCHAR(100) NOT NULL,
  fecha_inicio TIMESTAMP NOT NULL,
  fecha_fin TIMESTAMP,
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT estado_torneo_check
    CHECK (estado IN ('pendiente', 'activo', 'finalizado'))
);

-- Tabla equipos_torneos (N:M)
CREATE TABLE IF NOT EXISTS equipos_torneos (
  id SERIAL PRIMARY KEY,
  equipo_id INT NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
  torneo_id INT NOT NULL REFERENCES torneos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (equipo_id, torneo_id)
);

-- Tabla partidas
CREATE TABLE IF NOT EXISTS partidas (
  id SERIAL PRIMARY KEY,
  torneo_id INT NOT NULL REFERENCES torneos(id) ON DELETE CASCADE,
  equipo_local_id INT NOT NULL REFERENCES equipos(id),
  equipo_visitante_id INT NOT NULL REFERENCES equipos(id),
  resultado VARCHAR(50),
  fecha TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT equipos_distintos_check
    CHECK (equipo_local_id <> equipo_visitante_id)
);
