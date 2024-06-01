import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

/**
 * Handles the POST request for uploading an image file.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A NextResponse object with the result of the upload.
 */

export const POST = async (req: any, res: any) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    return NextResponse.json(
      {
        Message: "Success",
        status: 201,
        filePath: "/uploads/" + filename,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json(
      { Message: "Failed", status: 500 },
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
 *                 Message:
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
 *                 Message:
 *                   type: string
 */
