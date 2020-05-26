import { HttpRequest } from "./request.service.ts";

interface ITodo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const http = new HttpRequest();

export async function listTodo(): Promise<ITodo[]> {
  return http.get<ITodo[]>("/todos");
}

export async function getTodo(id: number): Promise<ITodo> {
  if (!id) {
    throw new Error("Missing id");
  }
  return http.get<ITodo>(`/todos/${id}`);
}
