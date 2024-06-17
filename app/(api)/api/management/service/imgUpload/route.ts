import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export const POST = async (req: any, res: any) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
  const uploadPath = path.join(process.cwd(), "uploads");

  try {
    // Ensure the uploads directory exists
    await mkdir(uploadPath, { recursive: true });

    // Correctly join the directory and filename
    const filePath = path.join(uploadPath, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json(
      {
        message: "Success",
        status: 201,
        filePath: "/api/uploads/" + filename,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json(
      { message: "Failed", status: 500 },
      { status: 500 }
    );
  }
};

/**
 * @swagger
 * /api/management/service/imgUpload:
 *   post:
 *     summary: Uploads an image file.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Successful upload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *                 filePath:
 *                   type: string
 *       '400':
 *         description: No files received.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Failed to upload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
