
import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";

import { JWT_SECRET } from "./config";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// This code should be invoked when the `passport.authenticate("local",...`) middleware is called.
// In the callback, we would authenticate user name and password.
passport.use("local", new LocalStrategy({ usernameField: "userId", passwordField: "password" }, (userId, password, done) => {
    // In real life you would query the login data against database
    // but since this is just a simple demonstration, we just use fixed user id and password here
    if (userId === "admin" && password === "123456") {
        return done(null, userId);
    }

    return done(null, false, { message: "Invalid user name or password." });
}));

// This code should be invoked when the `passport.authenticate("jwt",...`) is called.
passport.use("jwt", new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET }, (jwtPayload, done) => {
    // You could validate the user id from JWT token payload against database at here if required
    // but since we don't use database here for sake of simplicity, we just do nothing here and return the callback

    return done(null, jwtPayload);
}));
