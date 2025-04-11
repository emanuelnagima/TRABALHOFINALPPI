
import CandidatosDB from "../database/candidatosDB.js";


export default class Candidato {
    #cpf;
    #tituloDeEleitor;
    #nome;
    #endereco;
    #numero;
        #bairro;
    #cidade;
    #cep;
    #uf;
    #rendaMensal;

    constructor(cpf, tituloDeEleitor, nome, endereco, numero, bairro, cidade, cep, uf, rendaMensal) {
        this.#cpf = cpf;
        this.#tituloDeEleitor = tituloDeEleitor;
         this.#nome = nome;
             this.#endereco = endereco;
         this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#cep = cep;
        this.#uf = uf;
        this.#rendaMensal = rendaMensal;
    }

    // Getters
    get cpf() { return this.#cpf; }
    get tituloDeEleitor() { return this.#tituloDeEleitor; }
        get nome() { return this.#nome; }
     get endereco() { return this.#endereco; }
        get numero() { return this.#numero; }
        get bairro() { return this.#bairro; }
    get cidade() { return this.#cidade; }
    get cep() { return this.#cep; }
    get uf() { return this.#uf; }
    get rendaMensal() { return this.#rendaMensal; }

    // Setters
    set cpf(valor) { this.#cpf = valor; }
    set tituloDeEleitor(valor) { this.#tituloDeEleitor = valor; }
    set nome(valor) { this.#nome = valor; }
    set endereco(valor) { this.#endereco = valor; }
     set numero(valor) { this.#numero = valor; }
    set bairro(valor) { this.#bairro = valor; }
     set cidade(valor) { this.#cidade = valor; }
    set cep(valor) { this.#cep = valor; }
    set uf(valor) { this.#uf = valor; }
    set rendaMensal(valor) { this.#rendaMensal = valor; }

    // Conversão para JSON
    toJSON() {
        return {
            cpf: this.#cpf,
            tituloDeEleitor: this.#tituloDeEleitor,
            nome: this.#nome,
            endereco: this.#endereco,
            numero: this.#numero,
            bairro: this.#bairro,
            cidade: this.#cidade,
            cep: this.#cep,
            uf: this.#uf,
            rendaMensal: this.#rendaMensal
        };
    }

    // Operações com o banco de dados
    async gravar() {
            const db = new CandidatosDB();
        await db.gravar(this);
    }

    async alterar() {
        const db = new CandidatosDB();
        await db.alterar(this);
    }

    async excluir() {
            const db = new CandidatosDB();
        await db.excluir(this);
    }

    async consultar() {
        const db = new CandidatosDB();
        return await db.consultar(this);
    }
}
