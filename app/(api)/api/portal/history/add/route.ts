import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    let client = await clientPromise;
    let db = client.db("project");
    let { serviceId, username } = await req.json();
    let addedHistory = await db.collection("history").insertOne({
      serviceId: new ObjectId(serviceId),
      username: username,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(addedHistory, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(e.toString(), { status: 500 });
  }
}

/**
 * @swagger
 * /api/portal/history/add:
 *   post:
 *     summary: Add history
 *     tags:
 *       - History
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: string
 *               username:
 *                 type: string
 *             required:
 *               - serviceId
 *               - username
 *     responses:
 *       201:
 *         description: History added
 *       500:
 *         description: Error
 */
