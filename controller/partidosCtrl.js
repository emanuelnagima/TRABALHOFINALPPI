// CAMADA DE CONTROLE - PartidoCtrl.js

import Partido from "../modelo/partidos.js";
import PartidosDB from "../database/partidosDB.js";

export default class PartidoCtrl {


    async gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const { codigo, nome, sigla } = requisicao.body;;

            if (codigo && nomeDoPartido && siglaDoPartido) {
                if (siglaDoPartido.length > 5) {
                    return resposta.status(400).json({
                        status: false,
                        mensagem: "A sigla do partido deve ter no máximo 5 caracteres."
                    });
                }

                const partido = new Partido(codigo, nome, sigla);
                const db = new PartidosDB();

                try {
                    await db.gravar(partido);
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Partido gravado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar o partido: " + erro
                    });
                }

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos devem ser informados."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }

    async alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const { codigo, nomeDoPartido, siglaDoPartido } = requisicao.body;

            if (codigo && nomeDoPartido && siglaDoPartido) {
                const partido = new Partido(codigo, nomeDoPartido, siglaDoPartido);
                const db = new PartidosDB();

                try {
                    await db.alterar(partido);
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Partido alterado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao alterar o partido: " + erro
                    });
                }

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos devem ser informados."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }


    async excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const { codigo } = requisicao.body;

            if (codigo) {
                const partido = new Partido(codigo);
                const db = new PartidosDB();

                try {
                    await db.excluir(partido);
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Partido excluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir o partido: " + erro
                    });
                }

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o código do partido para exclusão."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }

    // GET - Consultar partidos
    async consultar(requisicao, resposta) {
        if (requisicao.method === 'GET') {
            const db = new PartidosDB();

            try {
                const listaPartidos = await db.consultar();
                resposta.status(200).json({
                    status: true,
                    partidos: listaPartidos
                });
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar partidos: " + erro
                });
            }

        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }
}
