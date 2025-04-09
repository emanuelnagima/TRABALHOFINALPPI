import { Router } from "express";
import CandidatoCtrl from "../usuarioCtrl.js";



const rotaCandidato = Router(); //mini aplicação http
const usuCtrl = new CandidatoCtrl();

rotaCandidato.get("/", usuCtrl.consultar);
rotaCandidato.post("/", usuCtrl.gravar);
rotaCandidato.put("/", usuCtrl.alterar);
rotaCandidato.patch("/", usuCtrl.alterar);
rotaCandidato.delete("/",usuCtrl.excluir);

export default rotaCandidato;