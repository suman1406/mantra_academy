import { NextResponse } from "next/server";
import { verifyAdmin } from "../../../../services/adminService";
import { signToken } from "../../../../lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 });

    const admin = await verifyAdmin(email, password);
    if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = signToken({ email: (admin as any).email, id: (admin as any)._id });

    const res = NextResponse.json({ success: true });
    // Set httpOnly cookie so client JavaScript cannot read the token
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
