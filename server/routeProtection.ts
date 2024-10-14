import { getServerSession } from "#auth";
import type { H3Event, EventHandlerRequest } from "h3";

export default async (event: H3Event<EventHandlerRequest>) => {
    const session = await getServerSession(event);

    if (!session) {
        throw createError({
            statusCode: 401,
            message: "Unauthorized",
        });
    }
};