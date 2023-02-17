import { Request, Response } from 'express';
import { TodoService } from '../services/todos/todoService';

export class TodoController {
    private todoService: TodoService;

    constructor(todoService: TodoService) {
        this.todoService = todoService;
    }

    public getTodos = async (req: Request, res: Response) => {
        try {
            const todos = this.todoService.getTodos();
            return res.status(200).json(todos);
        } catch (error) {
            const e = error as Error;
            console.log(e.stack);
            return res.status(500).json({message: e.message});
        }
    };

    public getTodoById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const todo = this.todoService.getTodoById(id);
            if (!todo) {
                return res.status(404).json({message: "Not found"});
            }

            return res.status(200).json(todo);
        } catch (error) {
            const e = error as Error;
            console.log(e.stack);
            return res.status(500).json({message: e.message});
        }
    };
}
