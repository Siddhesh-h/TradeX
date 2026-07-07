import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.$transaction(async (tx) => {
            return tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,

                    account: {
                        create: {
                            availableCash: 100000,
                            usedMargin: 0,
                        },
                    },
                },

                include: {
                    account: true,
                },
            });
        });

        res.status(201).json({
            message: "Account created successfully",

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                account: user.account,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);

        res.status(500).json({
            message: "Failed to create account",
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = req.user;

        const token = jwt.sign(
            {
                userId: user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error", error);

        res.status(500).json({
            message: "Login failed",
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },

            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,

                account: {
                    select: {
                        availableCash: true,
                        usedMargin: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user,
        });
    } catch (error) {
        console.error("Get user error:", error);

        res.status(500).json({
            message: "Failed to fetch user",
        });
    }
};
export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.status(200).json({
        message: "Logout successful",
    });
};
