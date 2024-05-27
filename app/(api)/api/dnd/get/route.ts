import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let data = await db.collection("dnd").find({}).toArray()

        if (data.length === 0) {
            return NextResponse.json({ data: [] }, { status: 200 });
        }

        return NextResponse.json(data[0], { status: 200 });
    }
    catch (e) {
        console.error(e);
        return Response.json(e, { status: 500 });
    }
}

/**
 * The POST method is used to save the data to the database.
 * The GET method is used to retrieve the data from the database.
 * @swagger
 * /api/dnd/get:
 *   get:
 *     summary: Get the data from the database.
 *     tags:
 *       - drag and drop [under construction]
 *     description: Get the data from the database.
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */