import * as argon2 from "argon2";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export function hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
}

export function checkPasswordHash(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
}

export function makeJWT(userID: string, expiresIn: number, secret: string): string {
    type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;
    const payloadData: payload = {
        iss: "chirpy",
        sub: userID,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + expiresIn,
    };
    const token = sign(payloadData, secret);
    return token;
}

export function validateJWT(tokenString: string, secret: string): string {
    const decoded = verify(tokenString, secret);

    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }

    if (typeof decoded.sub !== "string") {
        throw new Error("Invalid token payload");
    }

    return decoded.sub;
}