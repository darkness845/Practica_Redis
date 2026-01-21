import * as repo from '../repositories/jugadores.repository.js';

export async function createJugador(req, res) {
  const { nickname, email, equipo_id } = req.body;

  if (!nickname || !email || !equipo_id) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const { data, error } = await repo.insertJugador({
    nickname,
    email,
    equipo_id
  });

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
}

export async function getAllJugadores(req, res) {
  const { data, error } = await repo.getJugadores();
  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
}

import * as partidasRepo from '../repositories/partidas.repository.js';
import * as jugadoresRepo from '../repositories/jugadores.repository.js';

export async function getJugadorStats(req, res) {
  const { id } = req.params;

  // Obtener jugador
  const { data: jugador, error: jugadorError } =
    await jugadoresRepo.getJugadorById(id);

  if (jugadorError || !jugador) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Jugador no encontrado'
    });
  }

  const equipoId = jugador.equipo_id;

  // Obtener partidas del equipo
  const { data: partidas, error: partidasError } =
    await partidasRepo.getPartidasByEquipo(equipoId);

  if (partidasError) {
    return res.status(500).json({
      error: 'DB Error',
      message: partidasError.message
    });
  }

  const partidasJugadas = partidas.length;

  // Calcular ganadas
  const partidasGanadas = partidas.filter(p => {
    if (p.resultado === 'local' && p.equipo_local_id === equipoId) return true;
    if (p.resultado === 'visitante' && p.equipo_visitante_id === equipoId) return true;
    return false;
  }).length;

  const partidasPerdidas = partidasJugadas - partidasGanadas;

  const winrate =
    partidasJugadas === 0
      ? 0
      : Number(((partidasGanadas / partidasJugadas) * 100).toFixed(2));

  // Respuesta
  res.json({
    data: {
      jugador_id: jugador.id,
      nickname: jugador.nickname,
      equipo_id: equipoId,
      partidas_jugadas: partidasJugadas,
      partidas_ganadas: partidasGanadas,
      partidas_perdidas: partidasPerdidas,
      winrate
    }
  });
}

