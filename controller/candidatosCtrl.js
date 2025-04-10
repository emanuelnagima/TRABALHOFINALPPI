// CAMADA DE CONTROLE - CandidatoCtrl.js

import Candidato from "../modelo/candidatos.js";
import CandidatosDB from "../database/candidatosDB.js";

export default class CandidatoCtrl {

    // POST - Gravar novo candidato
    async gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const {
                cpf,
                tituloDeEleitor,
                nome,
                endereco,
                numero,
                bairro,
                cidade,
                uf,
                cep,
                rendaMensal
            } = requisicao.body;

            if (cpf && tituloDeEleitor && nome && endereco && numero && bairro && cidade && uf && cep && rendaMensal) {
                const candidato = new Candidato(
                    cpf,
                    tituloDeEleitor,
                    nome,
                    endereco,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    cep,
                    rendaMensal
                );

                const db = new CandidatosDB();

                try {
                    await db.gravar(candidato);
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Candidato gravado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar o candidato: " + erro
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
                mensagem: "Requisição inválida. Envie dados em formato JSON."
            });
        }
    }

    // PUT ou PATCH - Alterar candidato
    async alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const {
                cpf,
                tituloDeEleitor,
                nome,
                endereco,
                numero,
                bairro,
                cidade,
                uf,
                cep,
                rendaMensal
            } = requisicao.body;

            if (cpf && tituloDeEleitor && nome && endereco && numero && bairro && cidade && uf && cep && rendaMensal) {
                const candidato = new Candidato(
                    cpf,
                    tituloDeEleitor,
                    nome,
                    endereco,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    cep,
                    rendaMensal
                );

                const db = new CandidatosDB();

                try {
                    await db.alterar(candidato);
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato alterado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao alterar o candidato: " + erro
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
                mensagem: "Requisição inválida. Envie dados em formato JSON."
            });
        }
    }

    // DELETE - Excluir candidato
    async excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const { cpf } = requisicao.body;

            if (cpf) {
                const candidato = new Candidato(cpf);
                const db = new CandidatosDB();

                try {
                    await db.excluir(candidato);
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato excluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir o candidato: " + erro
                    });
                }
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do candidato para exclusão."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida. Envie dados em formato JSON."
            });
        }
    }

    // GET - Consultar candidatos
    async consultar(requisicao, resposta) {
        if (requisicao.method === 'GET') {
            const db = new CandidatosDB();

            try {
                const listaCandidatos = await db.consultar();
                resposta.status(200).json({
                    status: true,
                    candidatos: listaCandidatos
                });
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar candidatos: " + erro
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
