export class Jugador {
  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.email = data.email;
    this.equipo_id = data.equipo_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      nickname: this.nickname,
      email: this.email,
      equipo_id: this.equipo_id,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  toPublic() {
    return {
      id: this.id,
      nickname: this.nickname,
      equipo_id: this.equipo_id
    };
  }
}
