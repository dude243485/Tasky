import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
    user?: { id: string; email: string };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = { id: decoded.id || decoded.userId, email: decoded.email };
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalid or expired" });
    }
}