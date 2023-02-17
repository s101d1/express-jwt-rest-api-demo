import { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../common/config";

export class AuthController {

    public login = async (req: Request, res: Response, next: NextFunction) => {
        // The `passport.authenticate("local")` would invoke the callback code in `passport.use("local", new LocalStrategy(...))` in passportHandler.ts
        passport.authenticate("local", { session: false }, (err: any, user: any, info: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: info.message });
            } else {
                // Generate the JWT token. The token is set to expire in 10 minutes (check the JWT_EXPIRATION value in config.ts)
                // Remove the `{ expiresIn: JWT_EXPIRATION }` if you don't want to set the expiry
                const token = jwt.sign({ id: user }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
                // Return the token in the response
                return res.status(200).send({ token: token });
            }
        })(req, res, next);
    }

    public authenticateJWT(req: Request, res: Response, next: NextFunction) {
        // The `passport.authenticate("jwt")` would validate the JWT token from the request's Authorization header (e.g. `Bearer <token>`)
        // and then invoke the callback code in `passport.use("jwt", new JwtStrategy(...))` in passportHandler.ts
        passport.authenticate("jwt", { session: false }, function (err: any, user: any, info: any) {
            if (err) {
                return res.status(401).json({ message: "unauthorized" });
            }
            if (!user) {
                return res.status(401).json({ message: "unauthorized" });
            } else {
                // JWT token is validated, go to the next middleware handler
                return next();
            }
        })(req, res, next);
    }
}
