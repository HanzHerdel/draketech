import crypto from "crypto";
export function simpleHash(pass) {
    return crypto.createHash("sha256").update(pass).digest("hex");
}
