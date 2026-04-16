import { OAuth2Client } from "google-auth-library";

// Lazy getter — ensures env vars are loaded before client construction
function getClient() {
    return new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
}

export function getGoogleAuthURL(): string {
    return getClient().generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["openid", "email", "profile"]
    });
}

export async function getGoogleUserfromCode(code: string) {
    const client = getClient();

    //Exchange code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    //verify and decode the ID token
    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid Google ID token");

    return {
        id: payload.sub,
        email: payload.email!,
        name: payload.name,
        firstName: payload.given_name,
        lastName: payload.family_name,
        picture: payload.picture,
    }
}