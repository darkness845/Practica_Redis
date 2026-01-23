import * as repo from '../repositories/equipos.repository.js';

export async function crearEquipo({ nombre, juego }) {
  return repo.insertEquipo({ nombre, juego });
}

export async function listarEquipos() {
  return repo.getEquipos();
}

export async function obtenerEquipo(id) {
  return repo.getEquipoById(id);
}

export async function actualizarEquipo(id, data) {
  return repo.updateEquipo(id, data);
}

export async function eliminarEquipo(id) {
  return repo.deleteEquipo(id);
}

export async function obtenerRankingEquipos() {
  const { data } = await repo.getEquiposConVictorias();

  return Object.entries(data)
    .map(([equipo_id, victorias]) => ({equipo_id: Number(equipo_id), victorias}))
    .sort((a, b) => b.victorias - a.victorias);
}
