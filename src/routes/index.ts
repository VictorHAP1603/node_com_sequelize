import { Router } from "express";

import * as HomeController from "../controllers/homeController";
import * as InfoController from "../controllers/infoController";
import * as UserController from "../controllers/userController";

const router = Router();

router.get("/", HomeController.home);

router.get("/contato", InfoController.contato);
router.get("/sobre", InfoController.sobre);

router.get("/nome", UserController.nome);
router.get("/idade", UserController.idadeForm);
router.post("/idade-resultado", UserController.idadeAction);

// cadastro
router.get("/cadastro", UserController.registerPage);
router.post("/cadastrousuario", UserController.register);

// açoes
router.get("/user/excluir/:id", UserController.remove);
router.get("/user/aumentar/:id", UserController.increment);
router.get("/user/diminuir/:id", UserController.decrement);

export default router;
