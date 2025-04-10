// routes/rotaCandidatos.js
import { Router } from "express";
import CandidatoCtrl from "../controller/candidatosCtrl.js";

const rotaCandidato = Router(); // mini aplicação http
const candCtrl = new CandidatoCtrl();

rotaCandidato.get("/", candCtrl.consultar.bind(candCtrl));
rotaCandidato.post("/", candCtrl.gravar.bind(candCtrl));
rotaCandidato.put("/", candCtrl.alterar.bind(candCtrl));
rotaCandidato.patch("/", candCtrl.alterar.bind(candCtrl));
rotaCandidato.delete("/", candCtrl.excluir.bind(candCtrl));

export default rotaCandidato;
