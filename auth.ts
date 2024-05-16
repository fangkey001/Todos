import NextAuth, { DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { Adapter } from "next-auth/adapters";
import {
    getServerSession,
    type NextAuthOptions,
} from "next-auth";

import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user?: {
            id?: string;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
    }
}

const prisma = new PrismaClient()

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error(
        "Missing Discord client ID or client secret environment variables"
    );
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                if (!user.email) return false;

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: user.email,
                    },
                });

                if (existingUser) {
                    return true;
                } else {
                    const newUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name || '',
                            image: user.image || '',
                        }
                    });
                }

                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        },

        async session({ session, token, user }) {
            if (token && session.user) {
                session.user.id = token.id;
            }

            return session
        },

        async jwt({ token, user, account, profile }) {
            if (token) token.id = token.sub;
            
            return token
        }
    },
};

export const getServerAuthSession = () => getServerSession(authOptions);