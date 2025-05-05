import { Module } from "~/server/models/Module";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
  await routeProtection(event);
  const body = await readBody(event);

  try {
    return await Module.findOneAndUpdate({ _id: body._id }, body, {
      new: true,
    });
  } catch (error) {
    console.log(`✖ Error updating module:`, error);
  }
});
