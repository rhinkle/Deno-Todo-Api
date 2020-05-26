import { Router } from "https://deno.land/x/oak/mod.ts";
import healthCheckController from "./controller/health-check.controller.ts";
import { listToDoController, getToDoController } from "./controller/todo.controller.ts";

const router = new Router();
router
    .get('/', healthCheckController)
    .get('/todos', listToDoController)
    .get('/todos/:id', getToDoController)
    .get('/health-check', healthCheckController);


export default router;