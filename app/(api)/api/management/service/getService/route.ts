import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const client = await clientPromise;
    const db = client.db("project");
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const post = await db.collection("service").findOne({
      _id: new ObjectId(id),
    });

    if (!post) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" + e },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/management/service/getService:
 *   get:
 *     summary: Get a service by id
 *     tags:
 *       - service management
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get a service by id
 *       400:
 *         description: Missing id
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal Server Error
 */
