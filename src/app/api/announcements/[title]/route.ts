import { NextResponse } from "next/server";
import { getAnnouncements, deleteAnnouncement, createOrUpdateAnnouncement } from "../../../../services/announcementService";

export async function GET(
  _request: Request,
  { params }: { params: { title: string } }
) {
  try {
    const items = await getAnnouncements();
    const item = items.find(a => a.title === decodeURIComponent(params.title));
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch announcement" }, { status: 500 });
  }
}

function extractToken(req: Request) {
  const auth = req.headers.get("authorization");
  let token = null;
  if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);
  if (!token) {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(^|;)\s*token=([^;\s]+)/);
    if (match) token = match[2];
  }
  return token;
}

export async function PUT(req: Request, { params }: { params: { title: string } }) {
  try {
    const token = extractToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { verifyToken } = await import("../../../../lib/jwt");
    if (!verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    body.title = decodeURIComponent(params.title);
    await createOrUpdateAnnouncement(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { title: string } }) {
  try {
    const token = extractToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { verifyToken } = await import("../../../../lib/jwt");
    if (!verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await deleteAnnouncement(decodeURIComponent(params.title));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
  }
}
