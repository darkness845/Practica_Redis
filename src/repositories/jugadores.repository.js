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

export async function getTorneosByJugador(jugadorId) {
  return supabase
    .from('jugadores')
    .select(`
      equipos (
        equipos_torneos (
          torneos (*)
        )
      )
    `)
    .eq('id', jugadorId)
    .single();
}

export async function updateJugador(id, data) {
  return supabase
    .from('jugadores')
    .update(data)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteJugador(id) {
  return supabase
    .from('jugadores')
    .delete()
    .eq('id', id);
}
