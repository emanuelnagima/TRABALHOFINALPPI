const cadastroForm2 = document.getElementById("cadastroForm2");
let acao = "cadastrar"; // Ação padrão

function manipularEnvio(evento) {
    if (!cadastroForm2.checkValidity()) {
        cadastroForm2.classList.add("was-validated");
    } else {
        if (acao == "cadastrar") {
            adicionarCandidato();
        } else if (acao == "atualizar") {
            atualizarCandidato();
        } else if (acao == "excluir") {
            excluirCandidato();
        }
        cadastroForm2.reset();
        mostrarTabelaCandidatos();
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function pegarDadosCandidato() {
    return {
        "cpf": document.getElementById("cpf").value,
        "tituloDeEleitor": document.getElementById("tituloDeEleitor").value,
        "nome": document.getElementById("nome").value,
        "endereco": document.getElementById("endereco").value,
        "numero": document.getElementById("numero").value,
        "bairro": document.getElementById("bairro").value,
        "cidade": document.getElementById("cidade").value,
        "cep": document.getElementById("cep").value,
        "uf": document.getElementById("uf").value,
        "rendaMensal": document.getElementById("rendaMensal").value
    };
}

function adicionarCandidato() {
    const dados = pegarDadosCandidato();

    fetch("http://localhost:5000/candidatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(res => mostrarMensagem(res.mensagem, "success"))
    .catch(err => mostrarMensagem("Erro: " + err, "danger"));
}

function atualizarCandidato() {
    const dados = pegarDadosCandidato();

    fetch(`http://localhost:5000/candidatos/${dados.cpf}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(res => mostrarMensagem(res.mensagem, "success"))
    .catch(err => mostrarMensagem("Erro: " + err, "danger"));
}

function excluirCandidato() {
    const dados = pegarDadosCandidato();

    fetch(`http://localhost:5000/candidatos/${dados.cpf}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(res => mostrarMensagem(res.mensagem, "success"))
    .catch(err => mostrarMensagem("Erro: " + err, "danger"));
}

function mostrarTabelaCandidatos() {
    fetch("http://localhost:5000/candidatos", {
        method: "GET"
    })
    .then(res => res.json())
    .then(dados => {
        const tabela = document.getElementById("espacoTabelaCandidatos");
        if (dados.status) {
            tabela.innerHTML = "";
            const candidatos = dados.candidatos;

            if (candidatos.length > 0) {
                const table = document.createElement("table");
                table.className = "table table-striped table-hover";

                const thead = document.createElement("thead");
                thead.innerHTML = `
                    <tr>
                        <th>CPF</th>
                        <th>Título</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Número</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>CEP</th>
                        <th>UF</th>
                        <th>Renda</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                `;
                table.appendChild(thead);

                const tbody = document.createElement("tbody");
                for (const c of candidatos) {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${c.cpf}</td>
                        <td>${c.tituloDeEleitor}</td>
                        <td>${c.nome}</td>
                        <td>${c.endereco}</td>
                        <td>${c.numero}</td>
                        <td>${c.bairro}</td>
                        <td>${c.cidade}</td>
                        <td>${c.cep}</td>
                        <td>${c.uf}</td>
                        <td>${c.rendaMensal}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="pegarCandidato(${JSON.stringify(c).replace(/"/g, '&quot;')}, 'atualizar')"><i class="bi bi-pencil-square"></i></button>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="pegarCandidato(${JSON.stringify(c).replace(/"/g, '&quot;')}, 'excluir')"><i class="bi bi-trash-fill"></i></button>
                        </td>
                    `;
                    tbody.appendChild(linha);
                }

                table.appendChild(tbody);
                tabela.appendChild(table);
            } else {
                mostrarMensagem("Nenhum candidato cadastrado.", "warning");
            }
        } else {
            mostrarMensagem(dados.mensagem, "danger");
        }
    })
    .catch(err => mostrarMensagem("Erro: " + err, "danger"));
}

function pegarCandidato(dados, novaAcao) {
    document.getElementById("cpf").value = dados.cpf;
    document.getElementById("tituloDeEleitor").value = dados.tituloDeEleitor;
    document.getElementById("nome").value = dados.nome;
    document.getElementById("endereco").value = dados.endereco;
    document.getElementById("numero").value = dados.numero;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("cidade").value = dados.cidade;
    document.getElementById("cep").value = dados.cep;
    document.getElementById("uf").value = dados.uf;
    document.getElementById("rendaMensal").value = dados.rendaMensal;

    acao = novaAcao;

    document.getElementById("cadastrar").disabled = novaAcao !== "cadastrar";
    document.getElementById("atualizar").disabled = novaAcao !== "atualizar";
    document.getElementById("excluir").disabled = novaAcao !== "excluir";
}

function mostrarMensagem(mensagem, tipo = "success") {
    const divMensagem = document.getElementById("mensagemCandidato");
    divMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}

// Evento e inicialização
cadastroForm2.addEventListener("submit", manipularEnvio);
mostrarTabelaCandidatos();
