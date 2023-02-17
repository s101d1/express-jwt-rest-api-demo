const todos = [
    {
        id: "1",
        todo: "Todo 1"
    },
    {
        id: "2",
        todo: "Todo 2"
    },
    {
        id: "3",
        todo: "Todo 3"
    }
]

export class TodoService {
    constructor() {}

    public getTodos = () => {
        try {
            return todos;
        } catch (error) {
            throw error;
        }
    }

    public getTodoById = (id: string) => {
        try {
            return todos.find((e) => e.id === id);
        } catch (error) {
            throw error;
        }
    }
}
