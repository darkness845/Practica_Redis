import { Partida } from '../models/Partida.js';
import * as partidaRepo from '../repositories/partidas.repository.js';
import * as torneoRepo from '../repositories/torneos.repository.js';
import * as equipoRepo from '../repositories/equipos.repository.js';

/**
 * Crear partida
 */
export async function createPartida(req, res) {
  const {
    torneo_id,
    equipo_local_id,
    equipo_visitante_id,
    fecha
  } = req.body;

  if (!torneo_id || !equipo_local_id || !equipo_visitante_id || !fecha) {
    return res.status(400).json({
      error: 'Validación',
      message: 'Faltan datos obligatorios'
    });
  }

  if (equipo_local_id === equipo_visitante_id) {
    return res.status(400).json({
      error: 'Validación',
      message: 'Los equipos no pueden ser iguales'
    });
  }

  const { data: torneo } = await torneoRepo.getTorneoById(torneo_id);

  if (!torneo || torneo.estado !== 'activo') {
    return res.status(400).json({
      error: 'Regla de negocio',
      message: 'El torneo debe estar activo'
    });
  }

  const { data: equipos } = await equipoRepo.getEquiposByIds([
    equipo_local_id,
    equipo_visitante_id
  ]);

  if (equipos.length !== 2 || equipos[0].juego !== equipos[1].juego) {
    return res.status(400).json({
      error: 'Validación',
      message: 'Los equipos deben ser del mismo juego'
    });
  }

  const { data, error } = await partidaRepo.insertPartida({
    torneo_id,
    equipo_local_id,
    equipo_visitante_id,
    fecha
  });

  if (error) {
    return res.status(500).json({
      error: 'DB Error',
      message: error.message
    });
  }

  const partida = new Partida(data);

  res.status(201).json({
    data: partida.toPublic(),
    message: 'Partida creada correctamente'
  });
}

/**
 * Registrar resultado
 */
export async function registrarResultado(req, res) {
  const { id } = req.params;
  const { resultado } = req.body;

  if (!resultado) {
    return res.status(400).json({
      error: 'Validación',
      message: 'Resultado obligatorio'
    });
  }

  await partidaRepo.updateResultado(id, resultado);

  res.json({
    message: 'Resultado registrado'
  });
}

/**
 * Listar partidas por torneo
 */
export async function getPartidasByTorneo(req, res) {
  const { torneoId } = req.params;

  const { data, error } = await partidaRepo.getPartidasByTorneo(torneoId);

  if (error) {
    return res.status(500).json({
      error: 'DB Error',
      message: error.message
    });
  }

  const partidas = data.map(p => new Partida(p).toPublic());

  res.json({
    data: partidas
  });
}
