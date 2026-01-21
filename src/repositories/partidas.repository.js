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
