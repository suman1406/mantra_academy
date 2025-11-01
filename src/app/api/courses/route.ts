import { NextResponse } from "next/server";
import { getAllCourses, createOrUpdateCourse } from "../../../services/courseService";

export async function GET() {
  try {
    const courses = await getAllCourses();
    const plain = courses.map((c: any) => ({
      ...c,
      _id: c._id ? String(c._id) : undefined,
      createdAt: c.createdAt ? (new Date(c.createdAt)).toISOString() : undefined,
      updatedAt: c.updatedAt ? (new Date(c.updatedAt)).toISOString() : undefined,
      startDate: c.startDate ? (new Date(c.startDate)).toISOString() : undefined,
    }));
    return NextResponse.json(plain);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // verify admin token from Authorization header (Bearer) or cookie named 'token'
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
    return NextResponse.json({ error: "Failed to create/update course" }, { status: 500 });
  }
}
