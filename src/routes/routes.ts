import { Router } from "express";
import { usuarioController } from "../controllers/usuario.controller";
import { produtoController } from "../controllers/produto.controller";

const router = Router();

// Usuario
router.post("/usuario", usuarioController.create);
router.get("/usuario/:id", usuarioController.read);
router.get("/usuarios", usuarioController.readAll);
router.put("/usuario/:id", usuarioController.update);
router.delete("/usuario/:id", usuarioController.delete);

// Produto
router.post("/produto", produtoController.create);

export default router;
