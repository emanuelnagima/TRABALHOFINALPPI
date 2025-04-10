import CandidatosDB from "../database/candidatos.DB.js";

export default class Candidato {
    constructor(cpf, tituloDeEleitor, nome, endereco, numero, bairro, cidade, cep, uf, rendaMensal) {
        this.cpf = cpf;
        this.tituloDeEleitor = tituloDeEleitor;
        this.nome = nome;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.uf = uf;
        this.rendaMensal = rendaMensal;
    }

    toJSON() {
        return {
            cpf: this.cpf,
            tituloDeEleitor: this.tituloDeEleitor,
            nome: this.nome,
            endereco: this.endereco,
            numero: this.numero,
            bairro: this.bairro,
            cidade: this.cidade,
            cep: this.cep,
            uf: this.uf,
            rendaMensal: this.rendaMensal
        };
    }

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
        return await db.consultar();
    }
}
