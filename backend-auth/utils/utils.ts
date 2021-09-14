import crypto, { BinaryLike } from "crypto";
import { Response } from "express";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET ?? "secretKey";
export function simpleHash(pass: BinaryLike) {
  return crypto.createHash("sha256").update(pass).digest("hex");
}

export function decodeJWT(accessToken: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await jwt.verify(accessToken, AUTH_SECRET);
      resolve(value);
    } catch (err) {
      reject(null);
    }
  });
}
export function responseValid(
  response: Response,
  data = {},
  message = "Success!",
  code = 200
) {
  response.status(code).send({ valid: true, message, data });
}
