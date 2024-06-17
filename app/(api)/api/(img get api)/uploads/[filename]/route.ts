import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 }
    );
  }
  const filePath = path.join(process.cwd(), "uploads", filename);
  try {
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=${filename}`,
        },
      });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/uploads/{filename}:
 *   get:
 *     summary: Retrieve a file
 *     description: Fetches a file from the server based on the provided filename.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Name of the file to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request - Filename is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Filename is required
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: File not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch file
 */
