import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "@auth/core/adapters";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getAccountByUserId, getUserById } from "./actions/user.actions";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: "SUPERHOST" | "USER";
      id: string;
      phone: string;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(db) as unknown as Adapter,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      try {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      } catch (error) {
        console.error("Error linking account:", error);
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Allow OAuth sign-ins
        if (account?.provider !== "credentials") return true;

        const existingUser = await getUserById(user.id!);

        // Add custom validation logic if needed, such as email verification
        // Example: Reject if email is not verified
        // if (!existingUser?.emailVerified) return false;

        return !!existingUser; // Only allow sign-in if the user exists
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false; // Deny sign-in on error
      }
    },

    async session({ token, session }) {
      // console.log({
      //   sessionToken: token,
      // });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.phone && session.user) {
        session.user.phone = token.phone as string;
      }

      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      // console.log({
      //   session: session,
      // });

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    async jwt({ token, trigger, session }) {
      // if (!token.sub) return token;

      try {
        // Update JWT when session is updated
        if (trigger === "update" && session) {
          token.name = session.user.name;
          token.email = session.user.email;
          token.phone = session.user.phone;
          token.role = session.user.role;
          token.isTwoFactorEnabled = session.user.isTwoFactorEnabled;
          token.isOAuth = session.user.isOAuth;
        }

        // Populate token with user data on creation
        if (!token.sub) return token;

        const existingUser = await getUserById(token.sub);
        if (!existingUser) return token;

        const existingAccount = await getAccountByUserId(existingUser.id);

        token.isOAuth = !!existingAccount;
        token.name = existingUser.firstName;
        token.email = existingUser.email;
        token.phone = existingUser.phoneNumber;
        token.role = existingUser.role;
        token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

        return token;
      } catch (error) {
        console.error("Error during JWT callback:", error);
        return token;
      }
    },
    authorized: () => {
      return true;
    },
  },
  session: { strategy: "jwt", maxAge: 3 * 24 * 60 * 60 },
  ...authConfig,
});
