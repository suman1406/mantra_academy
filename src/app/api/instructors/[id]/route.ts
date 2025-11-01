import { NextResponse } from "next/server";
import { getInstructorById, deleteInstructor, createOrUpdateInstructor } from "../../../../services/instructorService";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const item = await getInstructorById(params.id);
    return NextResponse.json(item);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch instructor" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // auth
    const auth = req.headers.get("authorization");
    let token = null;
    if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);
    if (!token) {
      const cookieHeader = req.headers.get("cookie") || "";
      const match = cookieHeader.match(/(^|;)\s*token=([^;\s]+)/);
      if (match) token = match[2];
    }
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { verifyToken } = await import("../../../../lib/jwt");
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await createOrUpdateInstructor({ ...body, _id: params.id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update instructor" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    // auth same as PUT
    const auth = _req.headers.get("authorization");
    let token = null;
    if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);
    if (!token) {
      const cookieHeader = _req.headers.get("cookie") || "";
      const match = cookieHeader.match(/(^|;)\s*token=([^;\s]+)/);
      if (match) token = match[2];
    }
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { verifyToken } = await import("../../../../lib/jwt");
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await deleteInstructor(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete instructor" }, { status: 500 });
  }
}
