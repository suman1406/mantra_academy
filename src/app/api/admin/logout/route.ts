import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = NextResponse.json({ success: true });
    // Clear cookie by setting maxAge to 0
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 0,
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
