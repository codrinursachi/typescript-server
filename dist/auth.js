import * as argon2 from "argon2";
export function hashPassword(password) {
    return argon2.hash(password);
}
export function checkPasswordHash(password, hash) {
    return argon2.verify(hash, password);
}
