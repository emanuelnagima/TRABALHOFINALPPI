import conectar from "./conexao.js";
import Partido from "../modelo/partidos.js";
export default class PartidosDB {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS partidos (
                codigo INT PRIMARY KEY,
                nomeDoPartido VARCHAR(35) NOT NULL,
                siglaDoPartido VARCHAR(10) NOT NULL
            )`;
            await conexao.execute(sql);
            conexao.release();
        } catch (erro) {
            console.log("Erro ao iniciar a tabela partidos: " + erro);
        }
    }

    async gravar(partido) {
        if (partido instanceof Partido) {
            try {
                const conexao = await conectar();
                const sql = `INSERT INTO partidos (codigo, nomeDoPartido, siglaDoPartido)
                             VALUES (?, ?, ?)`;
                const parametros = [
                    partido.codigo,
                    partido.nomeDoPartido,
                    partido.siglaDoPartido
                ];
                await conexao.execute(sql, parametros);
                conexao.release();
            } catch (erro) {
                console.log("Erro ao gravar partido: " + erro);
            }
        }
    }

    async alterar(partido) {
        if (partido instanceof Partido) {
            try {
                const conexao = await conectar();
                const sql = `UPDATE partidos SET nomeDoPartido = ?, siglaDoPartido = ? WHERE codigo = ?`;
                const parametros = [
                    partido.nomeDoPartido,
                    partido.siglaDoPartido,
                    partido.codigo
                ];
                await conexao.execute(sql, parametros);
                conexao.release();
            } catch (erro) {
                console.log("Erro ao alterar partido: " + erro);
            }
        }
    }

    async excluir(partido) {
        if (partido instanceof Partido) {
            try {
                const conexao = await conectar();
                const sql = `DELETE FROM partidos WHERE codigo = ?`;
                const parametros = [partido.codigo];
                await conexao.execute(sql, parametros);
                conexao.release();
            } catch (erro) {
                console.log("Erro ao excluir partido: " + erro);
            }
        }
    }

    async consultar() {
        try {
            const conexao = await conectar();
            const sql = `SELECT * FROM partidos ORDER BY nomeDoPartido`;
            const [registros, campos] = await conexao.execute(sql);
            conexao.release();

            let listaPartidos = [];
            for (const registro of registros) {
                const partido = new Partido(
                    registro.codigo,
                    registro.nomeDoPartido,
                    registro.siglaDoPartido
                );
                listaPartidos.push(partido);
            }
            return listaPartidos;
        } catch (erro) {
            console.log("Erro ao consultar partidos: " + erro);
            return [];
        }
    }
}
