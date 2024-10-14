import { Task } from "~/server/models/Task";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
    await routeProtection(event);
    try {
        return await Task.find();
    } catch (error) {
        console.log(`✖ Error fetching tasks:`, error);
    }
});