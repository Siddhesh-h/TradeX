import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import prisma from "./prisma.js";

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },

        async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    return done(null, false, {
                        message: "Invalid email or password",
                    });
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password,
                );

                if (!isPasswordValid) {
                    return done(null, false, {
                        message: "Invalid email or password",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        },
    ),
);

export default passport;
