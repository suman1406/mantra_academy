import { NextResponse } from "next/server";
import { getAnnouncements } from "../../../services/announcementService";

export async function GET() {
  try {
    const items = await getAnnouncements();
    return NextResponse.json(items);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    let token = null;
    if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);
    if (!token) {
      const cookieHeader = req.headers.get("cookie") || "";
      const match = cookieHeader.match(/(^|;)\s*token=([^;\s]+)/);
      if (match) token = match[2];
    }
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { verifyToken } = await import("../../../lib/jwt");
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { createOrUpdateAnnouncement } = await import("../../../services/announcementService");
    await createOrUpdateAnnouncement(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create/update announcement" }, { status: 500 });
  }
}
