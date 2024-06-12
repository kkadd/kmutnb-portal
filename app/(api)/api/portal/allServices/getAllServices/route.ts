import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    let client = await clientPromise;
    let db = client.db("project");
    let { username, role } = await req.json();

    // Fetch all services
    let services = await db
      .collection("service")
      .find({ role: role, enable: true })
      .toArray();

    // Fetch portal data
    let portalData = await db
      .collection("portal")
      .findOne({ username: username });

    // Flatten all service IDs in portal data and contain array
    let portalServiceIds = portalData?.data.map((service: any) =>
      service.id?.toString()
    );
    portalData?.data
      .filter((service: any) => service.type === "folder")
      .forEach((folder: any) => {
        let containServiceIds = folder.contain.map((service: any) =>
          service.id?.toString()
        );
        portalServiceIds = [...portalServiceIds, ...containServiceIds];
      });

    if (portalData) {
      // Add 'toggle' field to services
      services = services.map((service) => {
        if (portalServiceIds.includes(service._id?.toString())) {
          return { ...service, toggle: true };
        } else {
          return { ...service, toggle: false };
        }
      });
    } else {
      services = services.map((service) => {
        // Add 'toggle' field to services
        return { ...service, toggle: false };
      });
    }

    return NextResponse.json(services, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e.toString(), { status: 500 });
  }
}

/**
 *  @swagger
 * /api/portal/allServices/getAllServices:
 *   post:
 *     summary: get services with toggle by role and username
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
 *               role:
 *                 type: string
 *         description: The user object containing username and role
 *     responses:
 *       200:
 *         description: The services related to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   toggle:
 *                     type: boolean
 */
