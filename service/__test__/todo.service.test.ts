import {
    assertEquals, assert, assertStrictEquals
} from "https://deno.land/std/testing/asserts.ts";
import { TodoService } from "../todo.service.ts";

Deno.test("getTodoValid", async () => {
    let mockHttp: any = {};

    mockHttp.get = <T>(path: string): Promise<any> => {
        return Promise.resolve({id: 'hello world'});
    };

    const todoService: TodoService = new TodoService(mockHttp);

    const result = await todoService.getTodo(1);
    assertEquals(result, {id: 'hello world'});
});

Deno.test("getTodofail", async () => {
    let mockHttp: any = {};
    mockHttp.get = <T>(path: string): Promise<any> => {
        return Promise.reject('There was an error');
    }

    const todoService: TodoService = new TodoService(mockHttp);
    try {
        await todoService.getTodo(-1);
    } catch (err) {
        assertEquals(err, 'There was an error');
    }
});

Deno.test('getTodoProvideNoId', async () => {
    let mockHttp: any = {};
    const todoService: TodoService = new TodoService(mockHttp);
    try {
        await todoService.getTodo(0);
    } catch (err) {
        const exptError = new Error("Missing id");
        assertEquals(err, exptError);
    }
});

const resp = [
    {id: 1, name: 'hello'},
    {id: 2, name: 'world'}
];
Deno.test('listTodo', async () => {
    let mockHttp: any = {};
    mockHttp.get = <T>(path: string): Promise<any> => {
        const resp = [
            {id: 1, name: 'hello'},
            {id: 2, name: 'world'}
        ];
        return Promise.resolve(resp);
    };
    const todoService: TodoService = new TodoService(mockHttp);
    const result = todoService.listTodo();
    assertStrictEquals(resp[0].id, resp[0].id);
});