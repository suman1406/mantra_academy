import { NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/jwt";
import { findAdminByEmail } from "../../../../services/adminService";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.split(";").map(c => c.trim()).find(c => c.startsWith("token="));
    if (!match) return NextResponse.json({ authenticated: false }, { status: 401 });

    const token = match.split("=")[1];
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ authenticated: false }, { status: 401 });

    // Optionally return admin info (email/id). Keep it minimal.
    const admin = await findAdminByEmail((payload as any).email);
    if (!admin) return NextResponse.json({ authenticated: false }, { status: 401 });

    return NextResponse.json({ authenticated: true, admin: { email: (admin as any).email, id: (admin as any)._id } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
