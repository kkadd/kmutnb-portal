import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const client = await clientPromise;
    const db = client.db("project");

    const posts = await db.collection("service").find({}).toArray();
    const response = NextResponse.json(posts, { status: 200 });

    /* response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0"); */

    return response;
  } catch (e: any) {
    return NextResponse.json(
      { error: "Internal Server Error" + e.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/management/service/getServices:
 *   get:
 *     summary: Get all services
 *     tags:
 *       - service management
 *     responses:
 *       200:
 *         description: Get all services
 *       404:
 *         description: Missing id
 */
