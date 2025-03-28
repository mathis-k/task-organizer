import { Schema, model, Document, ObjectId } from "mongoose";

export interface UserDocument extends Document {
  _id: ObjectId;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "E-mail is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserDocument>("User", userSchema);
