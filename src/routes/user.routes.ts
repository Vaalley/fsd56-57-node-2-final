import { Router } from "express";
import controller from "../controllers/user.controller";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.get);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;
