// CAMADA DE CONTROLE

// Essa classe é responsável por controlar requisições HTTP para candidatos.
// As requisições HTTP são: GET, POST, PUT/PATCH, DELETE.

import Candidato from "../modelo/candidatos.js";

export default class CandidatoCtrl {

    // POST - Gravar novo candidato
    gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { codigo, nomeDoCandidato } = dados;

            if (codigo && nomeDoCandidato) {
                const candidato = new Candidato(codigo, nomeDoCandidato);
                candidato.gravar().then(() => {
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Candidato gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar o candidato no servidor: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Código e nome do candidato devem ser informados."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }

    // PUT ou PATCH - Alterar candidato existente
    alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { codigo, nomeDoCandidato } = dados;

            if (codigo && nomeDoCandidato) {
                const candidato = new Candidato(codigo, nomeDoCandidato);
                candidato.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato alterado com sucesso!!!!!!!!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao alterar o candidato: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Código e nome do candidato devem ser informados."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }

    // DELETE - Excluir candidato
    excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { codigo } = dados;

            if (codigo) {
                const candidato = new Candidato(codigo);
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato excluído com sucesso!!!!!!!!!!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir o candidato: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o código do candidato para exclusão."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }

    // GET - Consultar candidatos
    consultar(requisicao, resposta) {
        if (requisicao.method === 'GET') {
            const candidato = new Candidato();
            candidato.consultar().then((listaCandidatos) => {
                resposta.status(200).json({
                    status: true,
                    candidatos: listaCandidatos
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar candidatos: " + erro
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida."
            });
        }
    }
}
