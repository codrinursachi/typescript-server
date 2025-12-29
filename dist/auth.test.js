import { describe, it, expect, beforeAll } from "vitest";
import { checkPasswordHash, hashPassword, makeJWT, validateJWT } from "./auth";
describe("Password Hashing", () => {
    const password1 = "correctPassword123!";
    const password2 = "anotherPassword456!";
    const wrongPassword = "wrongPassword";
    let hash1;
    let hash2;
    let hash1Again;
    beforeAll(async () => {
        hash1 = await hashPassword(password1);
        hash2 = await hashPassword(password2);
        hash1Again = await hashPassword(password1);
    });
    it("should return true for the correct password", async () => {
        const result = await checkPasswordHash(password1, hash1);
        expect(result).toBe(true);
    });
    it("should return false for an incorrect password", async () => {
        const result = await checkPasswordHash(wrongPassword, hash1);
        expect(result).toBe(false);
    });
    it("should not validate different passwords against each other's hashes", async () => {
        await expect(checkPasswordHash(password1, hash2)).resolves.toBe(false);
        await expect(checkPasswordHash(password2, hash1)).resolves.toBe(false);
    });
    it("should produce different hashes for the same password (random salt)", () => {
        expect(hash1).not.toBe(hash1Again);
    });
});
describe("JWT", () => {
    const secret = "super-secret";
    const otherSecret = "other-secret";
    const userID = "user_123";
    it("should round-trip user id through makeJWT + validateJWT", () => {
        const token = makeJWT(userID, 60, secret);
        const decodedUserID = validateJWT(token, secret);
        expect(decodedUserID).toBe(userID);
    });
    it("should throw when validating with the wrong secret", () => {
        const token = makeJWT(userID, 60, secret);
        expect(() => validateJWT(token, otherSecret)).toThrow();
    });
    it("should throw for malformed tokens", () => {
        expect(() => validateJWT("not-a-jwt", secret)).toThrow();
    });
    it("should throw for expired tokens", () => {
        const token = makeJWT(userID, -10, secret);
        expect(() => validateJWT(token, secret)).toThrow();
    });
    it("should throw if token payload does not contain a string sub", async () => {
        const { sign } = await import("jsonwebtoken");
        const token = sign({ iss: "chirpy" }, secret);
        expect(() => validateJWT(token, secret)).toThrow(/Invalid token payload/);
    });
});
