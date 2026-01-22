import { Torneo } from '../models/Torneo.js';
import * as torneoRepo from '../repositories/torneos.repository.js';
import * as equipoRepo from '../repositories/equipos.repository.js';

/**
 * Crear torneo
 */
export async function createTorneo(req, res) {
  const { nombre, juego, fecha_inicio, fecha_fin } = req.body;

  if (!nombre || !juego || !fecha_inicio) {
    return res.status(400).json({
      error: 'Validación',
      message: 'nombre, juego y fecha_inicio son obligatorios'
    });
  }

  if (fecha_fin && new Date(fecha_fin) < new Date(fecha_inicio)) {
    return res.status(400).json({
      error: 'Validación',
      message: 'fecha_fin no puede ser anterior a fecha_inicio'
    });
  }

  const { data, error } = await torneoRepo.insertTorneo({
    nombre,
    juego,
    fecha_inicio,
    fecha_fin,
    estado: 'pendiente'
  });

  if (error) {
    return res.status(500).json({ error: 'DB Error', message: error.message });
  }

  const torneo = new Torneo(data);

  res.status(201).json({
    data: torneo.toPublic(),
    message: 'Torneo creado correctamente'
  });
}

/**
 * Asignar equipos a torneo
 */
export async function asignarEquipos(req, res) {
  const { torneoId } = req.params;
  const { equipos } = req.body;

  if (!Array.isArray(equipos) || equipos.length < 2) {
    return res.status(400).json({
      error: 'Validación',
      message: 'Se requieren al menos 2 equipos'
    });
  }

  const { data: torneo } = await torneoRepo.getTorneoById(torneoId);

  if (!torneo) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Torneo no encontrado'
    });
  }

  if (torneo.estado !== 'pendiente') {
    return res.status(400).json({
      error: 'Estado inválido',
      message: 'Solo se pueden asignar equipos a torneos pendientes'
    });
  }

  const { data: equiposDB } = await equipoRepo.getEquiposByIds(equipos);

  const juegos = new Set(equiposDB.map(e => e.juego));
  if (juegos.size !== 1 || !juegos.has(torneo.juego)) {
    return res.status(400).json({
      error: 'Validación',
      message: 'Todos los equipos deben ser del mismo juego que el torneo'
    });
  }

  const inserts = equipos.map(equipo_id => ({
    torneo_id: torneoId,
    equipo_id
  }));

  await torneoRepo.insertTorneoEquipos(inserts);

  res.json({
    message: 'Equipos asignados correctamente'
  });
}

/**
 * Cambiar estado del torneo
 */
export async function cambiarEstado(req, res) {
  const { torneoId } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['pendiente', 'activo', 'finalizado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({
      error: 'Validación',
      message: 'Estado inválido'
    });
  }

  const { data: torneo } = await torneoRepo.getTorneoById(torneoId);

  if (!torneo) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Torneo no encontrado'
    });
  }

  const transiciones = {
    pendiente: ['activo'],
    activo: ['finalizado'],
    finalizado: []
  };

  if (!transiciones[torneo.estado].includes(estado)) {
    return res.status(400).json({
      error: 'Estado inválido',
      message: `No se puede pasar de ${torneo.estado} a ${estado}`
    });
  }

  await torneoRepo.updateTorneo(torneoId, { estado });

  res.json({
    message: `Torneo cambiado a estado ${estado}`
  });
}

export async function getTorneos(req, res) {
  const { data, error } = await torneoRepo.getAllTorneos();
  if (error) return res.status(500).json(error);
  res.json(data);
}
