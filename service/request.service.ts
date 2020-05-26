
export class HttpRequest {
    private host: string;

    constructor() {
        this.host = 'https://jsonplaceholder.typicode.com';
    }

    public async get<T>(path: string): Promise<T> {
        try {
            const response = await fetch(`${this.host}${path}`);
            const body = await response.json();
            return body;
        } catch (error) {
            throw error;
        }
    }
}