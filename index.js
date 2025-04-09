import express from "express";

import session from "express-session";
import autenticar from "./seguranca/autenticar.js";



const host = "0.0.0.0"; //     Disponível em qualquer interface
const porta = 5000;

const app = express(); //   Inicializa o app antes de usá-lo

// Configuração para processar os parâmetros do formulário
app.use(express.urlencoded({ extended: true }));

//   Preparar aplicação para manipular dados no formato JSON
app.use(express.json());

// Configuração de sessão
app.use(session({
    secret: "minhaChaveSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 30 } // 30 minutos
}));

//app.use("/usuarios", rotaUsuario);

// Rota para a página de login
app.get("/login", (req, res) => {
    res.redirect("/login.html");
});

// Rota para processar o login
app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === "admin" && senha === "admin") {
        req.session.autenticado = true;
        res.redirect("/index.html"); // Redireciona após login bem-sucedido
    } else {
        res.redirect('login.html');
    }
});

app.get("/logout",(req, res)=> {
    req.session.destroy();
    res.red('/login.html');
})
// Disponibilizando arquivos estáticos (público)
app.use(express.static("./publico"));

// Disponibilizando arquivos privados somente para usuários autenticados
app.use(autenticar, express.static("./privado"));




app.listen(porta, host, () => {
    console.log("Servidor backend em execução em http://" + host + ":" + porta);
});


//certo localhost:5000/index.html