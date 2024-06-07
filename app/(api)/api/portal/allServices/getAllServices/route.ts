import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    let client = await clientPromise;
    let db = client.db("project");

    let role: string | null = req.nextUrl.searchParams.get("role");
    let services = await db
      .collection("service")
      .find({ role: role })
      .toArray();

    return NextResponse.json(services);
  } catch (e: any) {
    return NextResponse.json(e.toString());
  }
}

/**
 *  @swagger
 * /api/portal/allServices/getAllServices:
 *   get:
 *     summary: Get services by role
 *     tags:
 *       - portal all services
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: The role to filter services by
 *     responses:
 *       200:
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *        description: Internal Server Error
 */
