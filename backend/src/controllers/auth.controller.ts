import { type Request, type Response} from "express";
import jwt from "jsonwebtoken";
import * as authService from "../services/auth.service.js";

export const googleLogin = async (req : Request, res : Response) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message : "Token is required "});

            const payload = await authService.verifyGoogleToken(token);
            if (!payload || !payload.email){
                return res.status(400).json({ message : "Invalid google token"});
            }

            const user = await authService.findOrCreateUser(
                payload.email,
                payload.name || "Anonymous",
                payload.sub,
                payload.picture || ""
            );

            //create our internal JWT
            const accessToken = jwt.sign(
                {id : user.id, email: user.email },
                process.env.JWT_SECRET!,
                { expiresIn : "7d"}
            );
            
            res.json({
                user: {
                    id : user.id,
                    email : user.email,
                    name : user.name,
                    avatar : user.avatar
                },
                accessToken
            });
    } catch(error : any) {
        res.status(500).json({ message : error.message });
    }
}
