import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    let client = await clientPromise;
    let db = client.db("project");
    let { username, role } = await req.json();

    // Get the date 14 days ago
    let date14DaysAgo = new Date();
    date14DaysAgo.setDate(date14DaysAgo.getDate() - 14);

    // Convert to ISO string
    let isoDate14DaysAgo = date14DaysAgo.toISOString();

    // Fetch all services
    let services = await db
      .collection("service")
      .find({
        role: role,
        enable: true,
        date: { $gte: isoDate14DaysAgo },
      })
      .sort({ date: -1 })
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
 * /api/portal/allServices/getNewServices:
 *   post:
 *     summary: Fetch services within the last 14 days
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
 *             required:
 *               - username
 *               - role
 *     responses:
 *       200:
 *         description: Services fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   role:
 *                     type: string
 *                   enable:
 *                     type: boolean
 *                   date:
 *                     type: string
 *                   toggle:
 *                     type: boolean
 *       500:
 *         description: Error
 */
