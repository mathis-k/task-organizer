import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "~/server/models/User";
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    pages: {
        signIn: "/login",
    },
    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: "Credentials",
            credentials: {},

            async authorize(credentials: { email: string; password: string }) {
                console.log("credentials", credentials);
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: "Unauthorized",
                        message: "You entered invalid credentials.",
                    });
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: "Unauthorized",
                        message: "You entered an invalid password.",
                    });
                }

                if (isValid) {
                    return { ...user.toObject(), password: undefined };
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    ...user,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...token,
                ...session.user,
            };
            return session;
        },
    },
});