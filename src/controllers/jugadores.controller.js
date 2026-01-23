import * as service from '../services/jugadores.service.js';
import { redis } from '../config/redis.js';

export async function createJugador(req, res) {
  const { nickname, email, equipo_id } = req.body;

  if (!nickname || !email || !equipo_id) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const { data, error } = await service.crearJugador({
    nickname,
    email,
    equipo_id
  });

  if (error) return res.status(500).json({ error: error.message });

  // invalidar cache
  await redis.del('cache:/api/jugadores');

  res.status(201).json(data);
}

export async function getAllJugadores(req, res) {
  console.log('🔵 JUGADORES DESDE SUPABASE');

  const { data, error } = await service.listarJugadores();
  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
}

export async function getJugadorStats(req, res) {
  console.log('🔵 STATS JUGADOR DESDE SUPABASE');

  const { id } = req.params;

  const stats = await service.calcularStatsJugador(id);
  if (!stats) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  res.json({ data: stats });
}

export async function getTorneosJugador(req, res) {
  console.log('🔵 TORNEOS JUGADOR DESDE SUPABASE');

  const { id } = req.params;

  const torneos = await service.obtenerTorneosJugador(id);
  if (!torneos) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  res.json(torneos);
}

export async function updateJugador(req, res) {
  const { id } = req.params;

  const { data, error } = await service.actualizarJugador(id, req.body);

  if (error || !data) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  // invalidar cache
  await redis.del('cache:/api/jugadores');
  await redis.del(`cache:/api/jugadores/${id}/stats`);
  await redis.del(`cache:/api/jugadores/${id}/torneos`);

  res.json(data);
}

export async function deleteJugador(req, res) {
  const { id } = req.params;

  const { error } = await service.eliminarJugador(id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // invalidar cache
  await redis.del('cache:/api/jugadores');
  await redis.del(`cache:/api/jugadores/${id}/stats`);
  await redis.del(`cache:/api/jugadores/${id}/torneos`);

  res.status(204).send();
}
