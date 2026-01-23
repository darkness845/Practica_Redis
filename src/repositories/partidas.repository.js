import { supabase } from '../config/supabase.js';

export function insertPartida(data) {
  return supabase.from('partidas').insert(data).select().single();
}

export function updateResultado(id, resultado) {
  return supabase.from('partidas').update({ resultado }).eq('id', id);
}

export function getPartidasByTorneo(torneoId) {
  return supabase.from('partidas').select('*').eq('torneo_id', torneoId);
}

export function getPartidasByEquipo(equipoId) {
  return supabase.from('partidas').select('*')
    .or(
      `equipo_local_id.eq.${equipoId},equipo_visitante_id.eq.${equipoId}`
    );
}

export function getPartidaById(id) {
  return supabase.from('partidas')
    .select(`
      *,
      equipo_local:equipos!partidas_equipo_local_id_fkey(nombre),
      equipo_visitante:equipos!partidas_equipo_visitante_id_fkey(nombre)
    `).eq('id', id).single();
}
