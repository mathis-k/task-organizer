import { User } from "~/server/models/User";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10); // Salt-Rounds = 10

    const user = new User({
      ...body,
      password: hashedPassword,
    });

    await user.save();

    return {
      message: "User created successfully",
    };
  } catch (error) {
    console.log(`✖ Error creating user:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "An error occurred while creating the user.",
    });
  }
});
