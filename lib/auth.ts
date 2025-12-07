import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

// Check if DATABASE_URL is set to a real value (not the placeholder)
const isDatabaseConfigured = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("[PASSWORD]");

export const authOptions: NextAuthOptions = {
    adapter: isDatabaseConfigured ? PrismaAdapter(db) : undefined,
    session: {
        strategy: "jwt", // Using JWT for simplicity with Credentials + Adapter, user session strategy is also possible
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Mock authentication for demo
                if (credentials?.email === "user@example.com" && credentials?.password === "password") {
                    return {
                        id: "u-123456",
                        name: "Demo User",
                        email: "user@example.com",
                    };
                }
                // Allow any login for simplicity in this demo phase if specific flag set?
                // No, let's keep it strict-ish for the demo user or allow dynamic "signup" simulation later.

                // Return null if failed
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login', // Custom login page
        // error: '/auth/error',
    },
    callbacks: {
        async session({ session }) {
            if (session.user) {
                // session.user.id = token.sub; // Add user ID to session
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "super-secret-dev-secret", // Fallback for dev
};
