import { supabase } from '../config/supabase.js';

export function insertTorneo(data) {
  return supabase.from('torneos').insert(data).select().single();
}

export function getTorneoById(id) {
  return supabase.from('torneos').select('*').eq('id', id).single();
}

export function updateTorneo(id, data) {
  return supabase.from('torneos').update(data).eq('id', id);
}

export function insertTorneoEquipos(data) {
  return supabase.from('equipos_torneos').insert(data).select();
}

export function getAllTorneos() {
  return supabase.from('torneos').select('*');
}

export function getEquiposByTorneo(torneoId) {
  return supabase
    .from('equipos_torneo')
    .select('equipos (*)')
    .eq('torneo_id', torneoId);
}

