
import { Router } from 'express';
import * as TodoController from "./controllers/TodoController.js";
import * as AuthController from "./controllers/AuthController.js";

const router = Router();

router.post("/register",AuthController.register);
router.post("/login",AuthController.login);
router.post("/todos",TodoController.store);
router.get("/users/todos",TodoController.index);
router.patch("/todos/:todoId/complete",TodoController.complete);
router.delete("/todos/:todoId",TodoController.destroy);



export default router;