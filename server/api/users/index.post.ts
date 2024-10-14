import { User } from "server/models/User";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
    await routeProtection(event);
    const body = await readBody(event);
    try {
        const user = new User(body);
        await user.save();
        return user;
    } catch (error) {
        console.log(`✖ Error creating user:`, error);
    }
});