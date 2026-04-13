import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getGoogleAuthURL, getGoogleUserfromCode } from "../lib/googleAuth";


const generateToken = (userId: string, email: string): string => {
    return jwt.sign({ id: userId, email: email },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN ?? "7d" } as jwt.SignOptions
    );
}

//GET /auth/google
export async function googleRedirect(req: Request, res: Response) {
    const url = getGoogleAuthURL();
    res.json({ url });
}


//GET /auth/google/callback
export async function googleCallback(req: Request, res: Response) {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
        return res.status(400).json({ error: "Missing authorization code" });
    }
    try {
        //exchange code
        const googleUser = await getGoogleUserfromCode(code);

        //find or create user in DB
        let user = await prisma.user.findUnique({
            where: { googleId: googleUser.id },
        });

        if (!user) {
            user = await prisma.user.findUnique({
                where: { email: googleUser.email },
            });

            if (user) {
                //link google to existing manually-registered account
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        googleId: googleUser.id,
                        avatar: user.avatar ?? googleUser.picture
                    },
                });
            } else {
                //new user
                user = await prisma.user.create({
                    data: {
                        email: googleUser.email,
                        googleId: googleUser.id,
                        name: googleUser.name,
                        firstName: googleUser.firstName,
                        lastName: googleUser.lastName,
                        avatar: googleUser.picture
                    }
                });
            }
        }

        // issue jwt
        const accessToken = generateToken(user.id, user.email)

        //return json
        // return res.status(200).json({
        //     user : {
        //         id: user.id,
        //         email: user.email,
        //         name : user.name,
        //         firstName: user.firstName,
        //         lastName : user.lastName,
        //         avatar: user.avatar,
        //     },
        //     accessToken: accessToken
        // })
        const params = new URLSearchParams({
            accessToken: accessToken,
            id: user.id,
            email: user.email ?? "",
            name: user.name ?? "",
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            avatar: user.avatar ?? "",
        })

        return res.redirect(`${process.env.CLIENT_URL}/auth/callback?${params.toString()}`)

    } catch (err: any) {
        return res.redirect(`${process.env.CLIENT_URL}/signin?error=google_failed`);
    }

}

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        //get the credentials from the request
        const { name, email, password } = req.body;

        //make sure no field is undefined
        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email and password are required" });
            return;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(409).json({
                error: "An account with this email already exists"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
            select: { id: true, name: true, email: true, createdAt: true },
        });

        const accessToken = generateToken(user.id, user.email);
        res.status(201).json({
            user: { id: user.id, email: user.email, name: user.name },
            accessToken
        })
    } catch (err: any) {

    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //check to make sure neither email nor password is undefined
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        const accessToken = generateToken(user.id, user.email);
        res.json({
            user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
            accessToken
        })

    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}