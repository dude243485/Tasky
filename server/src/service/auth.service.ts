import { prisma } from "../lib/prisma";


export const findOrCreateUser = async (email: string, name : string, googleId : string, avatar : string) => {
    return await prisma.user.upsert({
        where : { email },
        update : { googleId, avatar },
        create: { email, name, googleId, avatar},
    })
}