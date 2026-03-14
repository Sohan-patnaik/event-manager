import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { Event } from "./event.model";

/**
 * Booking document interface
 */
export interface BookingDocument extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Simple email validator
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => emailRegex.test(email),
        message: "Invalid email format",
      },
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Pre-save hook
 * Ensure referenced event exists
 */
BookingSchema.pre("save", async function () {
  const eventExists = await Event.exists({
    _id: this.eventId,
  });

  if (!eventExists) {
    throw new Error("Referenced event does not exist");
  }
});

export const Booking: Model<BookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", BookingSchema);
