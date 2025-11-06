import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbconnect } from "./lib/db";
import User from "./models/user.model";
import { User as UserType } from "./lib/types";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email) {
          throw new CredentialsSignin("Email is required", {
            cause: "Invalid email",
          });
        }

        if (!password) {
          throw new CredentialsSignin("Password is required", {
            cause: "Password is required",
          });
        }

        await dbconnect();

        const user = (await User.findOne({ email }).select(
          "+password"
        )) as UserType & { password: string };

        if (!user) {
          throw new CredentialsSignin("User not found", {
            cause: "Email not found",
          });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin("Invalid password", {
            cause: "Wrong password",
          });
        }

        return user;
      },
    }),
  ],
  pages : {
    signIn : "/login"
  }
});
