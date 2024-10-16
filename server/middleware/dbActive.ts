import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  console.log("ℹ New server event:", event.req.url);
  mongoose.connection.readyState === 0 &&
    console.log("ℹ No database connection");
  mongoose.connection.readyState === 1 ||
    (await mongoose.connect(useRuntimeConfig().mongodbUri).then(
      () => console.log("✔ Database connected successfully"),
      (error) => console.log("✖ Database connection error:", error),
    ));
});
