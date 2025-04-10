// CAMADA DE BANCO DE DADOS - candidatosDB.js

import Candidato from "../modelo/candidatos.js";
import conectar from "./conexao.js";

export default class CandidatosDB {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS candidatos (
                cpf INT PRIMARY KEY,
                tituloDeEleitor INT NOT NULL,
                nome VARCHAR(30) NOT NULL,
                endereco VARCHAR(40) NOT NULL,
                numero INT,
                bairro VARCHAR(40) NOT NULL,
                cidade VARCHAR(40) NOT NULL,
                cep INT,
                uf VARCHAR(15) NOT NULL,
                rendaMensal DECIMAL(5,2)
            )`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (erro) {
            console.log("Erro ao iniciar a tabela candidatos: " + erro);
        }
    }

    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `INSERT INTO candidatos (cpf, tituloDeEleitor, nome, endereco, numero, bairro, cidade, cep, uf, rendaMensal)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                candidato.cpf,
                candidato.tituloDeEleitor,
                candidato.nome,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.cidade,
                candidato.cep,
                candidato.uf,
                candidato.rendaMensal
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `UPDATE candidatos 
                         SET tituloDeEleitor = ?, nome = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, cep = ?, uf = ?, rendaMensal = ?
                         WHERE cpf = ?`;
            const parametros = [
                candidato.tituloDeEleitor,
                candidato.nome,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.cidade,
                candidato.cep,
                candidato.uf,
                candidato.rendaMensal,
                candidato.cpf
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `DELETE FROM candidatos WHERE cpf = ?`;
            const parametros = [candidato.cpf];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM candidatos ORDER BY cpf`;
        const [registros] = await conexao.execute(sql);
        await conexao.release();

        let listaCandidatos = [];
        for (const registro of registros) {
            const candidato = new Candidato(
                registro.cpf,
                registro.tituloDeEleitor,
                registro.nome,
                registro.endereco,
                registro.numero,
                registro.bairro,
                registro.cidade,
                registro.cep,
                registro.uf,
                registro.rendaMensal
            );
            listaCandidatos.push(candidato);
        }
        return listaCandidatos;
    }
}
