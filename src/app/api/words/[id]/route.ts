import { NextResponse } from "next/server";
import { getWordById, deleteWord, createOrUpdateWord } from "../../../../services/wordService";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await getWordById(params.id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch word" }, { status: 500 });
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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = extractToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { verifyToken } = await import("../../../../lib/jwt");
    if (!verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    body._id = params.id;
    await createOrUpdateWord(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update word" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = extractToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { verifyToken } = await import("../../../../lib/jwt");
    if (!verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await deleteWord(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete word" }, { status: 500 });
  }
}
