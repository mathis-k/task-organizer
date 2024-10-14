import { User } from "server/models/User";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
    await routeProtection(event);
    try {
        return await User.find();
    } catch (error) {
        console.log(`✖ Error fetching users:`, error);
    }
});