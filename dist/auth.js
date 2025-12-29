import * as argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";
export function hashPassword(password) {
    return argon2.hash(password);
}
export function checkPasswordHash(password, hash) {
    return argon2.verify(hash, password);
}
export function makeJWT(userID, expiresIn, secret) {
    const payloadData = {
        iss: "chirpy",
        sub: userID,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + expiresIn,
    };
    const token = sign(payloadData, secret);
    return token;
}
export function validateJWT(tokenString, secret) {
    const decoded = verify(tokenString, secret);
    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }
    if (typeof decoded.sub !== "string") {
        throw new Error("Invalid token payload");
    }
    return decoded.sub;
}
