import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type service = {
    serviceName: string;
    serviceDescription?: string;
    serviceImage?: string;
    serviceLink: string;
    date: string;
    username: string;
    enable: boolean;
    role: string[];
    /*
    student
    exchange_student
    alumni
    personel
    retirement
    templecturer
    */
};

/*
type role = {
    student?: boolean;
    exchange_student?: boolean;
    alumni?: boolean;
    personel?: boolean;
    retirement?: boolean;
    templecturer?: boolean;
}; */

export async function POST(request: Request) {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let data: service = await request.json();

        let addedService = await db.collection("service").insertOne({
            serviceName: data.serviceName,
            serviceDescription: data.serviceDescription,
            serviceImage: data.serviceImage,
            role: data.role,
            serviceLink: data.serviceLink,
            date: data.date,
            username: data.username,
            enable: data.enable,
        });

        return NextResponse.json(addedService, { status: 201 });
    } catch (e) {
        return Response.json(e);
    }
}

/**
 *  @swagger
 * /api/management/service/add:
 *   post:
 *     summary: Add new service
 *     tags:
 *       - service management
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
 *               serviceImage:
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
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                  type: boolean
 *                 insertedId:
 *                  type: string
 *       500:
 *        description: Internal Server Error
 */
