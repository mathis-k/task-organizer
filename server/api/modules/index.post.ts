import { Module } from "~/server/models/Module";
import routeProtection from "~/server/routeProtection";

export default defineEventHandler(async (event) => {
  await routeProtection(event);
  const body = await readBody(event);

  try {
    const module = new Module(body);
    await module.save();
    return module;
  } catch (error) {
    console.log(`✖ Error creating module:`, error);
  }
});
