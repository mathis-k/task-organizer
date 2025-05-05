import { Task } from "~/server/models/Task";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
  await routeProtection(event);
  const body = await readBody(event);
  try {
    return await Task.find({ user: body.user });
  } catch (error) {
    console.log(`✖ Error fetching tasks:`, error);
  }
});
