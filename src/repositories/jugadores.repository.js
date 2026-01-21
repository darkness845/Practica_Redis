import { supabase } from '../config/supabase.js';

export async function insertJugador(data) {
  return await supabase.from('jugadores').insert(data).select();
}

export async function getJugadores() {
  return await supabase.from('jugadores').select('*');
}

export async function getJugadorById(id) {
  return await supabase
    .from('jugadores')
    .select('*')
    .eq('id', id)
    .single();
}
