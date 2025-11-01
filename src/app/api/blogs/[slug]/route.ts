import { NextResponse } from "next/server";
import { getPostBySlug } from "../../../../services/blogService";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
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

    const { verifyToken } = await import("../../../../lib/jwt");
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { createOrUpdatePost } = await import("../../../../services/blogService");
    body.slug = params.slug;
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
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
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

    const { verifyToken } = await import("../../../../lib/jwt");
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { deletePost } = await import("../../../../services/blogService");
    await deletePost(params.slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

