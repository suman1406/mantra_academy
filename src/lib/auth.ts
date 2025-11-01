import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export function getTokenFromRequest(req: NextRequest) {
  // Prefer Authorization header
  const auth = req.headers.get("authorization");
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7);

  // Fall back to cookie named `token`
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/(^|;)\s*token=([^;\s]+)/);
  if (match) return match[2];
  return null;
}

export function requireAdmin(req: NextRequest) {
  const token = getTokenFromRequest(req as any as NextRequest);
  if (!token) return null;
  const payload = verifyToken(token);
  return payload;
}
