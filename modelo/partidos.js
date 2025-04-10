import PartidosDB from "../database/partidosDB.js";

export default class Partido {
    #codigo;
    #nomeDoPartido;
    #siglaDoPartido;
    
    constructor(codigo, nomeDoPartido, siglaDoPartido) {
        this.#codigo = codigo;
        this.#nomeDoPartido = nomeDoPartido;
        this.#siglaDoPartido = siglaDoPartido;
    }

    // Getters
    get codigo() {
        return this.#codigo;
    }

    get nomeDoPartido() {
        return this.#nomeDoPartido;
    }

    get siglaDoPartido() {
        return this.#siglaDoPartido;
    }

    // Setters
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    set nomeDoPartido(novoNomeDoPartido) {
        this.#nomeDoPartido = novoNomeDoPartido;
    }

    set siglaDoPartido(novaSiglaDoPartido) {
        this.#siglaDoPartido = novaSiglaDoPartido;
    }

    //  Método corrigido: nomes compatíveis com o front-end
    toJSON() {
        return {         
            codigo: this.#codigo,
            nome: this.#nomeDoPartido, 
            sigla: this.#siglaDoPartido 
        };
    }

    // Métodos assíncronos com await
    async gravar() {
        const usuDB = new PartidosDB();
        await usuDB.gravar(this);
    }
    
    async alterar() {
        const usuDB = new PartidosDB();
        await usuDB.alterar(this);
    }

    async excluir() {
        const usuDB = new PartidosDB();
        await usuDB.excluir(this);
    }

    async consultar() {
        const usuDB = new PartidosDB();
        return await usuDB.consultar(this);
    }
}
