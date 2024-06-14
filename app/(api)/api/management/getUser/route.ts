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
