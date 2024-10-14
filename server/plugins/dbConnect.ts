import mongoose from "mongoose";

export default defineNitroPlugin(async (nitro) => {
    const config = useRuntimeConfig();
    try {
        await mongoose.connect(config.mongodbUri);
        console.log("✔ Database connected successfully");
    } catch (error) {
        console.log("✖ Database connection error:", error);
    }
});