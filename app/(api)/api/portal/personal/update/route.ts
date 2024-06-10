import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    let client = await clientPromise;
    let db = client.db("project");
    let request: any = await req.json();

    let result = await db
      .collection("portal")
      .updateOne(
        { username: request.username },
        { $set: { data: request.data } }
      );

    if (result.matchedCount == 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(e.toString(), { status: 500 });
  }
}

/**
 * @swagger
 * /api/portal/personal/update:
 *   post:
 *     summary: Update user's personal portal data
 *     tags:
 *       - Personal Portal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Data updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
