import * as service from '../services/jugadores.service.js';

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
  res.status(201).json(data);
}

export async function getAllJugadores(req, res) {
  const { data, error } = await service.listarJugadores();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function getJugadorStats(req, res) {
  const stats = await service.calcularStatsJugador(req.params.id);
  if (!stats) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }
  res.json({ data: stats });
}

export async function getTorneosJugador(req, res) {
  const torneos = await service.obtenerTorneosJugador(req.params.id);
  if (!torneos) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }
  res.json(torneos);
}
