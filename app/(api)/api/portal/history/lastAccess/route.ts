import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    let client = await clientPromise;
    let db = client.db("project");
    let { username } = await req.json();

    let services = await db
      .collection("service")
      .aggregate([
        {
          $lookup: {
            from: "history",
            localField: "_id",
            foreignField: "serviceId",
            as: "history",
          },
        },
        { $unwind: "$history" },
        { $match: { "history.username": username } },
        { $sort: { "history.timestamp": -1 } }, // Sort before grouping
        {
          $group: {
            _id: "$_id",
            serviceName: { $first: "$serviceName" },
            serviceLink: { $first: "$serviceLink" },
            serviceImg: { $first: "$serviceImg" },
            serviceDescription: { $first: "$serviceDescription" },
            lastAccess: { $first: "$history.timestamp" }, // Capture the last access time if needed
          },
        },
        { $sort: { lastAccess: -1 } }, // Optional: sort groups by last access time
        { $limit: 5 }, // Limit to top 5 services
      ])
      .toArray();

    return NextResponse.json(services, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e.toString(), { status: 500 });
  }
}

/**
 * @swagger
 * /api/portal/history/lastAccess:
 *   post:
 *     summary: Retrieve a list of services
 *     tags:
 *       - History
 *     description: Retrieve a list of services for a given username, ordered by the last timestamp and without duplicates. The services are returned in a specified format.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *         description: The username of the user
 *     responses:
 *       200:
 *         description: A list of services
 *       500:
 *         description: Server error
 */
