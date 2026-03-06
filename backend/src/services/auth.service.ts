import { OAuth2Client } from "google-auth-library";
import { prisma } from "../lib/prisma.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const verifyGoogleToken = async (token: string) => {
    //making sure googleId is actually defined
    const googleId = process.env.GOOGLE_CLIENT_ID;
    if (!googleId) {
        throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables");
    }

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleId,
    })

    return ticket.getPayload();
}

export const findOrCreateUser = async (email: string, name: string, googleId: string, avatar: string) => {
    return await prisma.user.upsert({
        where: { email },
        update: { googleId, avatar },
        create: { email, name, googleId, avatar },
    })
}
