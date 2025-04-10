import conectar from "./conexao.js";
import Candidato from "../modelo/candidatos.js";

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
                endereço VARCHAR(40) NOT NULL,
                número INT,
                bairro VARCHAR(40) NOT NULL,
                cidade VARCHAR(40) NOT NULL,
                cep INT,
                uf VARCHAR(15) NOT NULL,
                rendaMensal DECIMAL(5,2)
            )`;
            await conexao.execute(sql);
            conexao.release();
        } catch (erro) {
            console.log("Erro ao iniciar a tabela candidatos: " + erro);
        }
    }

    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            try {
                const conexao = await conectar();
                const sql = `INSERT INTO candidatos (cpf, tituloDeEleitor, nome, endereço, número, bairro, cidade, cep, uf, rendaMensal)
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const parametros = [
                    candidato.cpf,
                    candidato.tituloDeEleitor,
                    candidato.nome,
                    candidato.endereço,
                    candidato.número,
                    candidato.bairro,
                    candidato.cidade,
                    candidato.cep,
                    candidato.uf,
                    candidato.rendaMensal
                ];
                await conexao.execute(sql, parametros);
                conexao.release();
            } catch (erro) {
                console.log("Erro ao gravar candidato: " + erro);
            }
        }
    }

    async alterar(candidato) {
        if (candidato instanceof Candidato) {
            try {
                const conexao = await conectar();
                const sql = `UPDATE candidatos SET cpf = ?, tituloDeEleitor = ?, nome = ?, endereço = ?, número = ?, bairro = ?, cidade = ?, cep = ?, uf = ?, rendaMensal = ? WHERE cpf = ?`;
                const parametros = [
                    candidato.cpf,
                    candidato.tituloDeEleitor,
                    candidato.nome,
                    candidato.endereço,
                    candidato.número,
                    candidato.bairro,
                    candidato.cidade,
                    candidato.cep,
                    candidato.uf,
                    candidato.rendaMensal,
                    candidato.cpf
                ];
                await conexao.execute(sql, parametros);
                conexao.release();
            } catch (erro) {
                console.log("Erro ao alterar candidato: " + erro);
            }
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            try {
                const conexao = await conectar();
                const sql = `DELETE FROM candidatos WHERE cpf = ?`;
                const parametros = [candidato.cpf];
                await conexao.execute(sql, parametros);
                conexao.release();
            } catch (erro) {
                console.log("Erro ao excluir candidato: " + erro);
            }
        }
    }

    async consultar() {
        try {
            const conexao = await conectar();
            const sql = `SELECT * FROM candidatos ORDER BY cpf`;
            const [registros] = await conexao.execute(sql);
            conexao.release();

            let listaCandidatos = [];
            for (const registro of registros) {
                const candidato = new Candidato(
                    registro.cpf,
                    registro.tituloDeEleitor,
                    registro.nome,
                    registro.endereço,
                    registro.número,
                    registro.bairro,
                    registro.cidade,
                    registro.cep,
                    registro.uf,
                    registro.rendaMensal
                );
                listaCandidatos.push(candidato);
            }
            return listaCandidatos;
        } catch (erro) {
            console.log("Erro ao consultar candidatos: " + erro);
            return [];
        }
    }
}
