export default class Zona {
    id;
    nome;
    posto_id;
    created_at;
    updated_at;

    constructor(id, posto_id, nome, created_at, updated_at) {
        this.id = id;
        this.nome = nome;
        this.posto_id = posto_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
