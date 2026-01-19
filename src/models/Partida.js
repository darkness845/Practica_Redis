export class Partida {
  constructor(data) {
    this.id = data.id;
    this.torneo_id = data.torneo_id;
    this.equipo_local_id = data.equipo_local_id;
    this.equipo_visitante_id = data.equipo_visitante_id;
    this.resultado = data.resultado;
    this.fecha = data.fecha;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      torneo_id: this.torneo_id,
      equipo_local_id: this.equipo_local_id,
      equipo_visitante_id: this.equipo_visitante_id,
      resultado: this.resultado,
      fecha: this.fecha,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  toPublic() {
    return this.toJSON();
  }
}
