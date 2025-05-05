import { Schema, model, ObjectId, Document } from "mongoose";

export interface ModuleDocument extends Document {
  _id: ObjectId;
  user: ObjectId;
  name: string;
  abbreviation?: string;
  semester?: string;
  color?: string;
  ects?: number;
  grade?: number;
}

const moduleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    abbreviation: {
      type: String,
    },
    semester: {
      type: String,
    },
    color: {
      type: String,
    },
    ects: {
      type: Number,
      min: 0,
      max: 30,
    },
    grade: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);
export const Module = model<ModuleDocument>("Module", moduleSchema);
