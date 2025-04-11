

import Candidato from "../modelo/candidatos.js";

export default class CandidatoCtrl {

    // POST - Gravar novo candidato
    gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
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
            } = dados;

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

                candidato.gravar().then(() => {
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Candidato gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar o candidato: " + erro
                    });
                });
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
    alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
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
            } = dados;

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

                candidato.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato alterado com sucesso!"
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
    excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { cpf } = dados;

            if (cpf) {
                const candidato = new Candidato(cpf);
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato excluído com sucesso!"
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
