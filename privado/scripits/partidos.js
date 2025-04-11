const cadastroForm = document.getElementById("cadastroForm");
let acao = "cadastrar";

cadastroForm.addEventListener("submit", manipularEnvio);
document.getElementById("atualizar").addEventListener("click", () => {
    acao = "atualizar";
    manipularEnvio(new Event("submit"));
});
document.getElementById("excluir").addEventListener("click", () => {
    acao = "excluir";
    manipularEnvio(new Event("submit"));
});

mostrarTabelaPartido();

function manipularEnvio(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    if (!cadastroForm.checkValidity()) {
        mostrarMensagem("Por favor, preencha todos os campos obrigatórios.", "warning");
        return;
    }

    if (acao === "cadastrar") {
        adicionarPartido();
    } else if (acao === "atualizar") {
        atualizarPartido();
    } else if (acao === "excluir") {
        excluirPartido();
    }

    cadastroForm.reset();
    acao = "cadastrar";
    
        habilitarBotoesPadrao();
    mostrarTabelaPartido();
}

function pegarDadosPartido() {
    return {
        "codigo": document.getElementById("codigo").value,
        "nome": document.getElementById("nome").value,
        "sigla": document.getElementById("sigla").value
    };
}

function adicionarPartido() {
    const dadosPartido = pegarDadosPartido();

    fetch("http://localhost:5000/partidos", {
        method: "POST",
       
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosPartido)
    })
    .then(res => res.json())
    .then(dados => mostrarMensagem(dados.mensagem, "success"))
        .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function atualizarPartido() {
    const dadosPartido = pegarDadosPartido();

    fetch(`http://localhost:5000/partidos/${dadosPartido.codigo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosPartido)
    })
    .then(res => res.json())
    .then(dados => mostrarMensagem(dados.mensagem, "success"))
    .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function excluirPartido() {
    const dadosPartido = pegarDadosPartido();

    fetch(`http://localhost:5000/partidos/${dadosPartido.codigo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    
    .then(dados => mostrarMensagem(dados.mensagem, "success"))
    .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function mostrarTabelaPartido() {
    fetch("http://localhost:5000/partidos", {
        method: "GET"
    })
    .then(res => res.json())
    .then(dadosRecebidos => {
        const espacoTabela = document.getElementById("espacoTabela");

        if (dadosRecebidos.status && dadosRecebidos.partidos.length > 0) {
            const partidos = dadosRecebidos.partidos;

            espacoTabela.innerHTML = "";
            const tabela = document.createElement("table");
            tabela.className = "table table-striped table-hover";

            const thead = document.createElement("thead");
            thead.innerHTML = `
                <tr> 
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Sigla</th>
                    <th>Ações</th>
                </tr>
            `;
            tabela.appendChild(thead);

                const tbody = document.createElement("tbody");

            partidos.forEach(partido => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${partido.codigo}</td>
                
                
                    <td>${partido.nome}</td>
                    <td>${partido.sigla}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="preencherFormulario('${partido.codigo}', '${partido.nome}', '${partido.sigla}', 'atualizar')">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="preencherFormulario('${partido.codigo}', '${partido.nome}', '${partido.sigla}', 'excluir')">Excluir</button>
                    </td>
                `;
                tbody.appendChild(linha);
            });

            tabela.appendChild(tbody);
            espacoTabela.innerHTML = "";
            espacoTabela.appendChild(tabela);
        } else {
            espacoTabela.innerHTML = "<p>Nenhum partido cadastrado.</p>";
        }
    })
    .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function preencherFormulario(codigo, nome, sigla, novaAcao) {
    document.getElementById("codigo").value = codigo;
   
    document.getElementById("nome").value = nome;
        document.getElementById("sigla").value = sigla;

    acao = novaAcao;

    document.getElementById("cadastrar").disabled = true;
        document.getElementById("atualizar").disabled = novaAcao !== "atualizar";
    document.getElementById("excluir").disabled = novaAcao !== "excluir";
}

function habilitarBotoesPadrao() {
    document.getElementById("cadastrar").disabled = false;
        document.getElementById("atualizar").disabled = true;
    document.getElementById("excluir").disabled = true;
}

function mostrarMensagem(mensagem, tipo = "success") {
    const espacoMensagem = document.getElementById("mensagem");
    espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
    setTimeout(() => {
        espacoMensagem.innerHTML = "";
    }, 5000);
}
