import { Router } from 'express';
import { AuthController } from '../controllers/authController';


export class AuthRoutes {
    public router: Router;
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post("/login", this.authController.login);
    }
}
