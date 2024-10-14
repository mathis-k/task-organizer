import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const user = new User(body);
        await user.save();
        return user;
    } catch (error) {
        console.log(`✖ Error creating user:`, error);
    }
});