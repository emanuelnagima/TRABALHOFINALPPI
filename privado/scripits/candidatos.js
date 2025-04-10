const cadastroForm= document.getElementById("cadastroForm");
let acao = "cadastrar";

function manipularEnvio(evento) {
    if (!cadastroForm.checkValidity()) {
        cadastroForm.classList.add("was-validated");
    } else {
        if (acao == "cadastrar") {
            adicionarCandidato();
        } else if (acao == "atualizar") {
            atualizarCandidato();
        } else if (acao == "excluir") {
            excluirCandidato();
        }
        cadastroForm.reset();
        mostrarTabelaCandidato();
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function pegarDadosCandidato() {
    return {
        cpf: document.getElementById("cpf").value,
        titulo: document.getElementById("titulo").value,
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        numero: document.getElementById("numero").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        uf: document.getElementById("uf").value,
        cep: document.getElementById("cep").value,
        rendaMensal: document.getElementById("rendaMensal").value
    };
}

function adicionarCandidato() {
    const dados = pegarDadosCandidato();

    fetch("http://localhost:5000/candidatos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(dados => {
        mostrarMensagem(dados.mensagem, "success");
    })
    .catch(erro => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function atualizarCandidato() {
    const dados = pegarDadosCandidato();

    fetch(`http://localhost:5000/candidatos/${dados.cpf}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(dados => {
        mostrarMensagem(dados.mensagem, "success");
    })
    .catch(erro => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function excluirCandidato() {
    const dados = pegarDadosCandidato();

    fetch(`http://localhost:5000/candidatos/${dados.cpf}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(dados => {
        mostrarMensagem(dados.mensagem, "success");
    })
    .catch(erro => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function mostrarMensagem(mensagem, tipo = "success") {
    const espacoMensagem = document.getElementById("mensagem");
    espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
    setTimeout(() => {
        espacoMensagem.innerHTML = "";
    }, 5000);
}

function mostrarTabelaCandidato() {
    fetch("http://localhost:5000/candidatos", {
        method: "GET"
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.status) {
            const candidatos = dados.candidatos;
            const espacoTabela = document.getElementById("espacoTabela");

            if (candidatos.length > 0) {
                espacoTabela.innerHTML = "";
                const tabela = document.createElement("table");
                tabela.className = "table table-striped table-hover";
                const thead = document.createElement("thead");
                const tbody = document.createElement("tbody");

                thead.innerHTML = `
                    <tr>
                        <th>CPF</th>
                        <th>Título</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Número</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>CEP</th>
                        <th>Renda</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                `;
                tabela.appendChild(thead);
                for (let i = 0; i < usuarios.length; i++) {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${c.cpf}</td>
                        <td>${c.titulo}</td>
                        <td>${c.nome}</td>
                        <td>${c.endereco}</td>
                        <td>${c.numero}</td>
                        <td>${c.bairro}</td>
                        <td>${c.cidade}</td>
                        <td>${c.uf}</td>
                        <td>${c.cep}</td>
                        <td>${c.rendaMensal}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="pegarCandidato('${c.cpf}', '${c.titulo}', '${c.nome}', '${c.endereco}', '${c.numero}', '${c.bairro}', '${c.cidade}', '${c.uf}', '${c.cep}', '${c.rendaMensal}', 'atualizar')"><i class="bi bi-pencil-square"></i></button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="pegarCandidato('${c.cpf}', '${c.titulo}', '${c.nome}', '${c.endereco}', '${c.numero}', '${c.bairro}', '${c.cidade}', '${c.uf}', '${c.cep}', '${c.rendaMensal}', 'excluir')"><i class="bi bi-trash-fill"></i></button>
                        </td>
                    `;
                    corpo.appendChild(linha);
                }

                tabela.appendChild(corpo);
                espacoTabela.appendChild(tabela);
            } else {
                mostrarMensagem("Não há candidatos cadastrados.", "warning");
            }
        } else {
            mostrarMensagem(dados.mensagem, "danger");
        }
    })
    .catch(erro => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function pegarCandidato(cpf, titulo, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, novaAcao = "atualizar") {
    document.getElementById("cpf").value = cpf;
    document.getElementById("titulo").value = titulo;
    document.getElementById("nome").value = nome;
    document.getElementById("endereco").value = endereco;
    document.getElementById("numero").value = numero;
    document.getElementById("bairro").value = bairro;
    document.getElementById("cidade").value = cidade;
    document.getElementById("uf").value = uf;
    document.getElementById("cep").value = cep;
    document.getElementById("rendaMensal").value = rendaMensal;

    if (novaAcao === "atualizar") {
        acao = "atualizar";
        document.getElementById("atualizar") = false;
        document.getElementById("cadastrar") = true;
        document.getElementById("excluir")= true; /////////////////DESATIVEI O DESABLEEEEEEEEEEEEEEEEEEEEEEE
    } else if (novaAcao === "excluir") {
        acao = "excluir";
        document.getElementById("atualizar") = true;
        document.getElementById("cadastrar") = true;
        document.getElementById("excluir") = false;
    }
}

cadastroForm.addEventListener("submit", manipularEnvio);
mostrarTabelaCandidato();
