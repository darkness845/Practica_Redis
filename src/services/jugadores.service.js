import * as jugadoresRepo from '../repositories/jugadores.repository.js';
import * as partidasRepo from '../repositories/partidas.repository.js';

export async function crearJugador(data) {
  return jugadoresRepo.insertJugador(data);
}

export async function listarJugadores() {
  return jugadoresRepo.getJugadores();
}

export async function calcularStatsJugador(jugadorId) {
  const { data: jugador } = await jugadoresRepo.getJugadorById(jugadorId);
  if (!jugador) return null;

  const equipoId = jugador.equipo_id;
  const { data: partidas } =
    await partidasRepo.getPartidasByEquipo(equipoId);

  const jugadas = partidas.length;
  const ganadas = partidas.filter(p =>
    (p.resultado === 'local' && p.equipo_local_id === equipoId) ||
    (p.resultado === 'visitante' && p.equipo_visitante_id === equipoId)
  ).length;

  return {
    jugador_id: jugador.id,
    nickname: jugador.nickname,
    equipo_id: equipoId,
    partidas_jugadas: jugadas,
    partidas_ganadas: ganadas,
    partidas_perdidas: jugadas - ganadas,
    winrate: jugadas === 0 ? 0 : Number(((ganadas / jugadas) * 100).toFixed(2))
  };
}

export async function obtenerTorneosJugador(jugadorId) {
  const { data } = await jugadoresRepo.getTorneosByJugador(jugadorId);
  if (!data) return null;

  const torneos = [];
  data.equipos?.equipos_torneos?.forEach(et => {
    if (et.torneos) torneos.push(et.torneos);
  });

  return torneos;
}

export async function actualizarJugador(id, data) {
  return jugadoresRepo.updateJugador(id, data);
}

export async function eliminarJugador(id) {
  return jugadoresRepo.deleteJugador(id);
}
