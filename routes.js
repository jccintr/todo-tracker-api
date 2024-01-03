
import { Router } from 'express';
import Todo from "./models/todo.js";
import dotenv from 'dotenv';
import * as TodoController from "./controllers/TodoController.js";
import * as AuthController from "./controllers/AuthController.js";


dotenv.config();

const router = Router();

router.post("/register",AuthController.register);
router.post("/login",AuthController.login);
router.post("/todos",TodoController.store);
router.get("/users/todos",TodoController.index);
router.patch("/todos/:todoId/complete",TodoController.complete);



export default router;