import {Task} from "~/server/models/Task";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
    await routeProtection(event);
    const body = await readBody(event);

    try {
        return await Task.findOneAndUpdate({_id: body._id}, body, {new: true});
    } catch (error) {
        console.log(`✖ Error updating task:`, error);
    }
});