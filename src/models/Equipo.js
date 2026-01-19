export class Equipo {
  constructor(data) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.juego = data.juego;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      juego: this.juego,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  toPublic() {
    return this.toJSON();
  }
}
