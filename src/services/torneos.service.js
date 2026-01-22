import * as torneoRepo from '../repositories/torneos.repository.js';
import * as equipoRepo from '../repositories/equipos.repository.js';

export async function crearTorneo(data) {
  const { nombre, juego, fecha_inicio, fecha_fin } = data;

  if (!nombre || !juego || !fecha_inicio) {
    return { error: 'nombre, juego y fecha_inicio son obligatorios' };
  }

  if (fecha_fin && new Date(fecha_fin) < new Date(fecha_inicio)) {
    return { error: 'fecha_fin no puede ser anterior a fecha_inicio' };
  }

  return torneoRepo.insertTorneo({
    nombre,
    juego,
    fecha_inicio,
    fecha_fin,
    estado: 'pendiente'
  });
}

export async function asignarEquiposATorneo(torneoId, equipos) {
  if (!Array.isArray(equipos) || equipos.length < 2) {
    return { error: 'Se requieren al menos 2 equipos' };
  }

  const { data: torneo } = await torneoRepo.getTorneoById(torneoId);
  if (!torneo) return { error: 'Torneo no encontrado' };
  if (torneo.estado !== 'pendiente') {
    return { error: 'Solo se pueden asignar equipos a torneos pendientes' };
  }

  const { data: equiposDB } = await equipoRepo.getEquiposByIds(equipos);

  const juegos = new Set(equiposDB.map(e => e.juego));
  if (juegos.size !== 1 || !juegos.has(torneo.juego)) {
    return { error: 'Todos los equipos deben ser del mismo juego' };
  }

  const inserts = equipos.map(equipo_id => ({
    torneo_id: torneoId,
    equipo_id
  }));

  return torneoRepo.insertTorneoEquipos(inserts);
}

export async function cambiarEstadoTorneo(torneoId, estado) {
  const estadosValidos = ['pendiente', 'activo', 'finalizado'];
  if (!estadosValidos.includes(estado)) {
    return { error: 'Estado inválido' };
  }

  const { data: torneo } = await torneoRepo.getTorneoById(torneoId);
  if (!torneo) return { error: 'Torneo no encontrado' };

  const transiciones = {
    pendiente: ['activo'],
    activo: ['finalizado'],
    finalizado: []
  };

  if (!transiciones[torneo.estado].includes(estado)) {
    return {
      error: `No se puede pasar de ${torneo.estado} a ${estado}`
    };
  }

  return torneoRepo.updateTorneo(torneoId, { estado });
}

export async function listarTorneos() {
  return torneoRepo.getAllTorneos();
}

export async function obtenerEquiposDeTorneo(torneoId) {
  return torneoRepo.getEquiposByTorneo(torneoId);
}
