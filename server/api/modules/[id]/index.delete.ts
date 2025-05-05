import { Module } from "~/server/models/Module";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
  await routeProtection(event);
  const id = getRouterParam(event, "id");

  try {
    return await Module.findByIdAndDelete(id);
  } catch (error) {
    console.log(`✖ Error deleting module:`, error);
  }
});
