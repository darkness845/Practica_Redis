import { Partida } from '../models/Partida.js';
import * as service from '../services/partidas.service.js';
import { redis } from '../config/redis.js';

export async function createPartida(req, res) {
  const result = await service.crearPartida(req.body);

  if (result?.error) {
    return res.status(400).json({
      error: 'Validación',
      message: result.error
    });
  }

  const { data, error } = result;
  if (error) {
    return res.status(500).json({
      error: 'DB Error',
      message: error.message
    });
  }

  // invalidar cache
  await redis.del('cache:/api/partidas');
  await redis.del(`cache:/api/partidas/torneo/${req.body.torneo_id}`);

  const partida = new Partida(data);

  res.status(201).json({
    data: partida.toPublic(),
    message: 'Partida creada correctamente'
  });
}

export async function registrarResultado(req, res) {
  const { id } = req.params;
  const { resultado } = req.body;

  const result = await service.registrarResultado(id, resultado);

  if (result?.error) {
    return res.status(400).json({
      error: 'Validación',
      message: result.error
    });
  }

  // invalidar cache
  await redis.del(`cache:/api/partidas/${id}`);

  res.json({ message: 'Resultado registrado' });
}

export async function getPartidasByTorneo(req, res) {
  console.log('🔵 PARTIDAS POR TORNEO DESDE SUPABASE');

  const { torneoId } = req.params;

  const { data, error } =
    await service.listarPartidasPorTorneo(torneoId);

  if (error) {
    return res.status(500).json({
      error: 'DB Error',
      message: error.message
    });
  }

  res.json({
    data: data.map(p => new Partida(p).toPublic())
  });
}

export async function getPartida(req, res) {
  console.log('🔵 PARTIDA DESDE SUPABASE');

  const { id } = req.params;

  const { data, error } = await service.obtenerPartida(id);

  if (error || !data) {
    return res.status(404).json({
      error: 'Partida no encontrada'
    });
  }

  res.json(data);
}
