import { Module } from "~/server/models/Module";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
  await routeProtection(event);
  const body = await readBody(event);
  try {
    return await Module.find({ user: body.user });
  } catch (error) {
    console.log(`✖ Error fetching modules:`, error);
  }
});
