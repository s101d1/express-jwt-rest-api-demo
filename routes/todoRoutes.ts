import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/authController';
import { TodoController } from '../controllers/todoController';
import { TodoService } from '../services/todos/todoService';


export class TodoRoutes {
    public router: Router;
    public todoController: TodoController = new TodoController(new TodoService());
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        // To protect an API with JWT authentication, simply call the `passport.authenticate("jwt",...)` middleware before the API controller call.
        // Alternatively you can wrap the `passport.authenticate("jwt")` call inside a function
        // and handle the authenticate callback so you can customize the error response (see the `AuthController.authenticateJWT` code)

        this.router.get("/",
            passport.authenticate("jwt", { session: false }),
            //this.authController.authenticateJWT,
            this.todoController.getTodos);

        this.router.get("/:id",
            passport.authenticate("jwt", { session: false }),
            //this.authController.authenticateJWT,
            this.todoController.getTodoById);
    }
}
