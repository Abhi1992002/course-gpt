import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    credits: number;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // before callback , our data already saved in database and token generated but token only have email , name and image but database have credits and id also , so we need to send these thing also
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (db_user) {
        token.id = db_user.id;
        token.credits = db_user.credits;
      }

      return token;
    },
    session: async ({ token, session }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.credits = token.credits;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET as string,

  // connecting our database with next-auth and using this we can directly save information in database that came from google in a fashion similar to model
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
