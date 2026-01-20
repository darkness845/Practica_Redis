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
