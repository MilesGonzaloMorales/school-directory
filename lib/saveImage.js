import fs from "fs/promises";
import path from "path";

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function saveImage(file, nameForFile = "upload") {
  if (!file) return null;
  const ext = (file.type?.split("/")[1] || "png").toLowerCase();
  const filename = `${Date.now()}-${slugify(nameForFile)}.${ext}`;
  const savePath = path.join(process.cwd(), "public", "schoolImages", filename);
  await fs.mkdir(path.dirname(savePath), { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(savePath, buffer);
  return `/schoolImages/${filename}`;
}
