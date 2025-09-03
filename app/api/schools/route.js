import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { schoolSchema } from "@/lib/validators";
import { saveImage } from "@/lib/saveImage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("DB connection failed:", err);
    return NextResponse.json(
      { success: false, message: "DB error", detail: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const payload = {
      name: form.get("name")?.toString() || "",
      address: form.get("address")?.toString() || "",
      city: form.get("city")?.toString() || "",
      state: form.get("state")?.toString() || "",
      contact: form.get("contact")?.toString() || "",
      email_id: form.get("email_id")?.toString() || "",
    };
    const file = form.get("image");

    // Validate
    const parsed = schoolSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (file && typeof file === "object") {
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (!allowed.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: "Only JPG/PNG/WEBP images allowed" },
          { status: 400 }
        );
      }
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: "Image must be <= 2MB" },
          { status: 400 }
        );
      }
    }

    const imageUrl = await saveImage(file, payload.name);

    const db = getDB();
    const [result] = await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        payload.name,
        payload.address,
        payload.city,
        payload.state,
        payload.contact,
        imageUrl,
        payload.email_id,
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
