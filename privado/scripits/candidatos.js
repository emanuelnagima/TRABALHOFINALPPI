let candidatoSelecionado = null;
let acao = "cadastrar";

document.addEventListener("DOMContentLoaded", () => {
  mostrarTabelaCandidatos();

  const form = document.getElementById("cadastroForm2");
  const btnAtualizar = document.getElementById("btnAtualizar");
    const btnExcluir = document.getElementById("btnExcluir");

  form.addEventListener("submit", (e) => manipularEnvio(e));
  btnAtualizar.addEventListener("click", () => {
    acao = "atualizar";
    manipularEnvio(new Event("submit"));
  });
  btnExcluir.addEventListener("click", () => {
    acao = "excluir";
    manipularEnvio(new Event("submit"));
  });
});

function manipularEnvio(evento) {
    evento.preventDefault();
  evento.stopPropagation();

  if (!document.getElementById("cadastroForm2").checkValidity()) {
    mostrarMensagem("Por favor, preencha todos os campos obrigatórios.", "warning");
    return;
  }

  if (acao === "cadastrar") {
    adicionarCandidato();
  } else if (acao === "atualizar") {
    atualizarCandidato();
  } else if (acao === "excluir") {
    excluirCandidato();
  }

    document.getElementById("cadastroForm2").reset();
  acao = "cadastrar";
  habilitarBotoesPadrao();
  mostrarTabelaCandidatos();
}

function pegarDadosFormulario() {
  return {
    cpf: parseInt(document.getElementById("cod").value),
    tituloDeEleitor: parseInt(document.getElementById("t").value),
    nome: document.getElementById("nome").value,
    bairro: document.getElementById("bar").value,
    cidade: document.getElementById("cid").value,
    cep: parseInt(document.getElementById("cep").value),
    uf: document.getElementById("uf").value,
    rendaMensal: document.getElementById("ren").value
  };
}

function adicionarCandidato() {
  const candidato = pegarDadosFormulario();
  fetch("http://localhost:5000/candidatos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidato)
  })
  .then(res => res.json())
  .then(dados => mostrarMensagem(dados.mensagem || "Candidato cadastrado!", "success"))
  .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function atualizarCandidato() {
  const candidato = pegarDadosFormulario();
  fetch(`http://localhost:5000/candidatos/${candidato.cpf}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidato)
  })
  .then(res => res.json())
    .then(dados => mostrarMensagem(dados.mensagem || "Candidato atualizado!", "success"))
  .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function excluirCandidato() {
  const candidato = pegarDadosFormulario();
    fetch(`http://localhost:5000/candidatos/${candidato.cpf}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(dados => mostrarMensagem(dados.mensagem || "Candidato excluído!", "success"))
  .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function mostrarTabelaCandidatos() {
  fetch("http://localhost:5000/candidatos", {
    method: "GET"
  })
  .then(res => res.json())
  .then(dados => {
    const espacoTabela = document.getElementById("espacoTabela");

    if (dados.status && dados.candidatos.length > 0) {
      const candidatos = dados.candidatos;

      espacoTabela.innerHTML = "";
      const tabela = document.createElement("table");
      tabela.className = "table table-striped table-hover";

      const thead = document.createElement("thead");
      thead.innerHTML = `
        <tr> 
          <th>CPF</th>
          <th>Título</th>
            <th>Nome</th>
            <th>Bairro</th>
          <th>Cidade</th>
          <th>CEP</th>
          <th>UF</th>
          <th>Renda</th>
          <th>Ações</th>
        </tr>
      `;
      tabela.appendChild(thead);

      const tbody = document.createElement("tbody");

      candidatos.forEach(candidato => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${candidato.cpf}</td>
          <td>${candidato.tituloDeEleitor}</td>
            <td>${candidato.nome}</td>
          <td>${candidato.bairro}</td>
                  <td>${candidato.cidade}</td>
          <td>${candidato.cep}</td>
          <td>${candidato.uf}</td>
          <td>${candidato.rendaMensal}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="preencherFormulario('${candidato.cpf}')">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="preencherFormulario('${candidato.cpf}', 'excluir')">Excluir</button>
          </td>
        `;
        tbody.appendChild(linha);
      });

      tabela.appendChild(tbody);
      espacoTabela.appendChild(tabela);
    } else {
      espacoTabela.innerHTML = "<p>Nenhum candidato cadastrado.</p>";
    }
  })
  .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function preencherFormulario(cpf, novaAcao = "atualizar") {
  fetch(`http://localhost:5000/candidatos/${cpf}`, {
    method: "GET"
  })
  .then(res => res.json())
  .then(candidato => {
    document.getElementById("cod").value = candidato.cpf;
    document.getElementById("t").value = candidato.tituloDeEleitor;
    document.getElementById("nome").value = candidato.nome;
    document.getElementById("bar").value = candidato.bairro;
    document.getElementById("cid").value = candidato.cidade;
        document.getElementById("cep").value = candidato.cep;
   
    document.getElementById("uf").value = candidato.uf;
    document.getElementById("ren").value = candidato.rendaMensal;

    acao = novaAcao;

    habilitarBotoesDeAcoes();
  })
  .catch(erro => mostrarMensagem("Erro: " + erro, "danger"));
}

function habilitarBotoesDeAcoes() {
  document.getElementById("btnAtualizar").disabled = false;
    document.getElementById("btnExcluir").disabled = false;
}

function habilitarBotoesPadrao() {
    document.getElementById("btnAtualizar").disabled = true;
  document.getElementById("btnExcluir").disabled = true;
}

function mostrarMensagem(mensagem, tipo = "success") {
  const espacoMensagem = document.getElementById("mensagem");
     espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
  setTimeout(() => {
    espacoMensagem.innerHTML = "";
  }, 5000);
}
