import {Schema, model, ObjectId, Document} from "mongoose";

export interface TaskDocument extends Document {
    _id: ObjectId;
    title: string;
    description: string;
    status: "Backlog" | "Working On" | "Done";
    priority: "Low" | "Medium" | "High";
    course: string;
    link: string;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Backlog", "Working On", "Done"],
            default: "Backlog",
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        course: {
            type: String,
        },
        link: {
            type: String,
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export const Task = model<TaskDocument>("Task", taskSchema);