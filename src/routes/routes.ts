import { Router } from "express";
import { usuarioController } from "../controllers/usuario.controller";
import { produtoController } from "../controllers/produto.controller";
import { cupomController } from "../controllers/cupom.controller";
import { usuarioCadastraProdutoController } from "../controllers/usuarioCadastraProduto.controller";
import { usuarioPossuiCupomController } from "../controllers/usuarioPossuiCupom.controller";

const router = Router();

// Usuario
router.post("/usuario", usuarioController.create);
router.get("/usuario/:id", usuarioController.read);
router.get("/usuarios", usuarioController.readAll);
router.put("/usuario/:id", usuarioController.update);
router.delete("/usuario/:id", usuarioController.delete);

// Produto
router.post("/produto", produtoController.create);
router.get("/produto/:id", produtoController.read);
router.get("/produtos", produtoController.readAll);
router.put("/produto/:id", produtoController.update);
router.delete("/produto/:id", produtoController.delete);

// Cupom
router.post("/cupom", cupomController.create);
router.get("/cupom/:id", cupomController.read);
router.get("/cupons", cupomController.readAll);
router.put("/cupom/:id", cupomController.update);
router.delete("/cupom/:id", cupomController.delete);

// relacionamento Usuario cadastra Produto
router.post("/usuario/:idUsuario/produto/:idProduto", usuarioCadastraProdutoController.create);
router.delete("/usuario/produto/:idProduto", usuarioCadastraProdutoController.delete);

// relacionamento Usuario possui Cupom
router.post("/usuario/:idUsuario/cupom/:idCupom", usuarioPossuiCupomController.create);
router.delete("/usuario/cupom/:idCupom", usuarioPossuiCupomController.delete);

export default router;
