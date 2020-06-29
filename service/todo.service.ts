import { HttpRequest } from "./request.service.ts";

interface ITodo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class TodoService {
  private httpReq: HttpRequest;

  constructor(private http: HttpRequest) {
    this.httpReq = http;
  }

  public async listTodo(): Promise<ITodo[]> {
    return this.httpReq.get<ITodo[]>("/todos");
  }
  
  public async getTodo(id: number): Promise<ITodo> {
    if (!id) {
      throw new Error("Missing id");
    }
    return this.httpReq.get<ITodo>(`/todos/${id}`);
  }
}
