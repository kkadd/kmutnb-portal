import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    let client = await clientPromise;
    let db = client.db("project");
    let { username, serviceId } = await req.json();

    // Fetch the service
    let service = await db
      .collection("service")
      .findOne({ _id: new ObjectId(serviceId) });

    if (!service) {
      return NextResponse.json("Service not found", { status: 404 });
    }

    // Format the service data
    let serviceShortcut = {
      id: service._id.toString(),
      name: service.serviceName,
      serviceLink: service.serviceLink,
      imageUrl: service.serviceImg,
      description: service.serviceDescription,
      type: "service",
    };

    // Fetch the portal data
    let portalData = await db
      .collection("portal")
      .findOne({ username: username });

    if (portalData) {
      // Add the service to the portal data
      portalData.data.push(serviceShortcut);
      await db
        .collection("portal")
        .updateOne({ username: username }, { $set: { data: portalData.data } });
    } else {
      // Create new portal data for the user
      await db.collection("portal").insertOne({
        username: username,
        data: [serviceShortcut],
      });
    }

    return NextResponse.json("Service added successfully", { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e.toString(), { status: 500 });
  }
}

/**
 * @swagger
 * /api/portal/allServices/addToPersonal:
 *   post:
 *     summary: Add a service to a user's portal
 *     tags:
 *       - portal all services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               serviceId:
 *                 type: string
 *             required:
 *               - username
 *               - serviceId
 *     responses:
 *       200:
 *         description: Service added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
