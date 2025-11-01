import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your environment (.env.local)");
}

export function signToken(payload: object, opts?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "7d", ...(opts || {}) });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET as string) as any;
  } catch (err) {
    return null;
  }
}
