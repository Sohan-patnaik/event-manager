import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Event } from "@/database";// Adjust path if needed
import connectDB from "@/lib/mongodb";

/**
 * Type for dynamic route params in App Router
 */
type RouteParams = {
  params: {
    slug?: string;
  };
};

/**
 * GET /api/events/[slug]
 * Fetch a single event by slug
 */
export async function GET(
  _req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { slug } = params;

    /**
     * Validate slug parameter
     */
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing event slug." },
        { status: 400 }
      );
    }

    /**
     * Ensure database connection
     */
    await connectDB();

    /**
     * Query event by slug
     */
    const event = await Event.findOne({ slug })
      .lean()
      .exec();

    /**
     * Handle event not found
     */
    if (!event) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }

    /**
     * Return event data
     */
    return NextResponse.json(
      {
        message: "Event fetched successfully.",
        data: event,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    /**
     * Handle known mongoose errors
     */
    if (error instanceof mongoose.Error) {
      return NextResponse.json(
        {
          message: "Database error occurred while fetching event.",
          error: error.message,
        },
        { status: 500 }
      );
    }

    /**
     * Handle unexpected errors
     */
    return NextResponse.json(
      {
        message: "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}