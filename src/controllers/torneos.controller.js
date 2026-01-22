import { Torneo } from '../models/Torneo.js';
import * as service from '../services/torneos.service.js';

export async function createTorneo(req, res) {
  const result = await service.crearTorneo(req.body);

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

  const torneo = new Torneo(data);

  res.status(201).json({
    data: torneo.toPublic(),
    message: 'Torneo creado correctamente'
  });
}

export async function asignarEquipos(req, res) {
  const { torneoId } = req.params;
  const { equipos } = req.body;

  const result = await service.asignarEquiposATorneo(torneoId, equipos);

  if (result?.error) {
    return res.status(400).json({
      error: 'Validación',
      message: result.error
    });
  }

  res.json({ message: 'Equipos asignados correctamente' });
}

export async function cambiarEstado(req, res) {
  const { torneoId } = req.params;
  const { estado } = req.body;

  const result = await service.cambiarEstadoTorneo(torneoId, estado);

  if (result?.error) {
    return res.status(400).json({
      error: 'Validación',
      message: result.error
    });
  }

  res.json({
    message: `Torneo cambiado a estado ${estado}`
  });
}

export async function getTorneos(req, res) {
  const { data, error } = await service.listarTorneos();
  if (error) return res.status(500).json(error);
  res.json(data);
}

export async function getEquiposDeTorneo(req, res) {
  const { torneoId } = req.params;

  const { data, error } =
    await service.obtenerEquiposDeTorneo(torneoId);

  if (error) return res.status(500).json(error);

  res.json(data.map(e => e.equipos));
}

export async function updateTorneo(req, res) {
  const { torneoId } = req.params;
  const { nombre, fecha_inicio, fecha_fin } = req.body;

  if (!nombre && !fecha_inicio && !fecha_fin) {
    return res.status(400).json({
      error: 'Debe enviarse al menos un campo para actualizar'
    });
  }

  const { data, error } =
    await service.actualizarTorneo(torneoId, req.body);

  if (error || !data) {
    return res.status(404).json({
      error: 'Torneo no encontrado'
    });
  }

  res.json(data);
}
