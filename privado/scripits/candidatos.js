const cadastroForm = document.getElementById("cadastroForm2");
let acao = "cadastrar";

function manipularEnvio(evento) {
    if (!cadastroForm.checkValidity()) {
        // Você pode mostrar validações aqui se quiser
    } else {
        if (acao === "cadastrar") {
            adicionarCandidato();
        } else if (acao === "atualizar") {
            atualizarCandidato();
        } else if (acao === "excluir") {
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
        cpf: document.getElementById("cod").value,
        tituloDeEleitor: document.getElementById("t").value,
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("sigla").value,
        numero: document.getElementById("num").value,
        bairro: document.getElementById("bar").value,
        cidade: document.getElementById("cid").value,
        uf: document.getElementById("uf").value,
        cep: document.getElementById("cep").value,
        rendaMensal: document.getElementById("ren").value
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
        mostrarMensagem("Erro: " + erro.message, "danger");
    });
}

function atualizarCandidato() {
    const dados = pegarDadosCandidato();

    fetch("http://localhost:5000/candidatos", {
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
        mostrarMensagem("Erro: " + erro.message, "danger");
    });
}

function excluirCandidato() {
    const dados = pegarDadosCandidato();

    fetch("http://localhost:5000/candidatos", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpf: dados.cpf })
    })
    .then(res => res.json())
    .then(dados => {
        mostrarMensagem(dados.mensagem, "success");
    })
    .catch(erro => {
        mostrarMensagem("Erro: " + erro.message, "danger");
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
    fetch("http://localhost:5000/candidatos")
    .then(res => res.json())
    .then(dados => {
        const espacoTabela = document.getElementById("espacoTabela");
        if (dados.status) {
            const candidatos = dados.candidatos;
            espacoTabela.innerHTML = "";

            if (candidatos.length > 0) {
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

                candidatos.forEach(c => {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${c.cpf}</td>
                        <td>${c.tituloDeEleitor}</td>
                        <td>${c.nome}</td>
                        <td>${c.endereco}</td>
                        <td>${c.numero}</td>
                        <td>${c.bairro}</td>
                        <td>${c.cidade}</td>
                        <td>${c.uf}</td>
                        <td>${c.cep}</td>
                        <td>${c.rendaMensal}</td>
                        <td><button class="btn btn-sm btn-warning" onclick="pegarCandidato('${c.cpf}', '${c.tituloDeEleitor}', '${c.nome}', '${c.endereco}', '${c.numero}', '${c.bairro}', '${c.cidade}', '${c.uf}', '${c.cep}', '${c.rendaMensal}', 'atualizar')"><i class="bi bi-pencil-square"></i></button></td>
                        <td><button class="btn btn-sm btn-danger" onclick="pegarCandidato('${c.cpf}', '${c.tituloDeEleitor}', '${c.nome}', '${c.endereco}', '${c.numero}', '${c.bairro}', '${c.cidade}', '${c.uf}', '${c.cep}', '${c.rendaMensal}', 'excluir')"><i class="bi bi-trash-fill"></i></button></td>
                    `;
                    tbody.appendChild(linha);
                });

                tabela.appendChild(tbody);
                espacoTabela.appendChild(tabela);
            } else {
                mostrarMensagem("Não há candidatos cadastrados.", "warning");
            }
        } else {
            mostrarMensagem(dados.mensagem, "danger");
        }
    })
    .catch(erro => {
        mostrarMensagem("Erro: " + erro.message, "danger");
    });
}

function pegarCandidato(cpf, titulo, nome, endereco, numero, bairro, cidade, uf, cep, renda, novaAcao = "atualizar") {
    document.getElementById("cod").value = cpf;
    document.getElementById("t").value = titulo;
    document.getElementById("nome").value = nome;
    document.getElementById("sigla").value = endereco;
    document.getElementById("num").value = numero;
    document.getElementById("bar").value = bairro;
    document.getElementById("cid").value = cidade;
    document.getElementById("uf").value = uf;
    document.getElementById("cep").value = cep;
    document.getElementById("ren").value = renda;

    acao = novaAcao;

    document.getElementById("atualizar").disabled = novaAcao !== "atualizar";
    document.getElementById("cadastrar").disabled = novaAcao !== "cadastrar";
    document.getElementById("excluir").disabled = novaAcao !== "excluir";
}

cadastroForm.addEventListener("submit", manipularEnvio);
mostrarTabelaCandidato();
