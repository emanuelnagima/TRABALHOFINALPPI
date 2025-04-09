import { Router } from "express";
import PartidoCtrl from "../partidoCtrl.js";



const rotaPartido = Router(); //mini aplicação http
const usuCtrl = new PartidoCtrl();

rotaPartido.get("/", usuCtrl.consultar);
rotaPartido.post("/", usuCtrl.gravar);
rotaPartido.put("/", usuCtrl.alterar);
rotaPartido.patch("/", usuCtrl.alterar);
rotaPartido.delete("/",usuCtrl.excluir);

export default rotaPartido;