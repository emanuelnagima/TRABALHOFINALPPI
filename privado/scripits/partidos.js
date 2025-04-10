const cadastroForm = document.getElementById("cadastroForm");
let acao = "cadastrar";

function manipularEnvio(evento) {
    if (!cadastroForm.checkValidity()) {
        cadastroForm.classList.add("was-validated");
    } else {
        if (acao == "cadastrar") {
            adicionarPartido();
        } else if (acao == "atualizar") {
            atualizarPartido();
        } else if (acao == "excluir") {
            excluirPartido();
        }
        cadastroForm.reset();
        mostrarTabelaPartido();
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function pegarDadosPartido() {
    return {
        "codigo": document.getElementById("codigo").value,
        "nome": document.getElementById("nome").value,
        "sigla": document.getElementById("sigla").value
    };
}

function adicionarPartido() {
    const dados = pegarDadosPartido();

    fetch("http://localhost:5000/partidos", {
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

function atualizarPartido() {
    const dados = pegarDadosPartido();

    fetch(`http://localhost:5000/partidos/${dados.codigo}`, {
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

function excluirPartido() {
    const dados = pegarDadosPartido();

    fetch(`http://localhost:5000/partidos/${dados.codigo}`, {
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

function mostrarTabelaPartido() {
    fetch("http://localhost:5000/partidos", {
        method: "GET"
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.status) {
            const partidos = dados.partidos;
            const espacoTabela = document.getElementById("espacoTabela");

            if (partidos.length > 0) {
                espacoTabela.innerHTML = "";
                const tabela = document.createElement("table");
                tabela.className = "table table-striped table-hover";
                const thead = document.createElement("thead");
                const tbody = document.createElement("tbody");

                thead.innerHTML = `
                    <tr> 
                        <th>Código</th>
                        <th>Nome do Partido</th>
                        <th>Sigla</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                `;
                tabela.appendChild(thead);

                partidos.forEach(p => {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${p.codigo}</td>
                        <td>${p.nome}</td>
                        <td>${p.sigla}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="pegarPartido('${p.codigo}', '${p.nome}', '${p.sigla}', 'atualizar')"><i class="bi bi-pencil-square"></i></button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="pegarPartido('${p.codigo}', '${p.nome}', '${p.sigla}', 'excluir')"><i class="bi bi-trash-fill"></i></button>
                        </td>
                    `;
                    tbody.appendChild(linha);
                });

                tabela.appendChild(tbody);
                espacoTabela.appendChild(tabela);
            } else {
                mostrarMensagem("Não há partidos cadastrados.", "warning");
            }
        } else {
            mostrarMensagem(dados.mensagem, "danger");
        }
    })
    .catch(erro => {
        mostrarMensagem("Erro: " + erro, "danger");
    });
}

function pegarPartido(codigo, nome, sigla, novaAcao = "atualizar") {
    document.getElementById("codigo").value = codigo;
    document.getElementById("nome").value = nome;
    document.getElementById("sigla").value = sigla;

    if (novaAcao === "atualizar") {
        acao = "atualizar";
        document.getElementById("atualizar").disabled = false;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = true;
    } else if (novaAcao === "excluir") {
        acao = "excluir";
        document.getElementById("atualizar").disabled = true;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("excluir").disabled = false;
    }
}

cadastroForm.addEventListener("submit", manipularEnvio);


mostrarTabelaPartido();
