import { Schema, model, ObjectId, Document } from "mongoose";

export interface CalendarEventDocument extends Document {
  _id: ObjectId;
  user: ObjectId;
  title: string;
  type: "exam" | "lecture" | "deadline" | "tutorial" | "other";
  startDate: Date;
  endDate: Date;
  recurrence?: "weekly" | "monthly";
  recurrenceEndDate?: Date;
  module?: ObjectId;
}

const calendarEventSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    type: {
      type: String,
      enum: ["exam", "lecture", "deadline", "tutorial", "other"],
      default: "other",
      required: [true, "Type is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    recurrence: {
      type: String,
      enum: ["weekly", "monthly"],
    },
    recurrenceEndDate: {
      type: Date,
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
    },
  },
  {
    timestamps: true,
  },
);

export const CalendarEvent = model<CalendarEventDocument>(
  "CalendarEvent",
  calendarEventSchema,
);
