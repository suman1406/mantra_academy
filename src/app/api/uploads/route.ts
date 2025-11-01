import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dataUrl } = body as { dataUrl?: string };
    if (!dataUrl) return NextResponse.json({ error: "No dataUrl provided" }, { status: 400 });

    // Basic server-side validation: ensure this is a data URL and an image, and limit size
    if (!dataUrl.startsWith('data:')) return NextResponse.json({ error: 'Invalid data URL' }, { status: 400 });
    const metaMatch = dataUrl.match(/^data:([^;]+);base64,/);
    if (!metaMatch) return NextResponse.json({ error: 'Invalid data URL format' }, { status: 400 });
    const mime = metaMatch[1];
    if (!mime.startsWith('image/')) return NextResponse.json({ error: 'Only image uploads are allowed' }, { status: 400 });
    const base64 = dataUrl.split(',')[1] || '';
    // estimate bytes from base64 string
    const padding = (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
    const bytes = Math.ceil((base64.length * 3) / 4) - padding;
    const MAX_BYTES = Number(process.env.UPLOAD_MAX_BYTES || String(5 * 1024 * 1024)); // default 5MB
    if (bytes > MAX_BYTES) return NextResponse.json({ error: 'File too large' }, { status: 400 });

    // dynamically import cloudinary so local dev without the package fails gracefully at runtime
    const cloudinary = (await import("cloudinary")).v2;
    const folder = process.env.CLOUDINARY_FOLDER || "mantra_images";

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder,
      use_filename: false,
      unique_filename: true,
      overwrite: true,
      resource_type: "image",
      transformation: [{ width: 1200, crop: 'limit' }],
    });

    // Return the useful bits for client and storage in DB
    return NextResponse.json({
      url: result.url || result.secure_url,
      secure_url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
