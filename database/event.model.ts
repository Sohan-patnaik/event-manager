import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Event document interface
 */
export interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Helper to generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },

    venue: { type: String, required: true },
    location: { type: String, required: true },

    date: { type: String, required: true },
    time: { type: String, required: true },

    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },

    audience: { type: String, required: true },

    agenda: {
      type: [String],
      required: true,
    },

    organizer: { type: String, required: true },

    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Pre-save hook
 * Automatically generate slug from title
 */
EventSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
});

export const Event: Model<EventDocument> =
  mongoose.models.Event || mongoose.model<EventDocument>("Event", EventSchema);
