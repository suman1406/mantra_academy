import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cloudinary = (await import("cloudinary")).v2;
    // ensure cloudinary is configured via CLOUDINARY_URL env
    const config = (cloudinary as any).config?.() || {};
    const apiKey = config.api_key || process.env.CLOUDINARY_API_KEY;
    const apiSecret = config.api_secret || process.env.CLOUDINARY_API_SECRET;
    const cloudName = config.cloud_name || process.env.CLOUDINARY_CLOUD_NAME;

    if (!apiKey || !apiSecret) return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 });

    const timestamp = Math.floor(Date.now() / 1000);
    // Use Cloudinary utils to create a signature
    const signature = (cloudinary as any).utils.api_sign_request({ timestamp }, apiSecret);

    return NextResponse.json({ signature, timestamp, apiKey, cloudName });
  } catch (err) {
    console.error('Sign error', err);
    return NextResponse.json({ error: 'Could not create signature' }, { status: 500 });
  }
}
