import CandidatosDB from "../database/candidatos.DB.js";
export default class Candidato {
    #cpf;
    #tituloDeEleitor;
    #nome;
    #endereço;
    #número;
    #bairro;
    #cidade;
    #cep;
    #uf;
    #rendaMensal;
    
    constructor(cpf, tituloDeEleitor, nome, endereço, número, bairro, cidade, cep, uf, rendaMensal) {
        this.#cpf = cpf;
        this.#tituloDeEleitor = tituloDeEleitor;
        this.#nome = nome;
        this.#endereço = endereço;
        this.#número = número;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#cep = cep;
        this.#uf = uf;
        this.#rendaMensal = rendaMensal;
    }

    // Getters
    get cpf() {
        return this.#cpf;
    }

    get tituloDeEleitor() {
        return this.#tituloDeEleitor;
    }

    get nome() {
        return this.#nome;
    }

    get endereço() {
        return this.#endereço;
    }

    get número() {
        return this.#número;
    }

    get bairro() {
        return this.#bairro;
    }

    get cidade() {
        return this.#cidade;
    }

    get cep() {
        return this.#cep;
    }

    get uf() {
        return this.#uf;
    }

    get rendaMensal() {
        return this.#rendaMensal;
    }

    // Setters
    set tituloDeEleitor(novoTituloDeEleitor) {
        this.#tituloDeEleitor = novoTituloDeEleitor;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set endereço(novoEndereço) {
        this.#endereço = novoEndereço;
    }

    set número(novoNumero) {
        this.#número = novoNumero;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    set cidade(novoCidade) {
        this.#cidade = novoCidade;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }

    set uf(novoUf) {
        this.#uf = novoUf;
    }

    set rendaMensal(novaRendaMensal) {
        this.#rendaMensal = novaRendaMensal;
    }

    toJSON() {
        return {         
            cpf: this.#cpf,
            tituloDeEleitor: this.#tituloDeEleitor,
            nome: this.#nome,
            endereço: this.#endereço,
            número: this.#número,
            bairro: this.#bairro,
            cidade: this.#cidade,
            cep: this.#cep,
            uf: this.#uf,
            rendaMensal: this.#rendaMensal,
        };
    }



    async gravar() {
        const usuDB = new CandidatosDB();
        await usuDB.gravar(this);
    }
    
    async alterar() {
        const usuDB = new CandidatosDB();
        await usuDB.alterar(this);
    }
    

    async excluir() {
        const usuDB = new CandidatosDB();
        await usuDB.excluir(this);
    }

    async consultar() {
        const usuDB = new CandidatosDB();
        return await usuDB.consultar(this);
    }
}
