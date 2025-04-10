import { Router } from "express";
import PartidoCtrl from "../controller/partidosCtrl.js";

const rotaPartido = Router(); //mini aplicação http
const usuCtrl = new PartidoCtrl();

rotaPartido.get("/", usuCtrl.consultar.bind(usuCtrl));
rotaPartido.post("/", usuCtrl.gravar.bind(usuCtrl));
rotaPartido.put("/", usuCtrl.alterar.bind(usuCtrl));
rotaPartido.patch("/", usuCtrl.alterar.bind(usuCtrl));
rotaPartido.delete("/", usuCtrl.excluir.bind(usuCtrl));

export default rotaPartido;
