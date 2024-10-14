import { Task } from "~/server/models/Task";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
    await routeProtection(event);
    const id = getRouterParam(event, 'id');

    try {
        return await Task.findByIdAndDelete(id);
    } catch (error) {
        console.log(`✖ Error deleting task:`, error);
    }
});