import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import { AuthRoutes } from "./routes/authRoutes";
import { TodoRoutes } from "./routes/todoRoutes";
import compression from "compression";
import cors from "cors";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        require("./common/passportHandler");
        var cookieParser = require('cookie-parser');
        var logger = require('morgan');

        this.app.set("port", process.env.PORT || 3000);
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void {
        this.app.use("/auth", new AuthRoutes().router);
        this.app.use("/todos", new TodoRoutes().router);

        // // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            next(createError(404));
        });

        // error handler
        this.app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.send({message: err.message})
        });
    }

    public start(): void {
        const port = this.app.get("port");
        this.app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
}

const server = new Server();
server.start();
