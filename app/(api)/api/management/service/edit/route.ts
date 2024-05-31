import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest) {
    try {
        let client = await clientPromise;
        let db = client.db("project");
        let id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Missing id" });
        }
        let { serviceName, serviceDescription, serviceImg, serviceLink, date, username, enable, role } = await request.json();
        let post = await db.collection("service").updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: {
                    serviceName: serviceName,
                    serviceDescription: serviceDescription,
                    serviceImg: serviceImg,
                    serviceLink: serviceLink,
                    date: date,
                    username: username,
                    enable: enable,
                    role: role
                },
            }
        );
        return NextResponse.json(post, { status: 201 });
    }
    catch (e) {
        return NextResponse.json(e);
    }
}

/**
 * @swagger
 * /api/management/service/edit:
 *   put:
 *     summary: Update a service.
 *     tags:
 *       - service management
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the service to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *               serviceDescription:
 *                 type: string
 *               serviceImg:
 *                 type: string
 *               role:
 *                 type: array
 *                 items:
 *                  type: string
 *                 example: ["student","exchange_student","alumni","personel","retirement","templecturer"]
 *               serviceLink:
 *                 type: string
 *               date:
 *                 type: string
 *               username:
 *                 type: string
 *               enable:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Service updated successfully.
 *       '400':
 *         description: Bad request. Missing ID or invalid request body.
 *       '500':
 *         description: Internal server error.
 */