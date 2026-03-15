import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json({
        message: "Invalid json format",
        status: 500,
        error: e,
      });
    }
    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "dev-event" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });
    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createEvent = await Event.create(event);
    return NextResponse.json({
      message: "Event created successfully",
      event: createEvent,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "API creation failed",
      error: e,
    },{status:400});
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ message: "Event List successfully", events },{status:200});
  } catch (e) {
    return NextResponse.json(
      { message: "Event fteching failed", error: e },
      { status: 500 },
    );
  }
}
