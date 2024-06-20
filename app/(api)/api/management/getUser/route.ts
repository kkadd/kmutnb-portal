import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  try {
    const client = await clientPromise;
    const db = client.db("project");

    const user = await db.collection("user").findOne({
      username: username,
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (e: any) {
    console.error(e);
    throw new Error(e).message;
  }
}

/**
 * @swagger
 * /api/management/getUser:
 *   get:
 *     summary: Retrieve user information
 *     tags:
 *       - User
 *     description: Retrieve detailed information for a user based on the username provided as a query parameter.
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user to retrieve
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109ca"
 *                 username:
 *                   type: string
 *                   example: "s63xxxxxxxxxx"
 *                 displayname:
 *                   type: string
 *                   example: "จิรภัทร ศรีสมพันธุ์"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server error
 */
