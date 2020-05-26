import { 
    assertEquals, 
    assertStrictEq, 
    assertThrows, 
    assertThrowsAsync } from "https://deno.land/std/testing/asserts.ts";
import { denock } from 'https://deno.land/x/denock/mod.ts';
import { HttpRequest } from '../request.service.ts';

Deno.test('getVerifyValid', async () => {

    denock({
        method: 'GET',
        protocol: 'https',
        host: 'jsonplaceholder.typicode.com',
        path: '/example',
        replyStatus: 200,
        responseBody: 'value'
    });

    const http = new HttpRequest();
    const resp = await http.get<string>('/example');
    assertEquals(resp, 'value');
});

Deno.test('getVerifyFailed', async () => {
    window.fetch = async (
        input: string | Request | URL,
        init?: RequestInit | undefined
    ): Promise<any> => {
        if (input === 'https://jsonplaceholder.typicode.com/exampleTwo' ) {
            throw new Error('The bunnies eat your response');
        }
    };
    const http = new HttpRequest();
    await assertThrowsAsync( async(): Promise<void> => {
        await http.get<string>('/exampleTwo');
    });
    
});