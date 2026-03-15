"use server";

import { Event } from "@/database";
import connectDB from "../mongodb";
import { IEvent } from "@/database";

export const getSimlilarEventsBySlug = async (
  slug: string
): Promise<IEvent[]> => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    if (!event) return [];

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    return similarEvents;
  } catch (error) {
    console.error(error);
    return [];
  }
};