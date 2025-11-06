import { NextResponse } from "next/server";
import { getCourseBySlug } from "../../../../services/courseService";
import { deleteCourse, createOrUpdateCourse } from "../../../../services/courseService";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);
    if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(course);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
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
  const { slug } = await params;
  try { console.debug('API /api/courses/[slug] PUT body for', slug, ':', JSON.stringify({ title: body.title, slug: body.slug, badges: body.badges })); } catch (e) {}
    // ensure slug matches
    body.slug = slug;
    const created = await createOrUpdateCourse(body);
    const doc: any = created as any;
    const serialized = {
      ...doc,
      _id: doc?._id ? String(doc._id) : undefined,
      createdAt: doc?.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
      updatedAt: doc?.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
      startDate: doc?.startDate ? new Date(doc.startDate).toISOString() : undefined,
    };
    return NextResponse.json(serialized);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
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

    const { slug } = await params;
    await deleteCourse(slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
