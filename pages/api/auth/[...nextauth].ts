import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import points from "points";

const options: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials: any, req: any) {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
                const response = await fetch(baseUrl + points.singIn, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const user = await response.json();
                if (response.ok && user) {
                    return Promise.resolve(user) as any;
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "auth/login"
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token, user }: any) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, account, isNewUser, profile, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
    }
}

export default NextAuth(options);