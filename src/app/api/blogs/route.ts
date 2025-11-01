import { NextResponse } from "next/server";
import { getAllPosts } from "../../../services/blogService";

export async function GET() {
  try {
    const posts = await getAllPosts();
    const plain = posts.map((p: any) => ({
      ...p,
      _id: p._id ? String(p._id) : undefined,
      createdAt: p.createdAt ? (new Date(p.createdAt)).toISOString() : undefined,
      updatedAt: p.updatedAt ? (new Date(p.updatedAt)).toISOString() : undefined,
      date: p.date ? (new Date(p.date)).toISOString() : undefined,
    }));
    return NextResponse.json(plain);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
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
    const { createOrUpdatePost } = await import("../../../services/blogService");
    const created = await createOrUpdatePost(body);
    const doc: any = created as any;
    const serialized = {
      ...doc,
      _id: doc?._id ? String(doc._id) : undefined,
      createdAt: doc?.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
      updatedAt: doc?.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
      date: doc?.date ? new Date(doc.date).toISOString() : undefined,
    };
    return NextResponse.json(serialized);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create/update post" }, { status: 500 });
  }
}
