import { supabase } from '../config/supabase.js';

export async function insertEquipo(data) {
  return await supabase.from('equipos').insert(data).select();
}

export async function getEquipos() {
  return await supabase.from('equipos').select('*');
}

export async function getEquipoById(id) {
  return await supabase.from('equipos').select('*').eq('id', id).single();
}

export async function getEquiposByIds(ids) {
  return await supabase.from('equipos').select('*').in('id', ids);
}

export async function updateEquipo(id, data) {
  return await supabase.from('equipos').update(data).eq('id', id).select();
}

export async function deleteEquipo(id) {
  return await supabase.from('equipos').delete().eq('id', id);
}

export async function getEquiposConVictorias() {
  const { data, error } = await supabase.from('partidas')
    .select('resultado, equipo_local_id, equipo_visitante_id')
    .not('resultado', 'is', null);

  if (error) return { data: null, error };

  const victorias = {};

  data.forEach(p => {
    const ganador = p.resultado === 'local' ? p.equipo_local_id : p.equipo_visitante_id;

    victorias[ganador] = (victorias[ganador] || 0) + 1;
  });

  return { data: victorias, error: null };
}
