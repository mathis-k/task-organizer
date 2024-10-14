import { Task } from "~/server/models/Task";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
    await routeProtection(event);
    const body = await readBody(event);

    try {
        const task = new Task(body);
        await task.save();
        return task;
    } catch (error) {
        console.log(`✖ Error creating task:`, error);
    }
});