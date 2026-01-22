import * as partidaRepo from '../repositories/partidas.repository.js';
import * as torneoRepo from '../repositories/torneos.repository.js';
import * as equipoRepo from '../repositories/equipos.repository.js';

export async function crearPartida(data) {
  const {
    torneo_id,
    equipo_local_id,
    equipo_visitante_id,
    fecha
  } = data;

  if (!torneo_id || !equipo_local_id || !equipo_visitante_id || !fecha) {
    return { error: 'Faltan datos obligatorios' };
  }

  if (equipo_local_id === equipo_visitante_id) {
    return { error: 'Los equipos no pueden ser iguales' };
  }

  const { data: torneo } = await torneoRepo.getTorneoById(torneo_id);
  if (!torneo || torneo.estado !== 'activo') {
    return { error: 'El torneo debe estar activo' };
  }

  const { data: equipos } = await equipoRepo.getEquiposByIds([
    equipo_local_id,
    equipo_visitante_id
  ]);

  if (
    equipos.length !== 2 ||
    equipos[0].juego !== equipos[1].juego
  ) {
    return { error: 'Los equipos deben ser del mismo juego' };
  }

  return partidaRepo.insertPartida({
    torneo_id,
    equipo_local_id,
    equipo_visitante_id,
    fecha
  });
}

export async function registrarResultado(id, resultado) {
  if (!resultado) {
    return { error: 'Resultado obligatorio' };
  }

  return partidaRepo.updateResultado(id, resultado);
}

export async function listarPartidasPorTorneo(torneoId) {
  return partidaRepo.getPartidasByTorneo(torneoId);
}

export async function obtenerPartida(id) {
  return partidaRepo.getPartidaById(id);
}
