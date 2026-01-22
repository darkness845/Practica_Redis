import * as service from '../services/equipos.service.js';

export async function createEquipo(req, res) {
  const { nombre, juego } = req.body;
  if (!nombre || !juego) {
    return res.status(400).json({ error: 'Nombre y juego son obligatorios' });
  }

  const { data, error } = await service.crearEquipo({ nombre, juego });
  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
}

export async function getAllEquipos(req, res) {
  const { data, error } = await service.listarEquipos();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function getEquipo(req, res) {
  const { id } = req.params;
  const { data, error } = await service.obtenerEquipo(id);

  if (error || !data) {
    return res.status(404).json({ error: 'Equipo no encontrado' });
  }

  res.json(data);
}

export async function updateEquipo(req, res) {
  const { id } = req.params;
  const { data, error } = await service.actualizarEquipo(id, req.body);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function deleteEquipo(req, res) {
  const { id } = req.params;
  const { error } = await service.eliminarEquipo(id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
}

export async function rankingEquipos(req, res) {
  const ranking = await service.obtenerRankingEquipos();
  res.json(ranking);
}
