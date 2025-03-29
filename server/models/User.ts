import { Schema, model, Document, ObjectId } from "mongoose";

export interface UserDocument extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
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
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    avatar: {
      type: String,
      default: "https://www.shadcn-vue.com/avatars/shadcn.jpg",
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserDocument>("User", userSchema);
