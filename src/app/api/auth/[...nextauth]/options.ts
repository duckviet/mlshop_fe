///api/auth/[...nextauth]/options.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { authenticationEndpoint } from "@/services/axios/endpoints/authentication.endpoint";
import axios from "axios";
import authenticationAction from "@/services/axios/actions/authentication.action";

interface CustomUser extends DefaultUser {
  name: string;
  email: string;
  id: string;
  role: string;
  token: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      id: string;
      role: string;
      token: string;
    } & DefaultSession;
  }

  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    name: string;
    email: string;
    id: string;
    role: string;
    token: string;
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials) return;
        try {
          const response = await authenticationAction.login(
            credentials?.email,
            credentials?.password
          );
          console.log(response);
          if (response) {
            const user = response.user;
            return {
              name: user.username,
              email: user.email,
              role: user.authentication?.role || "customer",
              id: user.id,
              token: user.authentication?.sessionToken || "",
            };
          }
          return null;
        } catch (error: any) {
          console.error("Auth error:", error);
          if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          token: user.token,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (session && token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            token: token.token,
          },
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
