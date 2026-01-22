import * as repo from '../repositories/equipos.repository.js';

export async function createEquipo(req, res) {
  const { nombre, juego } = req.body;

  if (!nombre || !juego) {
    return res.status(400).json({ error: 'Nombre y juego son obligatorios' });
  }

  const { data, error } = await repo.insertEquipo({ nombre, juego });

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
}

export async function getAllEquipos(req, res) {
  const { data, error } = await repo.getEquipos();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function getEquipo(req, res) {
  const { id } = req.params;

  const { data, error } = await repo.getEquipoById(id);
  if (error) return res.status(404).json({ error: 'Equipo no encontrado' });

  res.json(data);
}

export async function updateEquipo(req, res) {
  const { id } = req.params;

  const { data, error } = await repo.updateEquipo(id, req.body);
  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
}

export async function deleteEquipo(req, res) {
  const { id } = req.params;

  const { error } = await repo.deleteEquipo(id);
  if (error) return res.status(500).json({ error: error.message });

  res.status(204).send();
}

export async function rankingEquipos(req, res) {
  const { data } = await repo.getEquiposConVictorias();

  const ranking = Object.entries(data)
    .map(([equipo_id, victorias]) => ({ equipo_id, victorias }))
    .sort((a, b) => b.victorias - a.victorias);

  res.json(ranking);
}
