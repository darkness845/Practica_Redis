export class Torneo {
  constructor(data) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.juego = data.juego;
    this.fecha_inicio = data.fecha_inicio;
    this.fecha_fin = data.fecha_fin;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      juego: this.juego,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  toPublic() {
    return this.toJSON();
  }
}
