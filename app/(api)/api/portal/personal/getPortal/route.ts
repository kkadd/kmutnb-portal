import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    let client = await clientPromise;
    let db = client.db("project");
    let username = req.nextUrl.searchParams.get("username");
    let personalPortal = await db
      .collection("portal")
      .findOne({ username: username });

    if (!personalPortal) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    return NextResponse.json(personalPortal.data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e.toString(), { status: 500 });
  }
}

/**
 * @swagger
 * /api/portal/personal/getPortal:
 *   get:
 *     summary: Get user's personal portal data
 *     tags:
 *       - Personal Portal
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The personal portal data of the user
 *       500:
 *         description: Server error
 */
