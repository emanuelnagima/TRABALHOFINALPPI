// routes/rotaCandidatos.js
import { Router } from "express";
import CandidatoCtrl from "../controller/candidatosCtrl.js";

const rotaCandidato = Router();
const candCtrl = new CandidatoCtrl();

rotaCandidato.get("/", candCtrl.consultar);
rotaCandidato.post("/", candCtrl.gravar);
rotaCandidato.put("/", candCtrl.alterar);
rotaCandidato.patch("/", candCtrl.alterar);
rotaCandidato.delete("/", candCtrl.excluir);

export default rotaCandidato;
