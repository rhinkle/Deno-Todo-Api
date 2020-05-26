import { listTodo, getTodo } from "../service/todo.service.ts";

export async function listToDoController(contx: any) {
  const list = await listTodo();
  contx.response.body = list;
  contx.response.status = 200;
}

export async function getToDoController(contx: any) {
  try {
    const resp = await getTodo(contx.params.id);
    contx.response.body = resp;
    contx.response.status = 200;
  } catch (error) {
    contx.response.body = error.message;
    contx.response.status = error.status || 400;
  }
}
