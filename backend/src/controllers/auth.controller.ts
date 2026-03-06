import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import * as authService from "../services/auth.service.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const googleLogin = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: "Token is required " });

        const payload = await authService.verifyGoogleToken(token);
        if (!payload || !payload.email) {
            return res.status(400).json({ message: "Invalid google token" });
        }

        const user = await authService.findOrCreateUser(
            payload.email,
            payload.name || "Anonymous",
            payload.sub,
            payload.picture || ""
        );

        //create our internal JWT
        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar
            },
            accessToken
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

//non google auth
const generateToken = (userId: string, email: string): string => {
    return jwt.sign({ userId, email }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    } as jwt.SignOptions);
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({
                error: "An account with this email already exists"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
            select: { id: true, name: true, email: true, createdAt: true },
        })

        const accessToken = generateToken(user.id, user.email);

        res.status(201).json({
            user: { id: user.id, email: user.email, name: user.name },
            accessToken
        });

        //create default
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

export const signin = async (req: Request, res: Response) => {
    console.log("you hit sign in")
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const accessToken = generateToken(user.id, user.email);

        res.json({
            user: { id: user.id, email: user.email, name: user, avatar: user.avatar },
            accessToken
        })


    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}
