import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    let client = await clientPromise;
    let db = client.db("project");

    let { link } = await request.json();

    // ตรวจสอบว่ามีลิงค์ซ้ำในฐานข้อมูลหรือไม่
    const existingService = await db
      .collection("service")
      .findOne({ serviceLink: link });
    if (existingService) {
      // ถ้าพบว่ามีลิงค์ซ้ำ, ส่งคำตอบกลับไปว่าไม่สามารถเพิ่มข้อมูลได้
      return NextResponse.json(
        { error: "Service link already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json("Not duplicate link", { status: 200 });
  } catch (e) {
    return Response.json(e);
  }
}

/**
 *  @swagger
 * /api/management/service/validateLink:
 *   post:
 *     summary: Check for duplicate service link and respond accordingly
 *     description: This endpoint checks if a provided service link already exists in the database. If the link exists, it returns an error; otherwise, it indicates that the link is not a duplicate.
 *     tags:
 *       - service management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *                 description: The URL to the service that needs to be checked for duplication.
 *     responses:
 *       200:
 *         description: The service link is not a duplicate.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Not duplicate link
 *       409:
 *         description: The service link already exists in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Service link already exists.
 *       500:
 *         description: Internal Server Error
 */
