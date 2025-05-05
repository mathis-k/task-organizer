import { Schema, model, ObjectId, Document } from "mongoose";
import {
  TASK_TYPES,
  TASK_STATUSES,
  TASK_PRIORITIES,
  TaskType,
  TaskStatus,
  TaskPriority,
} from "../constants/taskConstants";
export interface TaskDocument extends Document {
  _id: ObjectId;
  user: ObjectId;
  module: ObjectId;
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  resolution: boolean;
  effortEstimate?: number;
  actualEffort?: number;
  linkedResources?: string[];
  dueDate?: Date;
  resolutionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "Module is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: TASK_TYPES,
      required: [true, "Type is required"],
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: "backlog",
      required: [true, "Status is required"],
    },
    priority: {
      type: String,
      enum: TASK_PRIORITIES,
      default: "medium",
      required: [true, "Priority is required"],
    },
    resolution: {
      type: Boolean,
      default: false,
      required: [true, "Resolution is required"],
    },
    effortEstimate: {
      type: Number,
    },
    actualEffort: {
      type: Number,
    },
    linkedResources: {
      type: [String],
    },
    dueDate: {
      type: Date,
    },
    resolutionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = model("Task", taskSchema);
