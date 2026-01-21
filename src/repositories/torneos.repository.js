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
  return supabase.from('equipos_torneo').insert(data).select();
}