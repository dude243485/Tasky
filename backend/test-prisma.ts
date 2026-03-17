import { prisma } from "./src/lib/prisma.js";

async function test() {
    try {
        console.log("Attempting to query the database...");
        const users = await prisma.user.findMany({ take: 1 });
        console.log("Success! Found users:", users);
    } catch (error) {
        console.error("Prisma Client Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

test();
