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

//   // If Cloudinary envs exist, upload there
//   if (
//     process.env.CLOUDINARY_CLOUD_NAME &&
//     process.env.CLOUDINARY_API_KEY &&
//     process.env.CLOUDINARY_API_SECRET
//   ) {
//     const { v2: cloudinary } = await import("cloudinary");
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     const bytes = Buffer.from(await file.arrayBuffer());
//     const upload = () =>
//       new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "schoolImages", resource_type: "image" },
//           (err, result) => (err ? reject(err) : resolve(result))
//         );
//         stream.end(bytes);
//       });
//     const result = await upload();
//     return result.secure_url; // Cloudinary URL
//   }

  // Save locally
  const ext = (file.type?.split("/")[1] || "png").toLowerCase();
  const filename = `${Date.now()}-${slugify(nameForFile)}.${ext}`;
  const savePath = path.join(process.cwd(), "public", "schoolImages", filename);
  await fs.mkdir(path.dirname(savePath), { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(savePath, buffer);
  return `/schoolImages/${filename}`;
}
