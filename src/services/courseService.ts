import connectToDatabase from "../lib/mongodb";
import { Course } from "../models/course";

export async function getAllCourses() {
  await connectToDatabase();
  return Course.find().sort({ createdAt: -1 }).lean();
}

export async function getCourseBySlug(slug: string) {
  await connectToDatabase();
  const doc = await Course.findOne({ slug }).lean();
  if (!doc) return null;
  const courseDoc: any = doc;
  // If total duration is missing but curriculum has lesson durations, compute total
  if ((courseDoc.duration === undefined || courseDoc.duration === null) && Array.isArray(courseDoc.curriculum)) {
    let total = 0;
    for (const section of courseDoc.curriculum) {
      if (Array.isArray(section.lessons)) {
        for (const lesson of section.lessons) {
          total += Number(lesson.durationMinutes || 0);
        }
      }
    }
    courseDoc.duration = total;
  }
  return courseDoc;
}

export async function createOrUpdateCourse(data: any) {
  await connectToDatabase();
  if (!data.slug) throw new Error("Course must have a slug");
  // Debug: log incoming data summary
  try {
    console.debug('createOrUpdateCourse incoming:', JSON.stringify({ slug: data.slug, title: data.title, badges: data.badges }));
  } catch (e) {}
  // Debug: list existing documents with this slug before update
  try {
    const existingDocs: any = await Course.find({ slug: data.slug }).lean();
    console.debug('createOrUpdateCourse existing docs count for slug', data.slug, existingDocs.length, existingDocs.map((d: any) => ({ _id: d._id ? String(d._id) : undefined, badges: d.badges })) );
  } catch (e) {}
  // Sanitize badges: remove any incoming subdocument _id fields to avoid merge-by-_id behavior
  const payload: any = { ...data };
  if (Array.isArray(data.badges)) {
    payload.badges = data.badges.map((b: any) => ({ title: b.title, subtitle: b.subtitle, icon: b.icon }));
  }
  // Perform a replace-style update to ensure the badges array is exactly what we expect.
  try {
    const existing: any = await Course.findOne({ slug: data.slug }).lean();
    if (existing) {
      // Build a new document by merging existing DB doc with incoming payload, but ensure badges is replaced
      const newDoc: any = { ...existing, ...payload };
      newDoc._id = existing._id; // preserve original _id
      // Remove mongoose internal fields that shouldn't be in the replace payload
      delete newDoc.__v;
      // replaceOne will overwrite the document entirely (except _id)
      await Course.replaceOne({ _id: existing._id }, newDoc, { upsert: true });
      const saved: any = await Course.findOne({ _id: existing._id }).lean();
      try { console.debug('createOrUpdateCourse replaced doc badges (after replaceOne):', JSON.stringify({ _id: saved?._id ? String(saved._id) : undefined, badges: saved?.badges })); } catch (e) {}
      return saved;
    } else {
      // No existing doc: create a new one
      const created: any = await Course.create(payload);
  const createdDoc: any = await Course.findOne({ _id: created._id }).lean();
  try { console.debug('createOrUpdateCourse created doc badges:', JSON.stringify({ _id: createdDoc?._id ? String(createdDoc._id) : undefined, badges: createdDoc?.badges })); } catch (e) {}
  return createdDoc;
    }
  } catch (e) {
    // fallback to a safe upsert if replace fails for any reason
    const updatePayload = { ...payload };
    delete updatePayload.badges;
    if (Array.isArray(payload.badges)) {
      await Course.updateOne({ slug: data.slug }, { $set: { badges: payload.badges } }, { upsert: true });
    }
    const doc = await Course.findOneAndUpdate({ slug: data.slug }, { $set: updatePayload }, { upsert: true, new: true, setDefaultsOnInsert: true }).lean();
    try { const docAny: any = doc; console.debug('createOrUpdateCourse fallback saved doc badges:', JSON.stringify({ _id: docAny?._id ? String(docAny._id) : undefined, badges: docAny?.badges })); } catch (e) {}
    return doc;
  }
}

export async function deleteCourse(slug: string) {
  await connectToDatabase();
  return Course.deleteOne({ slug });
}
